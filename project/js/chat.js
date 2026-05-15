// Wires AI send/receive to the React UI via window.KLP.chat
import { sendMessage }  from './api.js';
import { addMessage, getMessages } from '../db/index.js';

// Called from React ChatDetail when the user clicks the magic wand (or auto-reply fires).
// chat     = { id, name }
// messages = current message array from React state (already includes the just-sent user msg)
// callbacks: { onTyping?, onMessage(text), onError?(msg) }
export async function generateReply(chat, messages, { onTyping, onMessage, onError } = {}) {
  try {
    onTyping?.();
    const text = await sendMessage({ chatId: chat.id, messages });
    onMessage(text);
    addMessage(chat.id, { from: 'them', text, time: new Date().toISOString() }).catch(() => {});
  } catch (err) {
    console.error('[KLP chat]', err);
    onError?.(err.message);
  }
}

// Persist a user message to IndexedDB (best-effort, non-blocking).
export function persistUserMessage(chatId, text) {
  return addMessage(chatId, { from: 'me', text, time: new Date().toISOString() }).catch(() => {});
}

// Load full message history for a chat from IndexedDB.
export function loadHistory(chatId) {
  return getMessages(chatId).catch(() => []);
}
