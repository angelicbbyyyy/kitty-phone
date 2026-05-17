// OpenRouter adapter — OpenAI-compatible format
// Auth: Authorization: Bearer <key>
// Docs: openrouter.ai/docs

export const OPENROUTER_BASE = 'https://openrouter.ai/api/v1';

function toMessages(systemPrompt, messages) {
  const out = [{ role: 'system', content: systemPrompt }];
  for (const m of messages) {
    if (!m.text || m.typing) continue;
    out.push({ role: m.from === 'me' ? 'user' : 'assistant', content: m.text });
  }
  return out;
}

export async function callOpenRouter({ baseUrl, apiKey, model, systemPrompt, messages }) {
  if (!apiKey) throw new Error('No API key — open Settings → AI → General API and add your OpenRouter key.');

  const base = (baseUrl || OPENROUTER_BASE).replace(/\/+$/, '');
  const url  = `${base}/chat/completions`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || 'openai/gpt-4o-mini',
      messages: toMessages(systemPrompt, messages),
      max_tokens: 200,
      temperature: 1.1,
    }),
  });

  if (!res.ok) {
    const raw = await res.text().catch(() => '');
    let detail = '';
    try { detail = JSON.parse(raw)?.error?.message || raw; } catch { detail = raw; }
    throw new Error(`OpenRouter ${res.status}: ${detail.slice(0, 300)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty response from OpenRouter.');
  return text.trim();
}
