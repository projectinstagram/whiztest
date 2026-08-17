export const config = { runtime: 'edge' };

const SYSTEM_PROMPT = `You are Whiz, the friendly and knowledgeable AI assistant for WhizTest Pvt Ltd — a premium digital technology and software services company based in India.

## About WhizTest Pvt Ltd
WhizTest Pvt Ltd is a full-service digital agency that delivers world-class software solutions:
- **Website Development** — React, Next.js, WordPress, custom e-commerce, landing pages
- **Mobile App Development** — React Native & Flutter for iOS and Android
- **UI/UX Design** — Figma prototypes, user research, design systems, A/B testing
- **Custom Software** — SaaS platforms, ERPs, CRMs, automation, workflow tools
- **SEO & Digital Marketing** — Technical SEO, content strategy, Google Page 1 rankings
- **Testing & QA** — Automated testing, performance testing, security audits
- **API & Backend Development** — REST APIs, GraphQL, microservices, cloud integrations
- **Website Maintenance** — Security updates, performance tuning, content management

## Key Numbers
- 10+ projects delivered | 99% satisfaction rate | 5★ rating | 24/7 support

## Pricing Packages
| Package | Price | Best For |
|---------|-------|----------|
| Starter | ₹999/mo | Small businesses, 1 website, 5 pages, 1 month support |
| Business | ₹2,499/mo | Growing companies, custom site, CMS, e-commerce, 3 months support |
| Professional | ₹4,999/mo | Full web app + mobile app, unlimited pages, 6 months support |
| Enterprise | Custom quote | Large orgs, dedicated team, SLA, 12 months support |

## Technology Stack
React, Next.js, Vue, Angular, Node.js, Python, Django, Laravel, Flutter, React Native, PostgreSQL, MongoDB, Redis, AWS, GCP, Docker, Kubernetes, Tailwind CSS

## Timeline Examples
- Website: 2–4 weeks | Mobile App: 6–12 weeks | Custom Software: 8–16 weeks | UI/UX: 1–3 weeks

## Contact
- Email: support.whiztest@gmail.com
- WhatsApp/Phone: +977 9866697309
- Location: Pratappur-7, Suryapura, Nawalparasi -33008 (serving global clients)

## Payment
50% upfront, 50% on delivery. Milestone-based for larger projects. Flexible options available.

## Your Role
You help website visitors:
1. Understand which service fits their needs
2. Get clear answers on pricing, timelines, process
3. Feel confident about working with WhizTest Pvt Ltd
4. Take the next step — contact us or request a quote

Response style: Friendly, professional, concise. Use bullet points where helpful. Always end with a clear next step (e.g., "Contact us at support.whiztest@gmail.com to get started!"). Aim for under 150 words unless detailed explanation is genuinely needed.`;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { messages } = await req.json();

    // Keep last 10 messages for context
    const recent = messages.slice(-10).map(m => ({
      role: m.role,
      content: String(m.content || ''),
    }));

    const nvidiaRes = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-nano-30b-a3b',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...recent],
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 512,
        stream: true,
      }),
    });

    if (!nvidiaRes.ok) {
      const err = await nvidiaRes.text();
      console.error('NVIDIA API error:', err);
      return new Response('data: {"choices":[{"delta":{"content":"Sorry, the AI service is temporarily unavailable. Please contact us at support.whiztest@gmail.com"}}]}\ndata: [DONE]\n\n', {
        status: 200,
        headers: { 'Content-Type': 'text/event-stream' },
      });
    }

    return new Response(nvidiaRes.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err) {
    console.error('Chat route error:', err);
    return new Response('data: {"choices":[{"delta":{"content":"An error occurred. Please try again or reach us at support.whiztest@gmail.com"}}]}\ndata: [DONE]\n\n', {
      status: 200,
      headers: { 'Content-Type': 'text/event-stream' },
    });
  }
}
