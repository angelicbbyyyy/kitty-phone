// Tweaks panel — floating bottom-right when enabled
const TweaksPanel = ({ tweaks, setTweak, visible }) => {
  if (!visible) return null;

  const Row = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
      <div style={{
        fontSize: 9, letterSpacing: 0.22, textTransform: 'uppercase',
        color: 'var(--on-surface-variant)', fontWeight: 600,
      }}>{label}</div>
      {children}
    </div>
  );

  const Pills = ({ value, options, onChange }) => (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} style={{
          padding: '6px 12px', borderRadius: 9999, cursor: 'pointer',
          border: '0.5px solid var(--outline-variant)',
          background: value === o ? 'var(--primary)' : 'transparent',
          color: value === o ? 'var(--on-primary)' : 'var(--on-surface)',
          fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 500,
          textTransform: 'capitalize',
        }}>{o}</button>
      ))}
    </div>
  );

  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
      width: 260, padding: 16,
      background: 'var(--surface-container-lowest)',
      border: '0.5px solid var(--outline-variant)',
      borderRadius: 16, boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
      fontFamily: 'var(--font-sans)',
    }}>
      <div style={{
        fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700,
        marginBottom: 12, color: 'var(--on-surface)',
      }}>Tweaks</div>
      <Row label="Wallpaper">
        <Pills value={tweaks.wallpaper} options={['clean', 'stars', 'photo']} onChange={v => setTweak('wallpaper', v)} />
      </Row>
      <Row label="Layout">
        <Pills value={tweaks.layout} options={['tight', 'roomy']} onChange={v => setTweak('layout', v)} />
      </Row>
      <Row label="Icon Style">
        <Pills value={tweaks.iconStyle} options={['glass', 'flat', 'mono', 'outline']} onChange={v => setTweak('iconStyle', v)} />
      </Row>
      <Row label="Dark Mode">
        <button onClick={() => setTweak('dark', !tweaks.dark)} style={{
          width: 44, height: 24, borderRadius: 24, border: 0, cursor: 'pointer',
          background: tweaks.dark ? 'var(--primary)' : 'var(--surface-container-high)',
          position: 'relative', padding: 0,
        }}>
          <div style={{
            position: 'absolute', top: 2, left: tweaks.dark ? 22 : 2,
            width: 20, height: 20, borderRadius: '50%', background: '#fff',
            transition: 'left 0.2s',
          }} />
        </button>
      </Row>
    </div>
  );
};

Object.assign(window, { TweaksPanel });
