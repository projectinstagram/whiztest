export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const groupId = process.env.TELEGRAM_GROUP_ID;
  if (!token || !groupId) {
    return new Response(JSON.stringify({ error: 'Telegram is not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages, email, form, followUp } = await req.json();

    let text;
    if (form) {
      const clip = (v, n = 300) => String(v || '').slice(0, n);
      text = `📩 NEW CONTACT FORM SUBMISSION\n\n`
        + `👤 Name: ${clip(form.name) || '(not given)'}\n`
        + `📧 Email: ${clip(form.email) || '(not given)'}\n`
        + `📱 Phone: ${clip(form.phone) || '(not given)'}\n`
        + `🛠 Service: ${clip(form.serviceLabel) || '(not specified)'}\n\n`
        + `💬 Message:\n${clip(form.message, 1000) || '(no message)'}`;
    } else if (followUp) {
      text = `🧑 ${String(followUp.text || '').slice(0, 1000)}`;
    } else {
      const recent = (messages || []).slice(-6).map(m =>
        `${m.role === 'user' ? '🧑 Visitor' : '🤖 Whiz'}: ${String(m.content || '').slice(0, 500)}`
      ).join('\n\n');
      const contactLine = email ? `\n📧 Contact email: ${String(email).slice(0, 200)}\n` : '';
      text = `🆘 LIVE CHAT HANDOFF\n\nA website visitor wants to talk to a human.${contactLine}\n${recent || '(no prior messages)'}\n\n⚠️ IMPORTANT: Swipe/long-press this message and tap Reply to answer — a plain new message won't reach the visitor.`;
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: groupId,
        text,
        ...(followUp?.replyToMessageId ? { reply_to_message_id: followUp.replyToMessageId } : {}),
      }),
    });
    const tgData = await tgRes.json();

    if (!tgData.ok) {
      return new Response(JSON.stringify({ error: 'Failed to reach Telegram', detail: tgData.description }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ messageId: tgData.result.message_id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Handoff failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
