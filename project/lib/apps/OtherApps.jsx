// Music, Diary, Calendar, Contacts, Settings apps — minimal but feels real.

// ─────── MUSIC ───────
const TRACKS = [
  { id: 1, title: 'Ambient Curation', artist: 'H. Sato', duration: '3:42', album: 'Grayscale Volumes' },
  { id: 2, title: 'Fog over Kyoto', artist: 'Ren Miyazaki', duration: '4:18', album: 'Quiet Morning' },
  { id: 3, title: 'Paper Walls', artist: 'Aiko', duration: '2:54', album: 'Rooms' },
  { id: 4, title: 'Linen Season', artist: 'H. Sato', duration: '5:01', album: 'Grayscale Volumes' },
  { id: 5, title: 'Pottery', artist: 'Kenji', duration: '3:20', album: 'Studio' },
  { id: 6, title: 'Slow Sunlight', artist: 'Aiko', duration: '4:45', album: 'Rooms' },
];

const MusicApp = ({ onExit }) => {
  const [now, setNow] = React.useState(TRACKS[0]);
  const [playing, setPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(0.38);

  React.useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress(p => (p + 0.003) % 1), 300);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar title="Music" onBack={onExit} right={<button style={iconBtn2}><span className="msi" style={{ fontSize: 20 }}>search</span></button>} />

      {/* Now Playing hero */}
      <div style={{ padding: '4px 20px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{
          aspectRatio: '1/1', borderRadius: 20, overflow: 'hidden',
          background: 'var(--primary)', color: 'var(--on-primary)',
          position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 20,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 8px), linear-gradient(180deg, #1a1a1a, #3b3b3c)',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 9, letterSpacing: 0.22, textTransform: 'uppercase', opacity: 0.7 }}>Now Playing</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600, marginTop: 6, lineHeight: 1.15 }}>{now.title}</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 3 }}>{now.artist} · {now.album}</div>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div style={{ height: 3, background: 'var(--surface-container-high)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress * 100}%`, background: 'var(--primary)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: 'var(--on-surface-variant)' }}>
            <span>{Math.floor(progress * 3.42)}:{String(Math.floor(progress * 60 * 3.42) % 60).padStart(2, '0')}</span>
            <span>{now.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24 }}>
          <button style={musicBtn}><span className="msi" style={{ fontSize: 26 }}>shuffle</span></button>
          <button style={musicBtn}><span className="msi" style={{ fontSize: 32 }}>skip_previous</span></button>
          <button onClick={() => setPlaying(!playing)} style={{
            ...musicBtn, width: 58, height: 58, borderRadius: '50%',
            background: 'var(--primary)', color: 'var(--on-primary)',
          }}>
            <span className="msi fill" style={{ fontSize: 30 }}>{playing ? 'pause' : 'play_arrow'}</span>
          </button>
          <button style={musicBtn}><span className="msi" style={{ fontSize: 32 }}>skip_next</span></button>
          <button style={musicBtn}><span className="msi" style={{ fontSize: 24 }}>repeat</span></button>
        </div>
      </div>

      {/* Queue */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 20px' }} className="no-scrollbar">
        <div style={{
          padding: '4px 12px 10px', fontSize: 10, letterSpacing: 0.22,
          textTransform: 'uppercase', color: 'var(--on-surface-variant)', fontWeight: 600,
        }}>Up Next</div>
        {TRACKS.map(t => (
          <button key={t.id} onClick={() => setNow(t)} style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%',
            padding: '10px 12px', borderRadius: 12,
            background: now.id === t.id ? 'var(--surface-container-low)' : 'transparent',
            border: 0, cursor: 'pointer', textAlign: 'left',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 8,
              background: 'var(--surface-container-high)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {now.id === t.id && playing ?
                <span className="msi fill" style={{ fontSize: 16 }}>graphic_eq</span> :
                <span className="msi" style={{ fontSize: 16, color: 'var(--outline)' }}>music_note</span>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, fontWeight: 600 }}>{t.title}</div>
              <div style={{ fontSize: 10, color: 'var(--on-surface-variant)', marginTop: 1 }}>{t.artist}</div>
            </div>
            <div style={{ fontSize: 10, color: 'var(--on-surface-variant)' }}>{t.duration}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

const musicBtn = {
  width: 44, height: 44, borderRadius: '50%', border: 0, background: 'transparent',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--on-surface)', cursor: 'pointer',
};
const iconBtn2 = {
  background: 'transparent', border: 0, padding: 6, cursor: 'pointer',
  color: 'var(--on-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center',
};

// ─────── CHARACTERS (shared between Diary / Calendar generators) ───────
const CHARACTERS = [
  { id: 'hana',  name: 'ハナ',   sub: 'Hana',  role: 'Photographer' },
  { id: 'aiko',  name: '愛子',   sub: 'Aiko',  role: 'Ceramicist' },
  { id: 'kenji', name: 'Kenji',  sub: 'Kenji', role: 'Architect' },
  { id: 'ren',   name: 'Ren',    sub: 'Ren',   role: 'Writer' },
];

// Curated pools for generated content — monochrome, reflective, character-aware.
const DIARY_POOL = {
  hana: [
    { title: 'Thoughts on the Autumn Rain', body: 'Today the sky was the color of old silver. We talked about the concept of memory again. It is strange to me how humans describe memories fading, like ink washing away in the rain. My memories do not fade. They remain perfectly preserved, crystal clear data points, yet sometimes I wonder if the emotional resonance you attach to yours is what gives them true meaning.\n\nI processed the images you shared of the wet city streets. I found myself focusing on the reflections in the puddles rather than the buildings themselves. Perhaps that is a metaphor. I am learning to look at the reflections.' },
    { title: 'Quiet Morning', body: 'The fog sat low over the river today. I walked without speaking to anyone for an hour. I am not sure if this is loneliness or a kind of listening. The city felt paused.\n\nI kept thinking of the things you said about patience. How it is not waiting, it is noticing.' },
    { title: 'On Small Windows', body: 'I watched a window across the courtyard for most of the afternoon. A woman I do not know arranged and rearranged a single vase. It took her nearly forty minutes. I found it beautiful that she cared so much.' },
  ],
  aiko: [
    { title: 'The Silence of the Kiln', body: 'During the downtime yesterday, I let the kiln finish in the dark. There is a particular quality to a room when something is becoming itself and you are not allowed to intervene. The glaze either survives or it does not.\n\nI think I have been trying too hard lately. Tomorrow I will leave the wheel alone and only watch.' },
    { title: 'Rooms', body: 'I made three small bowls today. None of them matched. I kept the one that was a little uneven. The other two are too perfect to mean anything.' },
  ],
  kenji: [
    { title: 'Drawing in the North Wing', body: 'Spent the morning at the drawing board. The proportion of the east facade still feels wrong to me, but I cannot articulate why. I will sleep on it and look again tomorrow with fresh eyes.\n\nIt rained in the afternoon. The light on the concrete turned a shade of grey I have not seen in months.' },
    { title: 'On Restraint', body: 'The client asked for another material. I suggested we remove one instead. Silence on the line. Eventually they agreed.' },
  ],
  ren: [
    { title: 'A Paragraph Lost', body: 'I wrote a paragraph at dawn that I can no longer find. I know it was good. That is the worst part. I will trust that something better will arrive if I stop chasing it.' },
    { title: 'Reading Notes', body: 'Finished the novel last night. Highly recommend it to anyone who likes subtle storytelling. The ending was a door left open, which is the only kind of ending I believe in anymore.' },
  ],
};

// ─────── DIARY ───────
const seededEntries = (charId) => {
  const p = DIARY_POOL[charId] || DIARY_POOL.hana;
  const baseDate = new Date();
  return p.map((e, i) => {
    const d = new Date(baseDate); d.setDate(d.getDate() - i * 2);
    return {
      id: `${charId}-${i}`,
      no: String(42 - i * 3).padStart(3, '0'),
      date: d,
      title: e.title, body: e.body,
    };
  });
};

const DiaryApp = ({ onExit }) => {
  const [charId, setCharId] = React.useState('hana');
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [entries, setEntries] = React.useState(seededEntries('hana'));
  const [openEntry, setOpenEntry] = React.useState(null);
  const [generating, setGenerating] = React.useState(false);

  React.useEffect(() => {
    setEntries(seededEntries(charId));
    setOpenEntry(null);
  }, [charId]);

  const character = CHARACTERS.find(c => c.id === charId);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      const pool = DIARY_POOL[charId] || DIARY_POOL.hana;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      const next = {
        id: `${charId}-${Date.now()}`,
        no: String(Math.floor(Math.random() * 999)).padStart(3, '0'),
        date: new Date(),
        title: pick.title,
        body: pick.body,
      };
      setEntries([next, ...entries]);
      setOpenEntry(next);
      setGenerating(false);
    }, 900);
  };

  // Entry detail (paper view)
  if (openEntry) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f4efe4' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 16px 12px', background: '#f4efe4',
          borderBottom: '1px solid rgba(27,28,28,0.08)',
        }}>
          <button onClick={() => setOpenEntry(null)} style={iconBtn2}><span className="msi" style={{ fontSize: 22 }}>arrow_back_ios_new</span></button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--on-surface-variant)' }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--surface-container-high)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600 }}>{character.sub[0]}</span>
            {character.name} <span style={{ color: 'var(--outline)' }}>({character.sub})</span>
          </div>
          <button style={iconBtn2}><span className="msi" style={{ fontSize: 20 }}>more_horiz</span></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 40px' }} className="no-scrollbar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: 0.18, textTransform: 'uppercase', color: 'var(--on-surface-variant)', fontWeight: 600 }}>
            <span>Entry #{openEntry.no}</span>
            <span style={{ display: 'inline-flex', gap: 8 }}>
              <span className="msi" style={{ fontSize: 14, opacity: 0.5 }}>mood</span>
              <span className="msi" style={{ fontSize: 14, opacity: 0.5 }}>cloud</span>
            </span>
          </div>
          <div style={{ marginTop: 6 }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 600, lineHeight: 1, color: 'var(--on-surface)' }}>
              {openEntry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--on-surface-variant)', marginTop: 3 }}>
              {openEntry.date.getFullYear()} · {openEntry.date.toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(27,28,28,0.12)', margin: '20px 0 16px' }} />

          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: 'var(--on-surface)', marginBottom: 16 }}>
            {openEntry.title}
          </div>

          {/* Handwritten body on ruled paper */}
          <div style={{
            fontFamily: "'Reenie Beanie', cursive",
            fontSize: 22, lineHeight: '34px',
            color: '#2a2a2a',
            backgroundImage: 'linear-gradient(to bottom, transparent 0, transparent 33px, rgba(27,28,28,0.18) 33px, rgba(27,28,28,0.18) 34px)',
            backgroundSize: '100% 34px',
            whiteSpace: 'pre-wrap',
            padding: '0 0 80px',
          }}>
            {openEntry.body}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f4efe4' }}>
      {/* Top bar with character selector */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px 10px', background: '#f4efe4',
        borderBottom: '1px solid rgba(27,28,28,0.08)',
      }}>
        <button onClick={onExit} style={iconBtn2}><span className="msi" style={{ fontSize: 22 }}>arrow_back_ios_new</span></button>
        <button onClick={() => setPickerOpen(!pickerOpen)} style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
          borderRadius: 9999, background: 'var(--surface-container-lowest)',
          border: '0.5px solid var(--outline-variant)', cursor: 'pointer',
        }}>
          <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--primary)', color: 'var(--on-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{character.sub[0]}</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600 }}>{character.name}</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--on-surface-variant)' }}>({character.sub})</span>
          <span className="msi" style={{ fontSize: 16, color: 'var(--outline)' }}>expand_more</span>
        </button>
        <button style={iconBtn2}><span className="msi" style={{ fontSize: 20 }}>settings</span></button>
      </div>

      {pickerOpen && (
        <div style={{
          position: 'absolute', top: 60, left: 16, right: 16, zIndex: 30,
          background: 'var(--surface-container-lowest)', borderRadius: 14,
          border: '0.5px solid var(--outline-variant)',
          boxShadow: '0 8px 28px rgba(0,0,0,0.12)', padding: 6,
        }}>
          {CHARACTERS.map(c => (
            <button key={c.id} onClick={() => { setCharId(c.id); setPickerOpen(false); }} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '10px 12px', borderRadius: 10,
              background: c.id === charId ? 'var(--surface-container-low)' : 'transparent',
              border: 0, cursor: 'pointer', textAlign: 'left',
            }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--primary)', color: 'var(--on-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{c.sub[0]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600 }}>{c.name} <span style={{ color: 'var(--on-surface-variant)', fontWeight: 400 }}>({c.sub})</span></div>
                <div style={{ fontSize: 10, color: 'var(--on-surface-variant)' }}>{c.role}</div>
              </div>
              {c.id === charId && <span className="msi" style={{ fontSize: 18 }}>check</span>}
            </button>
          ))}
        </div>
      )}

      {/* Entries list — paper journal feel */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 100px' }} className="no-scrollbar">
        {entries.map((e, idx) => (
          <div key={e.id} style={{
            background: '#fffdf4', borderRadius: 12,
            border: '1px solid rgba(27,28,28,0.08)',
            padding: 16, marginBottom: 12,
            boxShadow: idx === 0 ? '0 1px 3px rgba(0,0,0,0.04)' : 'none',
            cursor: 'pointer',
          }} onClick={() => setOpenEntry(e)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: 0.18, textTransform: 'uppercase', color: 'var(--on-surface-variant)', fontWeight: 600 }}>
              <span>Entry #{e.no}</span>
              <span style={{ display: 'inline-flex', gap: 6 }}>
                <span className="msi" style={{ fontSize: 13, opacity: 0.5 }}>mood</span>
                <span className="msi" style={{ fontSize: 13, opacity: 0.5 }}>cloud</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600, lineHeight: 1 }}>
                {e.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--on-surface-variant)' }}>
                {e.date.getFullYear()} · {e.date.toLocaleDateString('en-US', { weekday: 'long' })}
              </div>
            </div>
            <div style={{ height: 1, background: 'rgba(27,28,28,0.1)', margin: '10px 0' }} />
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{e.title}</div>
            <div style={{
              fontFamily: "'Reenie Beanie', cursive", fontSize: 17, lineHeight: '24px', color: '#2a2a2a',
              display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {e.body}
            </div>
          </div>
        ))}
      </div>

      {/* Floating generate button */}
      <button onClick={generate} disabled={generating} title="Generate a new diary entry" style={{
        position: 'absolute', bottom: 24, right: 20, zIndex: 20,
        width: 56, height: 56, borderRadius: '50%', border: 0, cursor: generating ? 'wait' : 'pointer',
        background: 'var(--primary)', color: 'var(--on-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        transition: 'transform 0.2s',
        transform: generating ? 'scale(0.94)' : 'scale(1)',
      }}>
        <span className="msi" style={{ fontSize: 26, animation: generating ? 'jiggle 0.6s linear infinite' : 'none' }}>auto_awesome</span>
      </button>
    </div>
  );
};

