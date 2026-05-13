// Messages app — WeChat-style with Chats, Moments, Settings tabs
// Uses internal nav state for chat detail

const CONVERSATIONS = [
  {
    id: 'hana',
    name: 'ハナ',
    lastMessage: 'The exhibition opens next week. Are we still going together?',
    time: '10:42 AM',
    unread: true,
    avatarTone: 'a',
    messages: [
      { from: 'them', text: 'Hello!', time: '09:41 AM' },
      { from: 'me', text: 'I miss youuuuuu!!!', time: '09:42 AM' },
      { from: 'them', text: 'I got you ice cream, you\'re welcome', time: '09:44 AM', image: 'img1' },
      { from: 'me', text: 'That sounds perfect. Let\'s focus on the monochromatic textures and natural light integration.', time: '09:45 AM' },
      { from: 'them', text: 'The exhibition opens next week. Are we still going together?', time: '10:42 AM' },
    ],
  },
  {
    id: 'kenji',
    name: 'Kenji',
    lastMessage: 'I left the documents on your desk. Let me know if you need anything else.',
    time: 'Yesterday',
    avatarTone: 'b',
    messages: [
      { from: 'them', text: 'I left the documents on your desk. Let me know if you need anything else.', time: 'Yesterday' },
    ],
  },
  {
    id: 'aiko',
    name: '愛子',
    lastMessage: 'Thank you for the coffee earlier. It was much needed.',
    time: 'Tuesday',
    avatarTone: 'c',
    messages: [
      { from: 'them', text: 'Thank you for the coffee earlier. It was much needed.', time: 'Tuesday' },
    ],
  },
  {
    id: 'studio',
    name: 'Design Studio Project',
    lastMessage: 'Mark: The latest mockups look solid. Proceeding to dev.',
    time: 'Monday',
    group: true,
    messages: [
      { from: 'them', text: 'The latest mockups look solid. Proceeding to dev.', time: 'Monday', senderName: 'Mark' },
    ],
  },
];

const MOMENTS_INIT = [
  {
    id: 'm1', author: 'ハナ', time: '2 hours ago', location: 'Kyoto',
    text: 'Quiet mornings in the city. The fog makes everything look like a painting today.',
    image: 'city',
    comments: 2,
  },
  {
    id: 'm2', author: 'Ren', time: 'Yesterday',
    text: 'Finally finished reading that novel. Highly recommend it to anyone who likes subtle storytelling.',
  },
  {
    id: 'm3', author: '愛子', time: '3 days ago',
    text: 'Studio session.',
    image: 'studio',
  },
];

const MessageBubble = ({ msg }) => {
  const isMe = msg.from === 'me';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: isMe ? 'flex-end' : 'flex-start',
      marginLeft: isMe ? 'auto' : 0, maxWidth: '80%',
      gap: 3, marginBottom: 12,
    }}>
      {msg.senderName && (
        <div style={{
          fontSize: 10, color: 'var(--on-surface-variant)',
          fontFamily: 'var(--font-sans)', marginLeft: 8,
        }}>{msg.senderName}</div>
      )}
      <div style={{
        padding: msg.image ? 6 : '9px 14px',
        borderRadius: 20,
        background: isMe ? 'var(--primary)' : 'var(--surface-container-low)',
        color: isMe ? 'var(--on-primary)' : 'var(--on-surface)',
        border: isMe ? 0 : '0.5px solid var(--outline-variant)',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {msg.image && (
          <div style={{ width: 220, aspectRatio: '4/3', borderRadius: 16, overflow: 'hidden' }}>
            <PhotoPlaceholder label={msg.image} ratio="4/3" tone="dark" />
          </div>
        )}
        <div style={{
          padding: msg.image ? '4px 8px 2px' : 0,
          fontSize: 13, lineHeight: 1.4, fontFamily: 'var(--font-sans)',
        }}>{msg.text}</div>
      </div>
      <div style={{
        fontSize: 9, color: 'var(--on-surface-variant)',
        margin: isMe ? '0 8px 0 0' : '0 0 0 8px',
      }}>{msg.time}</div>
    </div>
  );
};

