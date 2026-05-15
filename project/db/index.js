// IndexedDB — characters store + messages store

const DB_NAME = 'littlephone_v1';
const DB_VER = 1;

let _db = null;

export function openDB() {
  if (_db) return Promise.resolve(_db);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('characters')) {
        db.createObjectStore('characters', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('messages')) {
        const store = db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
        store.createIndex('chatId', 'chatId', { unique: false });
      }
    };
    req.onsuccess = (e) => { _db = e.target.result; resolve(_db); };
    req.onerror = (e) => reject(e.target.error);
  });
}

function run(storeName, mode, fn) {
  return openDB().then(db => new Promise((resolve, reject) => {
    const t = db.transaction(storeName, mode);
    const store = t.objectStore(storeName);
    const req = fn(store);
    if (req) {
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = (e) => reject(e.target.error);
    } else {
      t.oncomplete = () => resolve();
      t.onerror = (e) => reject(e.target.error);
    }
  }));
}

// ── Characters ────────────────────────────────────────────────
export const saveCharacter = (char) => run('characters', 'readwrite', s => s.put(char));
export const getCharacter  = (id)   => run('characters', 'readonly',  s => s.get(id));
export const getAllCharacters = ()   => run('characters', 'readonly',  s => s.getAll());

// ── Messages ──────────────────────────────────────────────────
export function getMessages(chatId) {
  return openDB().then(db => new Promise((resolve, reject) => {
    const t = db.transaction('messages', 'readonly');
    const req = t.objectStore('messages').index('chatId').getAll(chatId);
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  }));
}

export const addMessage = (chatId, msg) =>
  run('messages', 'readwrite', s => s.add({ ...msg, chatId, ts: Date.now() }));

export function deleteMessages(chatId) {
  return openDB().then(db => new Promise((resolve, reject) => {
    const t = db.transaction('messages', 'readwrite');
    const req = t.objectStore('messages').index('chatId').openCursor(IDBKeyRange.only(chatId));
    req.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) { cursor.delete(); cursor.continue(); }
    };
    t.oncomplete = () => resolve();
    t.onerror = (e) => reject(e.target.error);
  }));
}
