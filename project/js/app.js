// LittlePhone AI — entry point
// Loads all modules and exposes window.KLP for the React layer to call.

import { generateReply, persistUserMessage, loadHistory } from './chat.js';
import { syncCharactersToIDB } from './character.js';
import { openDB } from '../db/index.js';

// Warm up IndexedDB and sync contacts
openDB().catch(err => console.warn('[KLP] IndexedDB init:', err));
syncCharactersToIDB().catch(() => {});

// Bridge to React components (loaded via Babel, not ES modules)
window.KLP = {
  ready: true,
  chat: { generateReply, persistUserMessage, loadHistory },
};

console.log('[KLP] AI ready ✓');
