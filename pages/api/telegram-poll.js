export const config = { runtime: 'edge' };

export default async function handler(req) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const groupId = process.env.TELEGRAM_GROUP_ID;
  if (!token || !groupId) {
    return new Response(JSON.stringify({ error: 'Telegram is not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { searchParams } = new URL(req.url);
  // Accepts either a single messageId or a comma-separated messageIds list —
  // the conversation may thread off any message we've sent (the original
  // handoff plus each visitor follow-up), and a reply to any of them counts.
  const idsParam = searchParams.get('messageIds') || searchParams.get('messageId');
  const ids = (idsParam || '').split(',').map(s => s.trim()).filter(Boolean);
  if (!ids.length) {
    return new Response(JSON.stringify({ error: 'messageId(s) required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const idSet = new Set(ids);

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/getUpdates?limit=100&allowed_updates=${encodeURIComponent(JSON.stringify(['message']))}`
    );
    const tgData = await tgRes.json();

    const replies = (tgData.ok ? tgData.result : [])
      .filter(u =>
        u.message &&
        u.message.reply_to_message &&
        idSet.has(String(u.message.reply_to_message.message_id)) &&
        String(u.message.chat.id) === String(groupId) &&
        u.message.text
      )
      .sort((a, b) => a.update_id - b.update_id)
      .map(u => ({
        updateId: u.update_id,
        text: u.message.text,
        from: u.message.from?.first_name || 'Agent',
      }));

    return new Response(JSON.stringify({ replies }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ replies: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
