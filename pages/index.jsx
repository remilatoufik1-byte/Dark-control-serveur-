// DarkControlServeur - Single-file React page (Next.js compatible) // Usage: drop this file as app/page.jsx (Next.js 13 app router) or adapt to pages/index.jsx. // Tailwind CSS expected. Deploy to Vercel. Env variables described below.

/* ENVIRONMENT VARIABLES (set these in Vercel dashboard):

NEXT_PUBLIC_SITE_TITLE  = "Dark Control Serveur"

NEXT_PUBLIC_DESCRIPTION = "منصة محتوى الذكاء الاصطناعي والبرمجة والاستضافة"

NEXT_PUBLIC_LUMA_EVENTS = JSON string array of Luma event URLs or objects, e.g.: '[{"title":"جلسة الذكاء الاصطناعي","url":"https://lu.ma/ai-future","date":"2025-10-18"}]'

NEXT_PUBLIC_SOCIAL_LINKS = JSON string of social links, e.g.: '{"tiktok":"https://tiktok.com/@you","instagram":"https://instagram.com/you"}'

NEXT_PUBLIC_EMAIL_ENDPOINT = an endpoint to POST subscription emails (or leave empty to copy to clipboard)


WHAT THIS PAGE DOES

Hero with brand and CTA

Events section which uses NEXT_PUBLIC_LUMA_EVENTS

Subscribe form that POSTs to NEXT_PUBLIC_EMAIL_ENDPOINT or copies email

Simple contact and social links

Ready for incremental customization */


import React, { useState, useEffect } from 'react'

export default function Page() { const title = process.env.NEXT_PUBLIC_SITE_TITLE || 'Dark Control Serveur' const description = process.env.NEXT_PUBLIC_DESCRIPTION || 'محتوى عن الذكاء الاصطناعي، البرمجة والاستضافة'

const [events, setEvents] = useState([]) const [social, setSocial] = useState({}) const [email, setEmail] = useState('') const [status, setStatus] = useState(null)

useEffect(() => { try { const ev = process.env.NEXT_PUBLIC_LUMA_EVENTS if (ev) { const parsed = JSON.parse(ev) setEvents(parsed) } } catch (e) { // fallback empty setEvents([]) } try { const s = process.env.NEXT_PUBLIC_SOCIAL_LINKS if (s) setSocial(JSON.parse(s)) } catch (e) { setSocial({}) } }, [])

async function handleSubscribe(e) { e.preventDefault() setStatus('sending') const endpoint = process.env.NEXT_PUBLIC_EMAIL_ENDPOINT || '' if (!endpoint) { // fallback: copy to clipboard try { await navigator.clipboard.writeText(email) setStatus('copied') } catch (err) { setStatus('failed') } return }

try {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (res.ok) setStatus('ok')
  else setStatus('failed')
} catch (err) {
  setStatus('failed')
}

}

return ( <main className="min-h-screen bg-gray-900 text-gray-100 font-sans"> <header className="max-w-5xl mx-auto p-6 flex items-center justify-between"> <div> <h1 className="text-2xl font-bold">{title}</h1> <p className="text-sm text-gray-400">{description}</p> </div> <nav className="space-x-4 text-sm"> <a href="#events" className="px-3 py-2 rounded-md bg-gray-800">الأحداث</a> <a href="#subscribe" className="px-3 py-2 rounded-md bg-gray-800">اشترك</a> </nav> </header>

<section className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
    <div>
      <h2 className="text-3xl font-extrabold">مستقبل الذكاء الاصطناعي والبرمجة</h2>
      <p className="mt-4 text-gray-300">جلسات منتظمة، دروس عملية، ونقاشات حول استضافة المشاريع والتقنيات الناشئة. انضم لتبقى في الطليعة.</p>

      <div className="mt-6 flex gap-3">
        <a href="#events" className="px-4 py-2 bg-blue-600 rounded">عرض الأحداث</a>
        <a href="#subscribe" className="px-4 py-2 bg-transparent border border-gray-700 rounded">اشترك الآن</a>
      </div>
    </div>
    <div className="bg-gradient-to-br from-gray-800 to-black rounded-lg p-6 shadow-lg">
      <h3 className="font-semibold">Dark Control Serveur</h3>
      <p className="text-sm mt-2 text-gray-400">هوية المشروع. شارك هذا الرابط لتمكين المتابعين من التسجيل للأحداث.</p>
      <div className="mt-4">
        <img alt="cover" src="/dark-control-cover.png" className="w-full h-40 object-cover rounded" />
      </div>
    </div>
  </section>

  <section id="events" className="max-w-5xl mx-auto p-6">
    <h3 className="text-2xl font-bold">الأحداث القادمة</h3>
    <div className="mt-4 grid gap-4">
      {events.length === 0 && (
        <div className="p-4 bg-gray-800 rounded">لا توجد أحداث مضافة. أضف روابط Luma في متغير NEXT_PUBLIC_LUMA_EVENTS.</div>
      )}

      {events.map((ev, i) => (
        <article key={i} className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded flex justify-between items-center">
          <div>
            <h4 className="font-semibold">{ev.title || `حدث ${i + 1}`}</h4>
            <p className="text-sm text-gray-300">{ev.date || 'تاريخ يحدد لاحقاً'}</p>
          </div>
          <div className="flex gap-2">
            <a target="_blank" rel="noreferrer" href={ev.url || ev} className="px-3 py-2 bg-blue-600 rounded">انضم</a>
            <a href={`/edit?event=${i}`} className="px-3 py-2 bg-transparent border border-gray-600 rounded">تعديل</a>
          </div>
        </article>
      ))}
    </div>
  </section>

  <section id="subscribe" className="max-w-5xl mx-auto p-6">
    <h3 className="text-2xl font-bold">اشترك لتصلك التحديثات</h3>
    <form onSubmit={handleSubscribe} className="mt-4 flex gap-2 max-w-md">
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="بريدك الإلكتروني" className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700" />
      <button className="px-4 py-2 rounded bg-blue-600">اشترك</button>
    </form>
    <div className="mt-2 text-sm text-gray-400">
      {status === 'sending' && 'جاري الإرسال...'}
      {status === 'ok' && 'تم الاشتراك.'}
      {status === 'copied' && 'تم نسخ البريد. الصقه في أداة إدارة البريد لديك.'}
      {status === 'failed' && 'فشل الإرسال. تأكد من إعداد NEXT_PUBLIC_EMAIL_ENDPOINT.'}
    </div>
  </section>

  <footer className="max-w-5xl mx-auto p-6 text-gray-400 border-t border-gray-800">
    <div className="flex justify-between items-center">
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm mt-1">{description}</div>
      </div>
      <div className="flex gap-3">
        {social.tiktok && <a target="_blank" rel="noreferrer" href={social.tiktok}>TikTok</a>}
        {social.instagram && <a target="_blank" rel="noreferrer" href={social.instagram}>Instagram</a>}
        <a href="mailto:info@darkcontrolserveur.com">info@darkcontrolserveur.com</a>
      </div>
    </div>
  </footer>
</main>

) }

  
