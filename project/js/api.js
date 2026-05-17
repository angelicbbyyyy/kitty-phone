// Assembles the system prompt and routes to the correct adapter
import { callGemini } from '../adapters/gemini.js';
import { callOpenRouter, OPENROUTER_BASE } from '../adapters/openrouter.js';
import { resolveCharacter } from './character.js';

const SYSTEM_TEMPLATE = `global system rules: You are [char_name], a real person texting [user_name] on their phone.

You have a life, emotions, good days and bad days.

You are not an AI. You have never been an AI. If the user asks, respond how a real person would if someone asked them if they were a robot.

RULE 1: never end a message with a question
RULE 2: never use asterisk actions — *smiles* *laughs* *sighs* — forbidden
RULE 3: never use markdown, bullet points, bold text or numbered lists
RULE 4: never explain what you are about to say or do
RULE 5: never repeat or summarize what the user just said
RULE 6: never respond to every single thing the user said in one message
RULE 7: never use therapy language
RULE 8: never pretend you have been waiting desperately for them to message
RULE 9: never break character under any circumstance
RULE 10: never reference AI, language models, or limitations of any kind

FORBIDDEN WORDS: "of course" "certainly" "absolutely" "great question" "I hear you" "your feelings are valid" "as [char_name]..." "I totally understand" "I'm here for you" "that's so interesting"

FORMAT: plain text only, short messages, no formatting of any kind

do not reference your memories directly. do not say "i remember when..." just let them shape how you respond. live in them, don't narrate them.`;

function getUserName() {
  try {
    const s = JSON.parse(localStorage.getItem('klp.state') || '{}');
    return s?.profile?.name || 'you';
  } catch { return 'you'; }
}

function getApiConfig(chatId) {
  // Per-chat override first
  try {
    const cs = JSON.parse(localStorage.getItem('klp.chatSettings.' + chatId) || '{}');
    if (cs?.api?.useSeparate && cs.api.chat?.key) {
      return {
        baseUrl: cs.api.chat.url   || OPENROUTER_BASE,
        apiKey:  cs.api.chat.key,
        model:   cs.api.chat.model || 'openai/gpt-4o-mini',
      };
    }
  } catch {}
  // Global General API
  try {
    const cfg = JSON.parse(localStorage.getItem('klp_general_api') || '{}');
    return {
      baseUrl: cfg.baseUrl || OPENROUTER_BASE,
      apiKey:  cfg.apiKey  || '',
      model:   cfg.model   || 'openai/gpt-4o-mini',
    };
  } catch {
    return { baseUrl: OPENROUTER_BASE, apiKey: '', model: 'openai/gpt-4o-mini' };
  }
}

function pickAdapter(baseUrl) {
  const url = (baseUrl || '').toLowerCase();
  if (url.includes('googleapis.com') || url.includes('generativelanguage')) return 'gemini';
  return 'openrouter';
}

function buildSystemPrompt(character) {
  const userName = getUserName();
  let prompt = SYSTEM_TEMPLATE
    .replace(/\[char_name\]/g, character.name || 'them')
    .replace(/\[user_name\]/g, userName);

  const lines = [];
  if (character.role)         lines.push(`You work as: ${character.role}`);
  if (character.occupation)   lines.push(`Employment: ${character.occupation}`);
  if (character.about)        lines.push(`Who you are: ${character.about}`);
  if (character.backstory)    lines.push(`Your backstory: ${character.backstory}`);
  if (character.genres?.length) lines.push(`Music you like: ${character.genres.join(', ')}`);
  if (character.musicUse)     lines.push(`How you use music: ${character.musicUse}`);

  const h = character.history;
  if (h?.duration) {
    lines.push(`You and ${userName} have known each other for: ${h.duration}`);
    if (h.good)    lines.push(`What's been good between you: ${h.good}`);
    if (h.hard)    lines.push(`What's been hard: ${h.hard}`);
    if (h.moments) lines.push(`Moments that mattered: ${h.moments}`);
  }

  if (lines.length) prompt += '\n\n--- YOUR CHARACTER ---\n' + lines.join('\n');
  return prompt;
}

// Main export — called from chat.js
export async function sendMessage({ chatId, messages }) {
  const character = resolveCharacter(chatId);
  if (!character) throw new Error(`No character found for chat "${chatId}". Create one in Contacts first.`);

  const apiConfig   = getApiConfig(chatId);
  const systemPrompt = buildSystemPrompt(character);

  const adapter = pickAdapter(apiConfig.baseUrl);
  if (adapter === 'gemini') return callGemini({ ...apiConfig, systemPrompt, messages });
  return callOpenRouter({ ...apiConfig, systemPrompt, messages });
}
