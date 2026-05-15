// LittlePhone AI — entry point
// Loads all modules and exposes window.KLP for the React layer to call.

import { generateReply, persistUserMessage, loadHistory } from './chat.js';
import { syncCharactersToIDB } from './character.js';
import { openDB } from '../db/index.js';

// Seed demo contacts into localStorage if none exist yet,
// so the hardcoded demo conversations have characters to back them.
const SEED_CONTACTS = [
  { id: 'hana',  name: 'ハナ',  role: 'Photographer', about: 'Quiet, observant. Shoots film. Lives in Kyoto.' },
  { id: 'kenji', name: 'Kenji', role: 'Architect',    about: 'Precise and thoughtful. Works long hours.' },
  { id: 'aiko',  name: '愛子',  role: 'Ceramicist',   about: 'Gentle and patient. Finds meaning in small things.' },
];
try {
  const existing = JSON.parse(localStorage.getItem('klp_contacts') || '[]');
  if (!Array.isArray(existing) || existing.length === 0) {
    localStorage.setItem('klp_contacts', JSON.stringify(SEED_CONTACTS));
  }
} catch {}

// Warm up IndexedDB and sync contacts
openDB().catch(err => console.warn('[KLP] IndexedDB init:', err));
syncCharactersToIDB().catch(() => {});

// Bridge to React components (loaded via Babel, not ES modules)
window.KLP = {
  ready: true,
  chat: { generateReply, persistUserMessage, loadHistory },
};

console.log('[KLP] AI ready ✓');
