// Home screen — app icons, widgets, drag to rearrange, edit mode
// Two layouts: "tight" (4-col grid) and "roomy" (3-col grid, larger widgets)

// ─── APP definitions ──────────────────────────────────────────
const APP_DEFS = {
  messages: { id: 'messages', label: 'Messages', icon: 'chat_bubble' },
  music:    { id: 'music',    label: 'Music',    icon: 'music_note' },
  diary:    { id: 'diary',    label: 'Diary',    icon: 'edit_note' },
  calendar: { id: 'calendar', label: 'Calendar', icon: 'calendar_today' },
  contacts: { id: 'contacts', label: 'Contacts', icon: 'person' },
  settings: { id: 'settings', label: 'Settings', icon: 'settings' },
  // static / decorative (non-functional per brief)
  camera:   { id: 'camera',   label: 'Camera',   icon: 'photo_camera' },
  maps:     { id: 'maps',     label: 'Maps',     icon: 'explore' },
  vitals:   { id: 'vitals',   label: 'Vitals',   icon: 'favorite' },
  books:    { id: 'books',    label: 'Books',    icon: 'menu_book' },
  docs:     { id: 'docs',     label: 'Docs',     icon: 'folder' },
  weather:  { id: 'weather',  label: 'Weather',  icon: 'wb_sunny' },
};

// ─── App Icon ──────────────────────────────────────────────────
const AppIcon = ({ app, onClick, size = 'md', iconStyle = 'glass', editing, onRemove, jiggleAlt }) => {
  const def = APP_DEFS[app];
  if (!def) return null;

  const dim = size === 'lg' ? 60 : size === 'sm' ? 46 : 52;
  const radius = size === 'lg' ? 17 : size === 'sm' ? 13 : 15;

  const tileStyles = {
    glass: {
      background: 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(10px) saturate(180%)',
      WebkitBackdropFilter: 'blur(10px) saturate(180%)',
      border: '0.5px solid rgba(255,255,255,0.7)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
    },
    flat: {
      background: 'var(--surface-container-lowest)',
      border: '0.5px solid var(--outline-variant)',
    },
    mono: {
      background: 'var(--primary)',
      color: 'var(--on-primary)',
    },
    outline: {
      background: 'transparent',
      border: '1.2px solid var(--outline)',
    },
  };
  const tStyle = tileStyles[iconStyle] || tileStyles.glass;
  const iconColor = iconStyle === 'mono' ? 'var(--on-primary)' : 'var(--on-surface)';

  return (
    <div
      className={editing ? (jiggleAlt ? 'jiggle-alt' : 'jiggle') : ''}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        cursor: editing ? 'grab' : 'pointer', position: 'relative',
      }}
      onClick={(e) => { if (!editing) onClick?.(); }}
    >
      <div style={{
        width: dim, height: dim, borderRadius: radius,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...tStyle,
      }}>
        <span className="msi" style={{ fontSize: dim * 0.48, color: iconColor }}>{def.icon}</span>
      </div>
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 500,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--on-surface)',
      }}>{def.label}</span>

      {editing && (
        <button onClick={(e) => { e.stopPropagation(); onRemove?.(); }} style={{
          position: 'absolute', top: -4, left: -4, width: 20, height: 20,
          borderRadius: '50%', border: '0.5px solid var(--outline-variant)',
          background: 'var(--surface-container-lowest)', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
        }}>
          <span className="msi" style={{ fontSize: 14, color: 'var(--on-surface)' }}>remove</span>
        </button>
      )}
    </div>
  );
};

// ─── Profile Widget ──────────────────────────────────────────
const ProfileWidget = ({ profile, onEdit }) => (
  <div style={{
    background: 'var(--surface-container-lowest)',
    borderRadius: 'var(--r-lg)',
    padding: '14px 16px',
    display: 'flex', alignItems: 'center', gap: 14,
    border: '0.5px solid var(--outline-variant)',
  }}>
    <div style={{
      width: 54, height: 54, borderRadius: '50%', overflow: 'hidden',
      border: '1px solid var(--outline-variant)', flexShrink: 0,
      background: 'var(--surface-container)',
    }}>
      {profile.avatar ? (
        <img src={profile.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
      ) : (
        <div style={{
          width: '100%', height: '100%',
          background: 'repeating-linear-gradient(135deg, #d8d6d6 0 10px, #ccc9c9 10px 11px)',
        }} />
      )}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700,
          color: 'var(--on-surface)',
        }}>{profile.name}</div>
        <div style={{
          padding: '3px 10px', borderRadius: 9999,
          border: '0.5px solid var(--outline-variant)',
          background: 'var(--surface-container-low)',
          fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--on-surface-variant)',
        }}>{profile.badge}</div>
      </div>
      <div style={{
        fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--on-surface-variant)',
        marginTop: 2,
      }}>{profile.handle}</div>
      <div style={{
        fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--on-surface-variant)',
        marginTop: 3, lineHeight: 1.3,
      }}>{profile.subtitle}</div>
    </div>
  </div>
);

