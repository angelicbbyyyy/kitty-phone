// Shared components for Kitty Little Phone
// StatusBar, ScreenShell, AppBar, TabBar, placeholder image, etc.

const StatusBar = ({ dark, time = '23:58' }) => {
  const c = dark ? '#f2f0f0' : '#1b1c1c';
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 28px 6px', fontFamily: 'var(--font-sans)',
      fontSize: 15, fontWeight: 600, color: c,
      position: 'relative', zIndex: 20,
    }}>
      <div>{time}</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill={c}>
          <rect x="0" y="7" width="3" height="4" rx="0.6"/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.6"/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.6" opacity="0.4"/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.6" opacity="0.25"/>
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}>
          <path d="M8 2.5C10.3 2.5 12.3 3.4 13.8 4.9L14.9 3.8C13 2 10.6 0.9 8 0.9C5.4 0.9 3 2 1.1 3.8L2.2 4.9C3.7 3.4 5.7 2.5 8 2.5z"/>
          <path d="M8 6C9.4 6 10.6 6.5 11.5 7.4L12.6 6.3C11.3 5.2 9.7 4.5 8 4.5C6.3 4.5 4.7 5.2 3.4 6.3L4.5 7.4C5.4 6.5 6.6 6 8 6z"/>
          <circle cx="8" cy="9.5" r="1.4"/>
        </svg>
        {/* battery */}
        <div style={{
          width: 24, height: 11, border: `1px solid ${c}`, borderRadius: 3,
          display: 'flex', alignItems: 'center', padding: 1, position: 'relative',
          opacity: 0.9,
        }}>
          <div style={{ background: '#e5c200', width: '75%', height: '100%', borderRadius: 1.5 }} />
          <div style={{
            position: 'absolute', right: -3, top: 3, width: 2, height: 5,
            background: c, borderRadius: '0 1px 1px 0',
          }} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, marginLeft: 1, color: '#111', background: '#f2c700', padding: '1px 4px', borderRadius: 4 }}>57</span>
      </div>
    </div>
  );
};

// iOS-ish home indicator (bottom)
const HomeIndicator = ({ dark }) => (
  <div style={{
    height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
    paddingBottom: 8, position: 'relative', zIndex: 100,
  }}>
    <div style={{
      width: 134, height: 5, borderRadius: 100,
      background: dark ? 'rgba(242,240,240,0.7)' : 'rgba(27,28,28,0.3)',
    }} />
  </div>
);

// Top App Bar for child screens
const AppBar = ({ title, left, right, onBack, dark }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '10px 20px 14px', background: 'var(--surface)',
    position: 'sticky', top: 0, zIndex: 10,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 44 }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: 'transparent', border: 0, padding: 6, cursor: 'pointer',
          display: 'flex', alignItems: 'center', color: 'var(--on-surface)',
        }}>
          <span className="msi" style={{ fontSize: 22 }}>arrow_back_ios_new</span>
        </button>
      )}
      {left}
    </div>
    <div style={{
      fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 600,
      color: 'var(--on-surface)', letterSpacing: '-0.01em',
    }}>{title}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 44, justifyContent: 'flex-end' }}>
      {right}
    </div>
  </div>
);

// Bottom tab bar for multi-tab apps
const TabBar = ({ tabs, active, onChange }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    padding: '8px 16px 6px', background: 'rgba(251,249,249,0.92)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '0.5px solid var(--outline-variant)',
  }}>
    {tabs.map(t => {
      const isActive = t.id === active;
      return (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          background: isActive ? 'var(--surface-container-high)' : 'transparent',
          border: 0, cursor: 'pointer', padding: '6px 14px', borderRadius: 14,
          color: isActive ? 'var(--on-surface)' : 'var(--on-surface-variant)',
        }}>
          <span className={`msi${isActive ? ' fill' : ''}`} style={{ fontSize: 22 }}>{t.icon}</span>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: 10,
            letterSpacing: 0.2, fontWeight: isActive ? 600 : 400,
          }}>{t.label}</span>
        </button>
      );
    })}
  </div>
);

// Striped placeholder — per system guidance
const PhotoPlaceholder = ({ label = 'image', ratio = '1/1', style = {}, tone = 'light' }) => {
  const baseBg = tone === 'dark' ? '#2b2b2b' : '#e8e6e6';
  const stripe = tone === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const text = tone === 'dark' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)';
  return (
    <div style={{
      aspectRatio: ratio,
      background: `repeating-linear-gradient(135deg, ${baseBg} 0, ${baseBg} 10px, ${stripe} 10px, ${stripe} 11px), ${baseBg}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: text, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 10, letterSpacing: 0.08, textTransform: 'lowercase',
      borderRadius: 'inherit',
      ...style,
    }}>
      {label}
    </div>
  );
};

// Avatar — initial-based or image
const Avatar = ({ name = '', src, size = 40, ring }) => {
  const initial = name.slice(0, 1);
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'var(--surface-container-high)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-serif)', fontWeight: 600,
      fontSize: size * 0.4, color: 'var(--on-surface-variant)',
      border: ring ? `1.5px solid var(--outline)` : '0',
      overflow: 'hidden', flexShrink: 0,
    }}>
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
      ) : (
        initial || <span className="msi" style={{ fontSize: size * 0.55, opacity: 0.7 }}>person</span>
      )}
    </div>
  );
};

// Generic soft card container
const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: 'var(--surface-container-lowest)',
    borderRadius: 'var(--r-md)',
    padding: 'var(--s-4)',
    border: '0.5px solid var(--outline-variant)',
    ...style,
  }}>{children}</div>
);

// Section header (editorial)
const SectionTitle = ({ children, subtitle, style = {} }) => (
  <div style={{ padding: '0 4px', ...style }}>
    <div style={{
      fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600,
      color: 'var(--on-surface)', letterSpacing: '-0.01em', lineHeight: 1.2,
    }}>{children}</div>
    {subtitle && <div style={{
      fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--on-surface-variant)',
      marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.12,
    }}>{subtitle}</div>}
  </div>
);

Object.assign(window, {
  StatusBar, HomeIndicator, AppBar, TabBar, PhotoPlaceholder, Avatar, Card, SectionTitle,
});