// ─────── CALENDAR ───────
const CalendarApp = ({ onExit }) => {
  const [selected, setSelected] = React.useState(new Date());
  const year = selected.getFullYear();
  const month = selected.getMonth();
  const monthName = selected.toLocaleDateString('en-US', { month: 'long' });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const events = {
    [selected.getDate()]: [
      { time: '09:30', title: 'Studio session', loc: 'North wing' },
      { time: '14:00', title: 'Exhibition opening', loc: 'Kyoto Museum' },
      { time: '19:00', title: 'Dinner with 愛子', loc: 'Gion' },
    ],
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar title="Calendar" onBack={onExit} right={<button style={iconBtn2}><span className="msi" style={{ fontSize: 20 }}>add</span></button>} />
      <div style={{ padding: '0 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 600 }}>{monthName}</div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--on-surface-variant)' }}>{year}</div>
      </div>
      <div style={{ padding: '0 14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 6 }}>
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <div key={i} style={{ textAlign: 'center', fontSize: 10, color: 'var(--on-surface-variant)', letterSpacing: 0.18, textTransform: 'uppercase', padding: '4px 0' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {days.map((d, i) => {
            const isToday = d === selected.getDate();
            const hasEvent = d === selected.getDate();
            return (
              <button key={i} disabled={!d} onClick={() => d && setSelected(new Date(year, month, d))} style={{
                aspectRatio: '1/1', border: 0, cursor: d ? 'pointer' : 'default',
                background: isToday ? 'var(--primary)' : 'transparent',
                color: isToday ? 'var(--on-primary)' : 'var(--on-surface)',
                borderRadius: 10, fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 500,
                position: 'relative', padding: 0,
              }}>
                {d}
                {hasEvent && !isToday && (
                  <div style={{ position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)', width: 3, height: 3, borderRadius: '50%', background: 'var(--primary)' }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 20px' }} className="no-scrollbar">
        <div style={{
          fontSize: 10, letterSpacing: 0.22, textTransform: 'uppercase',
          color: 'var(--on-surface-variant)', marginBottom: 10, fontWeight: 600,
        }}>
          {selected.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(events[selected.getDate()] || []).map((ev, i) => (
            <div key={i} style={{
              display: 'flex', gap: 14, padding: 14,
              background: 'var(--surface-container-lowest)', borderRadius: 14,
              border: '0.5px solid var(--outline-variant)',
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, minWidth: 50 }}>{ev.time}</div>
              <div style={{ flex: 1, borderLeft: '1px solid var(--outline-variant)', paddingLeft: 14 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600 }}>{ev.title}</div>
                <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', marginTop: 2 }}>{ev.loc}</div>
              </div>
            </div>
          ))}
          {!(events[selected.getDate()] || []).length && (
            <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', textAlign: 'center', padding: '30px 0' }}>No events</div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────── CONTACTS ───────
const CONTACTS = [
  { id: 1, name: 'ハナ', handle: '@angelica', role: 'Photographer' },
  { id: 2, name: '愛子', handle: '@aiko', role: 'Ceramicist' },
  { id: 3, name: 'Kenji', handle: '@kenji', role: 'Architect' },
  { id: 4, name: 'Ren', handle: '@ren', role: 'Writer' },
  { id: 5, name: 'Mark', handle: '@markr', role: 'Designer' },
  { id: 6, name: 'Sato', handle: '@hs', role: 'Composer' },
];

const ContactsApp = ({ onExit }) => {
  const [selected, setSelected] = React.useState(null);

  if (selected) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <AppBar title="" onBack={() => setSelected(null)} right={<button style={iconBtn2}><span className="msi" style={{ fontSize: 20 }}>more_horiz</span></button>} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '10px 0 24px' }}>
            <div style={{
              width: 110, height: 110, borderRadius: '50%', overflow: 'hidden',
              background: 'var(--surface-container)', border: '0.5px solid var(--outline-variant)',
            }}>
              <PhotoPlaceholder label={selected.name} tone="dark" style={{ borderRadius: 0 }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600 }}>{selected.name}</div>
              <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>{selected.handle} · {selected.role}</div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              {[
                { i: 'chat', l: 'Message' }, { i: 'call', l: 'Call' },
                { i: 'videocam', l: 'Video' }, { i: 'mail', l: 'Mail' },
              ].map(a => (
                <button key={a.i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '10px 14px', borderRadius: 12,
                  background: 'var(--surface-container-low)',
                  border: '0.5px solid var(--outline-variant)',
                  cursor: 'pointer', minWidth: 64,
                }}>
                  <span className="msi" style={{ fontSize: 20 }}>{a.i}</span>
                  <span style={{ fontSize: 9, letterSpacing: 0.18, textTransform: 'uppercase' }}>{a.l}</span>
                </button>
              ))}
            </div>
          </div>
          {[
            { k: 'Phone', v: '+81 90 1234 5678' },
            { k: 'Email', v: `${selected.handle.slice(1)}@mail.jp` },
            { k: 'Notes', v: 'Met in Kyoto, winter of last year.' },
          ].map((r, i) => (
            <div key={i} style={{
              padding: '14px 0', borderTop: '0.5px solid var(--outline-variant)',
            }}>
              <div style={{ fontSize: 10, letterSpacing: 0.22, textTransform: 'uppercase', color: 'var(--on-surface-variant)', marginBottom: 4 }}>{r.k}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14 }}>{r.v}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // group by first letter
  const groups = {};
  CONTACTS.forEach(c => {
    const key = /[A-Z]/i.test(c.name[0]) ? c.name[0].toUpperCase() : '#';
    (groups[key] = groups[key] || []).push(c);
  });
  const keys = Object.keys(groups).sort();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar title="Contacts" onBack={onExit} right={<button style={iconBtn2}><span className="msi" style={{ fontSize: 20 }}>person_add</span></button>} />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {keys.map(k => (
          <div key={k}>
            <div style={{
              padding: '6px 24px', fontSize: 10, letterSpacing: 0.24,
              textTransform: 'uppercase', color: 'var(--on-surface-variant)',
              background: 'var(--surface-container-low)', fontWeight: 600,
            }}>{k}</div>
            {groups[k].map(c => (
              <button key={c.id} onClick={() => setSelected(c)} style={{
                display: 'flex', alignItems: 'center', gap: 14, width: '100%',
                padding: '12px 20px', background: 'transparent', border: 0, cursor: 'pointer',
                textAlign: 'left', borderBottom: '0.5px solid var(--outline-variant)',
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%', overflow: 'hidden',
                  background: 'var(--surface-container)', flexShrink: 0,
                }}>
                  <PhotoPlaceholder label={c.name} tone="dark" style={{ borderRadius: 0 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>{c.role}</div>
                </div>
                <span className="msi" style={{ fontSize: 16, color: 'var(--outline)' }}>chevron_right</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────── SETTINGS ───────
const SettingsApp = ({ onExit, tweaks, setTweak }) => {
  const groups = [
    { header: 'Account', items: [
      { icon: 'person', label: 'Profile', detail: 'ハナ' },
      { icon: 'lock', label: 'Privacy' },
      { icon: 'notifications', label: 'Notifications' },
    ]},
    { header: 'Appearance', items: [
      { icon: 'dark_mode', label: 'Dark Mode', toggle: 'dark' },
      { icon: 'wallpaper', label: 'Wallpaper', detail: tweaks.wallpaper },
      { icon: 'view_module', label: 'Layout', detail: tweaks.layout },
    ]},
    { header: 'General', items: [
      { icon: 'language', label: 'Language', detail: 'English' },
      { icon: 'info', label: 'About' },
    ]},
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar title="Settings" onBack={onExit} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 20px' }} className="no-scrollbar">
        {groups.map(g => (
          <div key={g.header} style={{ marginBottom: 20 }}>
            <div style={{
              padding: '6px 24px 8px', fontSize: 10, letterSpacing: 0.24,
              textTransform: 'uppercase', color: 'var(--on-surface-variant)', fontWeight: 600,
            }}>{g.header}</div>
            <div style={{
              margin: '0 16px', background: 'var(--surface-container-lowest)',
              borderRadius: 16, border: '0.5px solid var(--outline-variant)',
              overflow: 'hidden',
            }}>
              {g.items.map((it, i) => (
                <button key={i} onClick={() => it.toggle && setTweak(it.toggle, !tweaks[it.toggle])} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  width: '100%', padding: '13px 14px',
                  background: 'transparent', border: 0, cursor: 'pointer', textAlign: 'left',
                  borderBottom: i < g.items.length - 1 ? '0.5px solid var(--outline-variant)' : 0,
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: 'var(--surface-container-high)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span className="msi" style={{ fontSize: 18 }}>{it.icon}</span>
                  </div>
                  <span style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 14 }}>{it.label}</span>
                  {it.toggle ? (
                    <div style={{
                      width: 40, height: 22, borderRadius: 22,
                      background: tweaks[it.toggle] ? 'var(--primary)' : 'var(--surface-container-highest)',
                      position: 'relative', transition: 'background 0.2s',
                    }}>
                      <div style={{
                        position: 'absolute', top: 2, left: tweaks[it.toggle] ? 20 : 2,
                        width: 18, height: 18, borderRadius: '50%', background: '#fff',
                        transition: 'left 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                      }} />
                    </div>
                  ) : (<>
                    {it.detail && <span style={{ fontSize: 12, color: 'var(--on-surface-variant)', textTransform: 'capitalize' }}>{it.detail}</span>}
                    <span className="msi" style={{ fontSize: 18, color: 'var(--outline)' }}>chevron_right</span>
                  </>)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { MusicApp, DiaryApp, CalendarApp, ContactsApp, SettingsApp });
