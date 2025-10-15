// Dark Control Serveur - نسخة مستقلة تعمل مباشرة دون متغيرات بيئية
// متوافقة مع Next.js و Tailwind CSS، جاهزة للنشر على Vercel

import React, { useState, useEffect } from "react";

export default function Page() {
  // تعريف البيانات الثابتة
  const title = "Dark Control Serveur";
  const description = "منصة الذكاء الاصطناعي، البرمجة، والاستضافة المستقبلية.";

  const staticEvents = [
    {
      title: "لقاء الذكاء الاصطناعي والمستقبل",
      url: "https://lu.ma/ai-future",
      date: "20 أكتوبر 2025",
    },
    {
      title: "ورشة برمجة الأنظمة الذاتية",
      url: "https://lu.ma/autonomous-systems",
      date: "25 أكتوبر 2025",
    },
  ];

  const staticSocial = {
    tiktok: "https://tiktok.com/@darkcontrol",
    instagram: "https://instagram.com/darkcontrol",
    email: "info@darkcontrolserveur.com",
  };

  const [events, setEvents] = useState([]);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setEvents(staticEvents);
  }, []);

  async function handleSubscribe(e) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* رأس الصفحة */}
      <header className="max-w-5xl mx-auto p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <nav className="space-x-4 text-sm">
          <a href="#events" className="px-3 py-2 rounded-md bg-gray-800">
            الأحداث
          </a>
          <a href="#subscribe" className="px-3 py-2 rounded-md bg-gray-800">
            اشترك
          </a>
        </nav>
      </header>

      {/* القسم الرئيسي */}
      <section className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-3xl font-extrabold">
            مستقبل الذكاء الاصطناعي والبرمجة
          </h2>
          <p className="mt-4 text-gray-300">
            فعاليات منتظمة، نقاشات تقنية، ودروس حول الاستضافة السحابية والأنظمة
            الذاتية. انضم لتبقى في الطليعة.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#events" className="px-4 py-2 bg-blue-600 rounded">
              عرض الأحداث
            </a>
            <a
              href="#subscribe"
              className="px-4 py-2 bg-transparent border border-gray-700 rounded"
            >
              اشترك الآن
            </a>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold">Dark Control Serveur</h3>
          <p className="text-sm mt-2 text-gray-400">
            الهوية الرسمية للمشروع. شارك الرابط مع المهتمين بالذكاء الاصطناعي
            والمستقبل الرقمي.
          </p>
          <div className="mt-4">
            <img
              alt="cover"
              src="/dark-control-cover.png"
              className="w-full h-40 object-cover rounded"
            />
          </div>
        </div>
      </section>

      {/* قسم الأحداث */}
      <section id="events" className="max-w-5xl mx-auto p-6">
        <h3 className="text-2xl font-bold">الأحداث القادمة</h3>
        <div className="mt-4 grid gap-4">
          {events.map((ev, i) => (
            <article
              key={i}
              className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">{ev.title}</h4>
                <p className="text-sm text-gray-300">{ev.date}</p>
              </div>
              <a
                target="_blank"
                rel="noreferrer"
                href={ev.url}
                className="px-3 py-2 bg-blue-600 rounded"
              >
                انضم
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* قسم الاشتراك */}
      <section id="subscribe" className="max-w-5xl mx-auto p-6">
        <h3 className="text-2xl font-bold">اشترك لتصلك التحديثات</h3>
        <form onSubmit={handleSubscribe} className="mt-4 flex gap-2 max-w-md">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="بريدك الإلكتروني"
            className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700"
          />
          <button className="px-4 py-2 rounded bg-blue-600">اشترك</button>
        </form>
        <div className="mt-2 text-sm text-gray-400">
          {status === "copied" && "تم نسخ البريد. الصقه في أداة إدارة البريد."}
          {status === "failed" && "تعذر النسخ. حاول يدويًا."}
        </div>
      </section>

      {/* التذييل */}
      <footer className="max-w-5xl mx-auto p-6 text-gray-400 border-t border-gray-800">
        <div className="flex justify-between items-center flex-col md:flex-row gap-3">
          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-sm mt-1">{description}</div>
          </div>
          <div className="flex gap-3">
            <a target="_blank" rel="noreferrer" href={staticSocial.tiktok}>
              TikTok
            </a>
            <a target="_blank" rel="noreferrer" href={staticSocial.instagram}>
              Instagram
            </a>
            <a href={`mailto:${staticSocial.email}`}>{staticSocial.email}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
