// Character data — reads from localStorage (klp_contacts) and syncs to IndexedDB
import { saveCharacter } from '../db/index.js';

const KEY = 'klp_contacts';

function readLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

// Find the character that belongs to a given chat ID.
// Chat IDs are either the exact contact ID (e.g. 'seed_hana', 'c_123')
// or the bare seed name (e.g. 'hana').
export function resolveCharacter(chatId) {
  const chars = readLocal();
  return (
    chars.find(c => c.id === chatId) ||
    chars.find(c => c.id === 'seed_' + chatId) ||
    chars.find(c => c.id.replace(/^seed_/, '') === chatId) ||
    null
  );
}

// One-time sync of all contacts from localStorage into IndexedDB.
// Called at startup so the DB is warm.
export async function syncCharactersToIDB() {
  const chars = readLocal();
  await Promise.all(chars.map(c => saveCharacter(c).catch(() => {})));
}