// ─── Photo Widget (upload) ──────────────────────────────────
const PhotoWidget = ({ photo, onUpload, onClear, editing }) => {
  const inputRef = React.useRef();
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpload(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{
      position: 'relative', aspectRatio: '1/1', borderRadius: 'var(--r-lg)',
      overflow: 'hidden', cursor: 'pointer',
      background: 'var(--surface-container)',
      border: photo ? '0.5px solid var(--outline-variant)' : '1.5px dashed var(--outline)',
    }} onClick={() => inputRef.current?.click()}>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFile} />
      {photo ? (
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
      ) : (
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 6, padding: 16, textAlign: 'center',
        }}>
          <span className="msi" style={{ fontSize: 34, color: 'var(--outline)' }}>add_photo_alternate</span>
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--on-surface-variant)',
          }}>Upload Moment</div>
        </div>
      )}
      {editing && photo && (
        <button onClick={(e) => { e.stopPropagation(); onClear(); }} style={{
          position: 'absolute', top: 8, right: 8, width: 24, height: 24,
          borderRadius: '50%', border: 0, background: 'rgba(0,0,0,0.55)',
          color: '#fff', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="msi" style={{ fontSize: 16 }}>close</span>
        </button>
      )}
    </div>
  );
};

// ─── Calendar Widget (quick) ──────────────────────────────
const CalendarWidget = () => {
  const now = new Date();
  const weekday = now.toLocaleDateString('en-US', { weekday: 'short' });
  const day = now.getDate();
  return (
    <div style={{
      aspectRatio: '1/1', borderRadius: 'var(--r-lg)',
      background: 'var(--surface-container-lowest)',
      border: '0.5px solid var(--outline-variant)',
      padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{
        fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: 0.18,
        color: '#9a9a9a',
      }}>{weekday.toUpperCase()}</div>
      <div style={{
        fontFamily: 'var(--font-serif)', fontSize: 50, fontWeight: 600,
        color: 'var(--on-surface)', lineHeight: 1,
      }}>{day}</div>
      <div style={{
        fontFamily: 'var(--font-sans)', fontSize: 10,
        color: 'var(--on-surface-variant)',
      }}>No events</div>
    </div>
  );
};

// ─── Music Widget ──────────────────────────────────────────
const MusicWidget = () => (
  <div style={{
    aspectRatio: '1/1', borderRadius: 'var(--r-lg)',
    background: 'var(--primary)', color: 'var(--on-primary)',
    padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span className="msi" style={{ fontSize: 18 }}>music_note</span>
      <span style={{
        fontSize: 9, letterSpacing: 0.18, textTransform: 'uppercase',
        opacity: 0.65,
      }}>Now Playing</span>
    </div>
    <div>
      <div style={{
        fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600,
        lineHeight: 1.2,
      }}>Ambient Curation</div>
      <div style={{ fontSize: 10, opacity: 0.65, marginTop: 2 }}>H. Sato</div>
      <div style={{
        height: 2, background: 'rgba(255,255,255,0.2)', borderRadius: 2,
        marginTop: 10, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ width: '38%', height: '100%', background: 'rgba(255,255,255,0.8)' }} />
      </div>
    </div>
  </div>
);

// ─── Weather Widget ──────────────────────────────────────
const WeatherWidget = () => (
  <div style={{
    aspectRatio: '1/1', borderRadius: 'var(--r-lg)',
    background: 'var(--surface-container-lowest)',
    border: '0.5px solid var(--outline-variant)',
    padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 10, letterSpacing: 0.18, textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>Kyoto</div>
      <span className="msi" style={{ fontSize: 16, color: 'var(--on-surface-variant)' }}>cloud</span>
    </div>
    <div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 600, lineHeight: 1 }}>14°</div>
      <div style={{ fontSize: 10, color: 'var(--on-surface-variant)', marginTop: 3 }}>Overcast · H 16° L 9°</div>
    </div>
  </div>
);

// ─── HOME SCREEN ─────────────────────────────────────────
const HomeScreen = ({ tweaks, onLaunch, onOpenEdit, state, setState }) => {
  const [editing, setEditing] = React.useState(false);
  const [draggedIdx, setDraggedIdx] = React.useState(null);

  const apps = state.apps;
  const widgets = state.widgets;
  const layout = tweaks.layout; // 'tight' | 'roomy'
  const iconStyle = tweaks.iconStyle;

  const moveApp = (from, to) => {
    if (from === to || from == null || to == null) return;
    const next = [...apps];
    const [it] = next.splice(from, 1);
    next.splice(to, 0, it);
    setState({ ...state, apps: next });
  };

  const removeApp = (id) => {
    setState({ ...state, apps: apps.filter(a => a !== id) });
  };

  const addApp = (id) => {
    if (apps.includes(id)) return;
    setState({ ...state, apps: [...apps, id] });
  };

  const toggleWidget = (id) => {
    const has = widgets.includes(id);
    setState({ ...state, widgets: has ? widgets.filter(w => w !== id) : [...widgets, id] });
  };

  const updatePhoto = (photo) => setState({ ...state, photo });

  const cols = layout === 'roomy' ? 3 : 4;
  const iconSize = layout === 'roomy' ? 'lg' : 'md';

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Wallpaper */}
      <Wallpaper variant={tweaks.wallpaper} />

      {/* Scroll container */}
      <div
        className="no-scrollbar"
        onClick={() => { if (editing) setEditing(false); }}
        style={{
          flex: 1, overflowY: 'auto', padding: '4px 20px 130px',
          display: 'flex', flexDirection: 'column', gap: 16,
          position: 'relative', zIndex: 5,
        }}
      >
        {/* Profile widget always top */}
        <div onClick={(e) => e.stopPropagation()}>
          <ProfileWidget profile={state.profile} />
        </div>

        {/* Widgets row */}
        {widgets.length > 0 && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(widgets.length, 2)}, 1fr)`, gap: 12 }}
          >
            {widgets.includes('calendar') && <CalendarWidget />}
            {widgets.includes('music') && <MusicWidget />}
            {widgets.includes('weather') && <WeatherWidget />}
          </div>
        )}

        {/* App icon grid */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: layout === 'roomy' ? '22px 16px' : '18px 8px',
            padding: '4px 0',
          }}
        >
          {apps.map((id, idx) => (
            <div
              key={id}
              draggable={editing}
              onDragStart={() => setDraggedIdx(idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { moveApp(draggedIdx, idx); setDraggedIdx(null); }}
              onDragEnd={() => setDraggedIdx(null)}
              style={{
                opacity: draggedIdx === idx ? 0.35 : 1,
                transition: 'opacity 0.15s',
              }}
            >
              <AppIcon
                app={id}
                onClick={() => onLaunch(id)}
                size={iconSize}
                iconStyle={iconStyle}
                editing={editing}
                jiggleAlt={idx % 2 === 1}
                onRemove={() => removeApp(id)}
              />
            </div>
          ))}
        </div>

        {/* Photo widget */}
        <div onClick={(e) => e.stopPropagation()} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <PhotoWidget photo={state.photo} onUpload={updatePhoto} onClear={() => updatePhoto(null)} editing={editing} />
          <div style={{
            aspectRatio: '1/1', borderRadius: 'var(--r-lg)',
            background: 'var(--surface-container-lowest)',
            border: '0.5px solid var(--outline-variant)',
            padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{
              fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600,
              letterSpacing: 0.2, textTransform: 'uppercase',
              color: 'var(--on-surface-variant)',
            }}>Today</div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>
                {state.quote}
              </div>
            </div>
            <div style={{ fontSize: 10, color: 'var(--on-surface-variant)' }}>— Saved quote</div>
          </div>
        </div>

        {/* Edit panel (when editing) */}
        {editing && (
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'var(--surface-container-lowest)',
            border: '0.5px solid var(--outline-variant)',
            borderRadius: 'var(--r-lg)', padding: 14,
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600,
            }}>Add Apps</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px 8px' }}>
              {Object.keys(APP_DEFS).filter(id => !apps.includes(id)).map(id => (
                <button key={id} onClick={() => addApp(id)} style={{
                  background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 13,
                    background: 'var(--surface-container-low)',
                    border: '1px dashed var(--outline-variant)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <span className="msi" style={{ fontSize: 22, color: 'var(--on-surface-variant)' }}>{APP_DEFS[id].icon}</span>
                    <div style={{
                      position: 'absolute', bottom: -2, right: -2, width: 16, height: 16,
                      borderRadius: '50%', background: 'var(--primary)', color: 'var(--on-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span className="msi" style={{ fontSize: 12 }}>add</span>
                    </div>
                  </div>
                  <span style={{
                    fontSize: 9, fontWeight: 500, letterSpacing: 0.18, textTransform: 'uppercase',
                    color: 'var(--on-surface-variant)',
                  }}>{APP_DEFS[id].label}</span>
                </button>
              ))}
              {Object.keys(APP_DEFS).filter(id => !apps.includes(id)).length === 0 && (
                <div style={{
                  gridColumn: '1 / -1', fontSize: 11, color: 'var(--on-surface-variant)',
                  textAlign: 'center', padding: '8px 0',
                }}>All apps installed.</div>
              )}
            </div>

            <div style={{ height: 0.5, background: 'var(--outline-variant)' }} />

            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600,
            }}>Widgets</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['calendar', 'music', 'weather'].map(w => (
                <button key={w} onClick={() => toggleWidget(w)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: 12,
                  background: 'var(--surface-container-low)',
                  border: '0.5px solid var(--outline-variant)',
                  cursor: 'pointer', textAlign: 'left',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
                    textTransform: 'capitalize',
                  }}>{w}</span>
                  <span style={{
                    fontSize: 10, fontFamily: 'var(--font-sans)', letterSpacing: 0.18,
                    textTransform: 'uppercase', color: widgets.includes(w) ? 'var(--primary)' : 'var(--on-surface-variant)',
                    fontWeight: widgets.includes(w) ? 700 : 400,
                  }}>{widgets.includes(w) ? 'On' : 'Off'}</span>
                </button>
              ))}
            </div>

            <button onClick={() => setEditing(false)} style={{
              padding: '10px', borderRadius: 12, border: 0, cursor: 'pointer',
              background: 'var(--primary)', color: 'var(--on-primary)',
              fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
              letterSpacing: 0.18, textTransform: 'uppercase', marginTop: 4,
            }}>Done</button>
          </div>
        )}
      </div>

      {/* Dock / bottom bar */}
      {!editing && (
        <div style={{
          position: 'absolute', bottom: 16, left: 20, right: 20, zIndex: 50,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '10px 16px',
          background: 'rgba(245,243,243,0.7)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '0.5px solid rgba(255,255,255,0.8)',
          borderRadius: 'var(--r-xl)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }}>
          <button onClick={() => onLaunch('settings')} style={dockBtnStyle}>
            <span className="msi" style={{ fontSize: 26 }}>settings</span>
          </button>
          <button onClick={() => onLaunch('messages')} style={{ ...dockBtnStyle, background: 'var(--surface-container-lowest)' }}>
            <span className="msi fill" style={{ fontSize: 26 }}>chat</span>
          </button>
          <button onClick={() => onLaunch('music')} style={dockBtnStyle}>
            <span className="msi" style={{ fontSize: 26 }}>music_note</span>
          </button>
          <button onClick={() => setEditing(true)} style={dockBtnStyle} title="Edit home screen">
            <span className="msi" style={{ fontSize: 24 }}>tune</span>
          </button>
        </div>
      )}
    </div>
  );
};

const dockBtnStyle = {
  width: 52, height: 48, borderRadius: 'var(--r-md)',
  background: 'transparent', border: 0, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--on-surface)', padding: 0,
};

// ─── Wallpaper ─────────────────────────────────────────
const Wallpaper = ({ variant }) => {
  if (variant === 'stars') {
    const stars = [];
    const seed = (i, a) => ((i * 9301 + a * 49297) % 233280) / 233280;
    for (let i = 0; i < 40; i++) {
      const x = seed(i, 1) * 100;
      const y = seed(i, 2) * 100;
      const s = 8 + seed(i, 3) * 14;
      const o = 0.08 + seed(i, 4) * 0.15;
      stars.push(
        <svg key={i} style={{
          position: 'absolute', left: `${x}%`, top: `${y}%`,
          width: s, height: s, opacity: o,
        }} viewBox="0 0 24 24" fill="#1b1c1c">
          <path d="M12 2 L14 9 L21 11 L15 15 L17 22 L12 18 L7 22 L9 15 L3 11 L10 9 Z" />
        </svg>
      );
    }
    return (
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(180deg, #e8e6e6 0%, #d9d7d7 100%)',
      }}>{stars}</div>
    );
  }
  if (variant === 'photo') {
    return (
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(160deg, #c9c5c5 0%, #7d7a7a 60%, #3e3c3c 100%)',
      }}>
        {/* subtle vignette + grain */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.25), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(0,0,0,0.3), transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.15,
          background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 3px)',
        }} />
      </div>
    );
  }
  // default: clean
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 0,
      background: 'linear-gradient(180deg, var(--surface) 0%, var(--surface-container) 100%)',
    }} />
  );
};

Object.assign(window, { HomeScreen, APP_DEFS });