const ChatDetail = ({ chat, onBack }) => {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState(chat.messages);
  const scrollRef = React.useRef();

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'me', text: input.trim(), time: 'Now' }]);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar
        title={<span style={{ fontStyle: 'italic' }}>{chat.name}</span>}
        onBack={onBack}
        right={<>
          <button style={iconBtn}><span className="msi" style={{ fontSize: 20 }}>call</span></button>
          <button style={iconBtn}><span className="msi" style={{ fontSize: 20 }}>more_horiz</span></button>
        </>}
      />
      <div style={{
        padding: '0 20px 4px',
        display: 'flex', alignItems: 'center', gap: 6,
        marginTop: -10,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} />
        <span style={{
          fontSize: 9, letterSpacing: 0.22, textTransform: 'uppercase',
          color: 'var(--on-surface-variant)',
        }}>Online</span>
      </div>

      <div ref={scrollRef} className="no-scrollbar" style={{
        flex: 1, overflowY: 'auto', padding: '14px 18px 12px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <span style={{
            fontSize: 10, letterSpacing: 0.22, textTransform: 'uppercase',
            color: 'var(--on-surface-variant)',
            background: 'var(--surface-container)', padding: '3px 10px', borderRadius: 9999,
          }}>Today</span>
        </div>
        {messages.map((m, i) => <MessageBubble key={i} msg={m} />)}
      </div>

      <div style={{
        padding: '10px 14px 12px',
        background: 'var(--surface-container-lowest)',
        borderTop: '0.5px solid var(--outline-variant)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button style={iconBtn}><span className="msi" style={{ fontSize: 20, color: 'var(--outline)' }}>mic</span></button>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center',
          background: 'var(--surface-container-high)',
          borderRadius: 9999, padding: '8px 14px',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') send(); }}
            placeholder="Share your thoughts..."
            style={{
              flex: 1, background: 'transparent', border: 0, outline: 'none',
              fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--on-surface)',
            }}
          />
          <span className="msi" style={{ fontSize: 18, color: 'var(--outline)' }}>sentiment_satisfied</span>
        </div>
        <button onClick={send} style={{
          width: 36, height: 36, borderRadius: '50%', border: 0, cursor: 'pointer',
          background: 'var(--primary)', color: 'var(--on-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="msi" style={{ fontSize: 18 }}>{input.trim() ? 'arrow_upward' : 'add'}</span>
        </button>
      </div>
    </div>
  );
};

const ConversationsList = ({ onOpenChat }) => {
  const [query, setQuery] = React.useState('');
  const filtered = CONVERSATIONS.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
    || c.lastMessage.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <AppBar
        title="Conversations"
        left={<button style={iconBtn}><span className="msi" style={{ fontSize: 20 }}>search</span></button>}
        right={
          <button style={{
            ...iconBtn, width: 32, height: 32, borderRadius: '50%',
            background: 'var(--primary)', color: 'var(--on-primary)',
          }}><span className="msi" style={{ fontSize: 18 }}>add</span></button>
        }
      />
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          position: 'relative', display: 'flex', alignItems: 'center',
          background: 'var(--surface-container-low)', borderRadius: 9999,
          padding: '10px 16px 10px 42px',
        }}>
          <span className="msi" style={{
            position: 'absolute', left: 14, fontSize: 18, color: 'var(--outline)',
          }}>search</span>
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search"
            style={{
              flex: 1, background: 'transparent', border: 0, outline: 'none',
              fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--on-surface)',
            }}
          />
        </div>
      </div>
      <div style={{ padding: '0 8px' }}>
        {filtered.map(c => (
          <button key={c.id} onClick={() => onOpenChat(c)} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            width: '100%', padding: '10px 12px', borderRadius: 14,
            background: 'transparent', border: 0, cursor: 'pointer', textAlign: 'left',
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 50, height: 50, borderRadius: '50%', overflow: 'hidden',
                background: 'var(--surface-container)', flexShrink: 0,
                border: '0.5px solid var(--outline-variant)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {c.group ? (
                  <span className="msi" style={{ fontSize: 22, color: 'var(--outline)' }}>group</span>
                ) : (
                  <PhotoPlaceholder label={c.name} tone="light" style={{ borderRadius: 0 }} />
                )}
              </div>
              {c.unread && (
                <div style={{
                  position: 'absolute', top: 0, right: 0, width: 12, height: 12,
                  borderRadius: '50%', background: 'var(--primary)',
                  border: '2px solid var(--surface)',
                }} />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700,
                  color: 'var(--on-surface)',
                }}>{c.name}</div>
                <div style={{ fontSize: 10, color: c.unread ? 'var(--on-surface)' : 'var(--outline)', fontWeight: c.unread ? 600 : 400 }}>{c.time}</div>
              </div>
              <div style={{
                fontSize: 12, color: 'var(--on-surface-variant)',
                marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                fontWeight: c.unread ? 500 : 400,
              }}>{c.lastMessage}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const MomentsFeed = () => {
  const [posts, setPosts] = React.useState(MOMENTS_INIT);
  const [draft, setDraft] = React.useState('');
  const post = () => {
    if (!draft.trim()) return;
    setPosts([{
      id: 'm' + Date.now(), author: 'ハナ', time: 'Just now', text: draft.trim(),
    }, ...posts]);
    setDraft('');
  };

  return (
    <div>
      <AppBar
        title="Moments"
        left={<button style={iconBtn}><span className="msi" style={{ fontSize: 20 }}>arrow_back_ios_new</span></button>}
        right={<button style={iconBtn}><span className="msi" style={{ fontSize: 20 }}>photo_camera</span></button>}
      />
      {/* Cover */}
      <div style={{
        margin: '0 0 12px',
        height: 150, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, #3e3c3c 0%, #7d7a7a 60%, #c9c5c5 100%)',
      }}>
        <div style={{
          position: 'absolute', right: 20, bottom: -28, width: 56, height: 56,
          borderRadius: 10, overflow: 'hidden', border: '2px solid var(--surface)',
          background: 'var(--surface-container-high)',
        }}>
          <PhotoPlaceholder label="you" tone="dark" />
        </div>
      </div>

      <div style={{ padding: '28px 16px 12px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'var(--surface-container-low)',
          borderRadius: 9999, padding: '8px 8px 8px 16px',
        }}>
          <span className="msi" style={{ fontSize: 18, color: 'var(--outline)' }}>edit</span>
          <input
            value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') post(); }}
            placeholder="Share your thoughts..."
            style={{
              flex: 1, background: 'transparent', border: 0, outline: 'none',
              fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--on-surface)',
            }}
          />
          <button onClick={post} style={{
            padding: '6px 14px', borderRadius: 9999, border: 0, cursor: 'pointer',
            background: 'var(--primary)', color: 'var(--on-primary)',
            fontSize: 11, fontWeight: 600,
          }}>Post</button>
        </div>
      </div>

      <div style={{ padding: '4px 16px 28px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {posts.map(p => (
          <div key={p.id} style={{
            display: 'flex', gap: 12, padding: '14px 0',
            borderBottom: '0.5px solid var(--outline-variant)',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 8,
              background: 'var(--surface-container)',
              flexShrink: 0, overflow: 'hidden',
              border: '0.5px solid var(--outline-variant)',
            }}>
              <PhotoPlaceholder label={p.author} tone="dark" style={{ borderRadius: 0 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 14,
                color: 'var(--on-surface)',
              }}>{p.author}</div>
              <div style={{
                fontSize: 12, color: 'var(--on-surface)',
                marginTop: 4, lineHeight: 1.5,
              }}>{p.text}</div>
              {p.image && (
                <div style={{ marginTop: 8, borderRadius: 10, overflow: 'hidden' }}>
                  <PhotoPlaceholder label={p.image} ratio="16/9" tone="dark" style={{ borderRadius: 10 }} />
                </div>
              )}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                marginTop: 10, fontSize: 10, color: 'var(--on-surface-variant)',
              }}>
                {p.location && <><span className="msi" style={{ fontSize: 12 }}>location_on</span>{p.location}<span>·</span></>}
                <span>{p.time}</span>
              </div>
              {(p.comments ?? 0) > 0 && (
                <div style={{
                  marginTop: 10, padding: '8px 12px', borderRadius: 10,
                  background: 'var(--surface-container-low)',
                  fontSize: 11, color: 'var(--on-surface-variant)',
                }}>{p.comments} comments</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const iconBtn = {
  background: 'transparent', border: 0, padding: 6, cursor: 'pointer',
  color: 'var(--on-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const MessagesApp = ({ onExit }) => {
  const [tab, setTab] = React.useState('chat');
  const [openChat, setOpenChat] = React.useState(null);

  if (openChat) {
    return <ChatDetail chat={openChat} onBack={() => setOpenChat(null)} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto' }} className="no-scrollbar">
        {tab === 'chat' && <ConversationsList onOpenChat={setOpenChat} />}
        {tab === 'moments' && <MomentsFeed />}
        {tab === 'settings' && <MessagesSettings onExit={onExit} />}
      </div>
      <TabBar
        active={tab} onChange={setTab}
        tabs={[
          { id: 'chat', label: 'Chat', icon: 'chat' },
          { id: 'moments', label: 'Moments', icon: 'auto_stories' },
          { id: 'settings', label: 'Settings', icon: 'settings' },
        ]}
      />
    </div>
  );
};

const MessagesSettings = ({ onExit }) => (
  <div>
    <AppBar title="Settings" />
    <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {[
        { label: 'Notifications', icon: 'notifications' },
        { label: 'Privacy', icon: 'lock' },
        { label: 'Storage', icon: 'storage' },
        { label: 'Blocked', icon: 'block' },
        { label: 'About', icon: 'info' },
      ].map(it => (
        <button key={it.label} style={{
          display: 'flex', alignItems: 'center', gap: 14, padding: '14px 12px',
          background: 'transparent', border: 0, cursor: 'pointer', textAlign: 'left',
          borderBottom: '0.5px solid var(--outline-variant)',
        }}>
          <span className="msi" style={{ fontSize: 20, color: 'var(--on-surface-variant)' }}>{it.icon}</span>
          <span style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 14 }}>{it.label}</span>
          <span className="msi" style={{ fontSize: 18, color: 'var(--outline)' }}>chevron_right</span>
        </button>
      ))}
      <button onClick={onExit} style={{
        marginTop: 20, padding: '12px', borderRadius: 12, border: 0, cursor: 'pointer',
        background: 'var(--surface-container-low)', color: 'var(--on-surface)',
        fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
      }}>Exit Messages</button>
    </div>
  </div>
);

Object.assign(window, { MessagesApp });
