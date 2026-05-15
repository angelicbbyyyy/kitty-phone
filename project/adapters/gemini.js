// Gemini API adapter — native Google Gemini format
// Auth: ?key=apiKey query param (standard Gemini API style)
// Model format: e.g. "gemini-2.0-flash", "gemini-1.5-pro"

const DEFAULT_BASE = 'https://generativelanguage.googleapis.com';

// Collapse consecutive same-role turns (Gemini requires strict alternation)
function toContents(messages) {
  const out = [];
  for (const m of messages) {
    if (!m.text || m.typing) continue;
    const role = m.from === 'me' ? 'user' : 'model';
    const last = out[out.length - 1];
    if (last && last.role === role) {
      last.parts[0].text += '\n' + m.text;
    } else {
      out.push({ role, parts: [{ text: m.text }] });
    }
  }
  // Gemini requires contents to begin with a user turn
  while (out.length && out[0].role === 'model') out.shift();
  return out;
}

export async function callGemini({ baseUrl, apiKey, model, systemPrompt, messages }) {
  if (!apiKey) throw new Error('No API key — open Settings → General API and add your Gemini key.');
  if (!model)  throw new Error('No model set — open Settings → General API and choose a model.');

  const base = (baseUrl || DEFAULT_BASE).replace(/\/+$/, '');
  const url  = `${base}/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const contents = toContents(messages);
  if (!contents.length) throw new Error('No messages to send.');

  const body = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: {
      temperature: 1.1,
      topP: 0.95,
      maxOutputTokens: 200,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH',        threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',  threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT',  threshold: 'BLOCK_NONE' },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const raw = await res.text().catch(() => '');
    let detail = '';
    try { detail = JSON.parse(raw)?.error?.message || raw; } catch { detail = raw; }
    throw new Error(`Gemini ${res.status}: ${detail.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini.');

  return text.trim();
}
