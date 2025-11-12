import { useEffect, useMemo, useRef, useState } from "react";
import { Tent, Building2, MapPin, Info, Users, Flag, ChefHat, Users2, Timer, Route, Activity, TrafficCone, ShieldAlert } from "lucide-react";

const LOGO_URL =
  "https://www.albaitguests.com/en/assets/images/albaitguests_logo.png";

type BrandHeaderProps = { index: number; total: number; now: Date };
function BrandHeader({ index, total, now }: BrandHeaderProps) {
  const progress = Math.round(((index + 1) / total) * 100);
  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="Al Bait Guests logo"
            className="h-16 w-auto object-contain sm:h-20 3xl:h-[6.5rem]"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-xl border bg-white/90 px-3 py-1 shadow">
            <div className="text-xs sm:text-sm font-medium text-muted-foreground">Makkah Time</div>
            <div className="h-4 w-px bg-border" />
            <div className="text-xs sm:text-sm font-semibold text-foreground">{dateStr}</div>
            <div className="text-xs sm:text-sm font-black text-primary tabular-nums">{timeStr}</div>
          </div>
          <div className="text-[11px] sm:text-xs font-semibold rounded-full border px-3 py-1 text-foreground/80 bg-white/80">
            {index + 1} / {total}
          </div>
          <div className="hidden sm:block h-2 w-40 overflow-hidden rounded-full bg-muted sm:w-56">
            <div
              className="h-full bg-primary transition-[width] duration-500 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavDots({ index, total, onJump }: { index: number; total: number; onJump: (i: number) => void }) {
  return (
    <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 transform">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onJump(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-3 w-3 rounded-full transition-all ${
              i === index ? "bg-primary scale-110" : "bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function getTimeOfDayGradient(hour: number) {
  // Morning 05:00-11:59, Afternoon 12:00-17:59, Evening 18:00-04:59
  if (hour >= 5 && hour < 12) {
    return "linear-gradient(180deg, #FFE8C7 0%, #93C5FD 45%, #3B82F6 100%)"; // dawn peach -> sky blue
  }
  if (hour >= 12 && hour < 18) {
    return "linear-gradient(180deg, rgba(125,211,252,0.30) 0%, rgba(56,189,248,0.30) 50%, rgba(14,165,233,0.30) 100%), url('https://cdn.builder.io/api/v1/image/assets%2Fcb6a09a5e7a34258bfc759c4f32a4d0f%2Fccf43bfeb3004af7af174658f67fc26d?format=webp&width=800') center/cover no-repeat"; // afternoon sky image with soft overlay
  }
  return "linear-gradient(180deg, rgba(245,158,11,0.25) 0%, rgba(239,68,68,0.25) 45%, rgba(30,58,138,0.25) 100%), url('https://cdn.builder.io/api/v1/image/assets%2Fcb6a09a5e7a34258bfc759c4f32a4d0f%2F0fe9083401844b48b43135f452b34a97?format=webp&width=800') center/cover no-repeat"; // sunset sky image with overlay
}

function TimeOfDayOverlays({ hour }: { hour: number }) {
  // Morning 05:00-11:59: soft sun with rotating rays
  if (hour >= 5 && hour < 12) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-24 -right-24 h-80 w-80 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,221,128,0.95), rgba(255,221,128,0.45) 40%, rgba(255,221,128,0) 70%)",
            filter: "blur(1px)",
          }}
        />
        <div
          className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full animate-spin"
          style={{
            animationDuration: "60s",
            background:
              "conic-gradient(from 0deg, rgba(255,223,128,0.28) 0 8deg, transparent 8deg 18deg)",
            maskImage: "radial-gradient(closest-side, transparent 44%, black 46%)",
            WebkitMaskImage: "radial-gradient(closest-side, transparent 44%, black 46%)",
            filter: "blur(0.5px)",
          }}
        />
      </div>
    );
  }
  // Afternoon 12:00-17:59: bright scorching sun and heat shimmer
  if (hour >= 12 && hour < 18) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,238,170,0.5) 55%, rgba(255,238,170,0) 75%)",
            filter: "blur(1px)",
          }}
        />
        <div
          className="absolute inset-x-0 top-28 h-40"
          style={{
            background:
              "repeating-linear-gradient(180deg, rgba(255,180,0,0.12) 0 4px, rgba(255,180,0,0.0) 4px 14px)",
            filter: "blur(0.6px)",
            opacity: 0.7,
          }}
        />
      </div>
    );
  }
  // Evening 18:00-04:59: sunset glow with long shadows and vignette
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,162,50,0.9), rgba(239,68,68,0.5) 55%, rgba(239,68,68,0) 75%)",
          filter: "blur(1px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 120%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0) 70%)",
        }}
      />
    </div>
  );
}

export default function Index() {
  const slides = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7, 8], []);
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // slide autoplay
  const start = () => {
    stop();
    intervalRef.current = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
  };
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    start();
    const c = containerRef.current;
    if (c) {
      c.addEventListener("mouseenter", stop);
      c.addEventListener("mouseleave", start);
    }
    return () => {
      stop();
      if (c) {
        c.removeEventListener("mouseenter", stop);
        c.removeEventListener("mouseleave", start);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // live clock
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const gradient = getTimeOfDayGradient(now.getHours());

  return (
    <main
      className="min-h-screen text-foreground"
      style={{ background: gradient, transition: "background 700ms ease" }}
      ref={containerRef}
    >
      <section className="relative">
        <BrandHeader index={index} total={slides.length} now={now} />
        <TimeOfDayOverlays hour={now.getHours()} />
        <div className="container mx-auto px-4 relative z-10">
          {index === 0 && <CampInfoSlide />}
          {index === 1 && <FoodMenuSlide />}
          {index === 2 && <HealthSlide />}
          {index === 3 && <GuidanceSlide />}
          {index === 4 && <WeatherSlide />}
          {index === 5 && <PrayerTimesSlide />}
          {index === 6 && <QiblaAzkarSlide />}
          {index === 7 && <EmergencySlide />}
          {index === 8 && <TafweejSlide />}
        </div>
        <NavDots index={index} total={slides.length} onJump={setIndex} />
      </section>
    </main>
  );
}

function SectionTitle({ children, subtitle, icon }: { children: React.ReactNode; subtitle?: string; icon?: React.ReactNode }) {
  return (
    <div className="text-center py-6 sm:py-8">
      {icon ? <div className="mb-2 flex justify-center text-primary">{icon}</div> : null}
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl 2xl:text-5xl">{children}</h2>
      {subtitle ? (
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-black md:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}

function Card({ children, className = "", variant = "default" }: { children: React.ReactNode; className?: string; variant?: "default" | "emergency" | "accent" }) {
  if (variant === "emergency") {
    return (
      <div className="rounded-2xl p-[2px] bg-gradient-to-br from-red-500/40 to-red-400/20 border border-red-400/40">
        <div className={`rounded-2xl border border-red-400/30 bg-white shadow-sm ${className}`}>{children}</div>
      </div>
    );
  }
  return <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</div>;
}

function WeatherSlide() {
  const [temps, setTemps] = useState<{ name: string; location: string; temp: number; feelsLike: number; condition: string }[]>([
    { name: "Mina ��نى", location: "Mina", temp: 0, feelsLike: 0, condition: "Loading..." },
    { name: "Arafat عرفات", location: "Arafat", temp: 0, feelsLike: 0, condition: "Loading..." },
    { name: "Makkah مكة", location: "Makkah", temp: 0, feelsLike: 0, condition: "Loading..." },
  ]);
  const [loading, setLoading] = useState(true);
  const apiKey = "13484b7d7f764376b4381040252310";

  useEffect(() => {
    const fetchTemps = async () => {
      try {
        const locations = ["Mina", "Arafat", "Makkah"];
        const results = await Promise.all(
          locations.map((loc) =>
            fetch(`/api/weather?location=${encodeURIComponent(loc)}`)
              .then((r) => r.json())
              .catch(() => null)
          )
        );

        setTemps(
          results.map((data, i) => ({
            name: ["Mina منى", "Arafat عرفات", "Makkah مكة"][i],
            location: locations[i],
            temp: data?.current?.temp_c ?? 45,
            feelsLike: data?.current?.feelslike_c ?? 50,
            condition: data?.current?.condition?.text ?? "Unknown",
          }))
        );
      } catch (err) {
        console.error("Failed to fetch weather:", err);
        setTemps([
          { name: "Mina منى", location: "Mina", temp: 45, feelsLike: 50, condition: "Unknown" },
          { name: "Arafat عرفات", location: "Arafat", temp: 28, feelsLike: 35, condition: "Unknown" },
          { name: "Makkah مكة", location: "Makkah", temp: 34, feelsLike: 40, condition: "Unknown" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemps();
    const id = setInterval(fetchTemps, 600000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-[calc(100vh-88px)] flex flex-col items-center justify-center py-8">
      <div className="text-6xl md:text-7xl 2xl:text-8xl mb-4">🌡️</div>
      <SectionTitle children="Temperature Alert" subtitle="درجہ حرارت کی انتباہ" />
      <p className="animate-pulse text-center text-lg font-semibold text-red-600">HIGH TEMPERATURES EXPECTED</p>
      <p className="mb-6 text-center text-base text-red-600/80">.ہت زیادہ درجہ حرارت کی توقع ہے</p>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3">
        {temps.map((t) => (
          <Card key={t.location} variant="accent" className="p-6 text-center">
            <div className="text-lg font-semibold text-primary">{t.name}</div>
            {loading ? (
              <div className="my-2 text-2xl text-muted-foreground">Loading...</div>
            ) : (
              <>
                <div className="my-2 text-5xl font-black text-red-600 sm:text-6xl 2xl:text-7xl">{Math.round(t.temp)}°C</div>
                <div className="text-sm text-muted-foreground">
                  {t.condition} • Feels like {Math.round(t.feelsLike)}°C • ��حسوس ہوتا ہے {Math.round(t.feelsLike)} ڈگری
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function HealthSlide() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-animate-item]");
    items.forEach((el, i) => {
      (el as HTMLElement).classList.add("opacity-0", "-translate-x-6");
      setTimeout(() => {
        (el as HTMLElement).classList.remove("opacity-0", "-translate-x-6");
        (el as HTMLElement).classList.add("translate-x-0");
      }, 120 + i * 100);
    });
  }, []);

  const tipsA = [
    ["💧", "Stay Hydrated", "ہر 15-20 منٹ میں پانی پیتے رہیں"],
    ["☂️", "Use Sun Protection", "چھتری، ٹوپى اور سن اسکرین استعمال کریں"],
    ["👕", "Wear Light Colors", "ہلکے اور ڈھیلے کپڑے پہنیں"],
    ["⏰", "Rest During Peak Hours", "دوپہر 11 سے 4 بجے سوری س�� بچیں"],
  ];
  const tipsB = [
    ["🍎", "Eat Light Meals", "ہلکے کھانے اور تازہ پھل کھائیں"],
    ["🚶", "Walk Slowly", "آہستہ چلیں اور آرام کے وقت لیں"],
    ["🩺", "Know Heat Exhaustion Signs", "گرمی سے تھکن کی علامات جانیں"],
    ["❄️", "Seek Air‑Conditioned Areas", "ایئر کنڈیشن والی جگہوں میں رہیں"],
  ];

  return (
    <div className="min-h-[calc(100vh-88px)] flex flex-col justify-center py-8">
      <SectionTitle children="Essential Health Tips" subtitle="اہم صحت کے نکات" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[tipsA, tipsB].map((list, col) => (
          <div key={col} className="flex flex-col gap-4">
            {list.map(([icon, title, ar], i) => (
              <Card key={i} className="border-l-4 border-primary p-5 transition-all will-change-transform" data-animate-item>
                <div className="flex items-start gap-3">
                  <div className="text-2xl sm:text-3xl">{icon}</div>
                  <div className="text-base sm:text-lg">
                    <p className="font-semibold">{title}</p>
                    <p className="text-primary">{ar}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function EmergencySlide() {
  const cards = [
    { icon: "🚨", title: "Emergency", num: "911", ar: "عام ایمرجنسی" },
    { icon: "🏥", title: "Medical Emergency", num: "997", ar: "طبی ایمرجنسی" },
    { icon: "👮", title: "Security", num: "999", ar: "عام سیکیورٹی" },
    { icon: "📞", title: "Hajj Helpline", num: "920000680", ar: "حج مدد کی لائن" },
  ];
  return (
    <div className="min-h-[calc(100vh-88px)] flex flex-col justify-center py-8">
      <SectionTitle children="Emergency Contacts" subtitle="ایمرجنسی رابطے" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Card key={c.num} variant="accent" className="p-6 transition-transform hover:-translate-y-0.5">
            <div className="text-4xl">{c.icon}</div>
            <h3 className="mt-2 text-lg font-semibold text-primary">{c.title}</h3>
            <div className="text-4xl font-extrabold text-red-600">{c.num}</div>
            <p className="text-sm text-muted-foreground">{c.ar}</p>
          </Card>
        ))}
      </div>
      <Card variant="accent" className="mt-6 p-6">
        <h3 className="mb-3 text-xl font-semibold text-primary">Important Reminders - اہم یادیں</h3>
        <div className="space-y-2 text-sm md:text-base">
          <p>• Keep emergency numbers saved in your phone • اپنے فون میں ایمرجنسی نمبر محفوظ رکھیں</p>
          <p>• Always carry your ID and medical information • ہمیشہ اپنی شناخت اور طبی معلومات اپنے ساتھ رکھی��</p>
          <p>• If you feel unwell, seek help immediately • اگر آپ بیمار محسوس کریں تو فوری طور پر مدد مانگیں</p>
        </div>
      </Card>
    </div>
  );
}

function PrayerTimesSlide() {
  type PrayerData = {
    name: string;
    time: string;
    minutes: number;
    ar: string;
  };

  const [data, setData] = useState<PrayerData[]>([
    { name: "Fajr", time: "Loading...", minutes: 0, ar: "فجر" },
    { name: "Sunrise", time: "Loading...", minutes: 0, ar: "طلوع آفتاب" },
    { name: "Dhuhr", time: "Loading...", minutes: 0, ar: "ظہر" },
    { name: "Asr", time: "Loading...", minutes: 0, ar: "عصر" },
    { name: "Maghrib", time: "Loading...", minutes: 0, ar: "مغرب" },
    { name: "Isha", time: "Loading...", minutes: 0, ar: "عشاء" },
  ]);
  const [nextIdx, setNextIdx] = useState<number>(-1);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch("/api/prayer-times");
        const json = await response.json();
        const timings = json.data?.timings;

        if (timings) {
          const parseTime = (timeStr: string) => {
            const [h, m] = timeStr.split(":").map(Number);
            return { time: new Date(0, 0, 0, h, m).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }), minutes: h * 60 + m };
          };

          const prayers = [
            { name: "Fajr", ar: "فجر", ...parseTime(timings.Fajr) },
            { name: "Sunrise", ar: "طلوع آفتاب", ...parseTime(timings.Sunrise) },
            { name: "Dhuhr", ar: "ظہر", ...parseTime(timings.Dhuhr) },
            { name: "Asr", ar: "عصر", ...parseTime(timings.Asr) },
            { name: "Maghrib", ar: "مغرب", ...parseTime(timings.Maghrib) },
            { name: "Isha", ar: "عشاء", ...parseTime(timings.Isha) },
          ];

          setData(prayers);
        }
      } catch (err) {
        console.error("Failed to fetch prayer times:", err);
      }
    };

    fetchPrayerTimes();
    const id = setInterval(fetchPrayerTimes, 600000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const m = now.getHours() * 60 + now.getMinutes();
      const i = data.findIndex((p) => m < p.minutes);
      setNextIdx(i === -1 ? data.length - 1 : i);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [data]);

  return (
    <div className="min-h-[calc(100vh-88px)] flex flex-col justify-center py-8">
      <div className="flex justify-center mb-6">
        <div className="relative p-6 sm:p-8 rounded-full bg-white/40 backdrop-blur-md shadow-2xl border border-white/60">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fcb6a09a5e7a34258bfc759c4f32a4d0f%2F3a69dfd02e154aea9ec04ef2c6d0b08f?format=webp&width=800"
            alt="Prayer times icon"
            className="h-20 w-auto object-contain sm:h-28 md:h-32"
            style={{ mixBlendMode: "darken" }}
          />
        </div>
      </div>
      <SectionTitle children="Today's Prayer Times" subtitle="مواقيت الصلاة اليوم" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {data.map((p, i) => (
          <Card
            key={p.name}
            variant="accent"
            className={`${i === nextIdx ? "border-2 border-primary bg-primary/5" : ""} p-5 text-center`}
          >
            <div className="text-sm font-semibold text-primary whitespace-pre-line">{p.ar}\n{p.name}</div>
            <div className="mt-2 text-2xl font-bold md:text-3xl">{p.time}</div>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-6 text-left">
          <h3 className="mb-3 text-xl font-semibold text-primary">🕌 Special Day Reminder - خصوصی دن کی یاد دہانی</h3>
          <p className="leading-relaxed">
            <strong>Day of Arafat - عرفہ کا دن</strong>
            <br />• Stand at Arafat from Dhuhr until Maghrib • ظہر سے مغرب تک عرفہ میں رہیں
            <br />• Make abundant dua and dhikr • خوب دعا اور ذکر کریں
            <br />• Stay hydrated and seek shade • پانی پیتے رہیں اور سائے میں رہیں
          </p>
        </Card>
        <Card className="p-6 text-left">
          <h3 className="mb-3 text-xl font-semibold text-primary">📍 Location Reminder - مقام کی یاد دہانی</h3>
          <p className="leading-relaxed">
            • Prayer times are for Makkah region • نمازوں کے اوقات مکہ کے علاقے کے لیے ہیں
            <br />• Follow your group leader's guidance • اپنے گروپ لیڈر کی ہدایت پر عمل کریں
            <br />• Isha combines with Maghrib in Muzdalifah • مزدلفہ میں عشاء مغرب کے ساتھ یکجا ہے
          </p>
        </Card>
      </div>
    </div>
  );
}

function GuidanceSlide() {
  return (
    <div className="min-h-[calc(100vh-88px)] flex flex-col justify-center py-8">
      <SectionTitle children="Essential Hajj Guidance" subtitle="حج کی بنیادی رہنمائی" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card variant="accent" className="p-6">
          <h3 className="mb-4 text-center text-xl font-semibold text-primary">🚶 Movement Tips - حرکت اور نقل و انتقال کی ہدایات</h3>
          <ul className="space-y-3 text-left text-base leading-7">
            <li>
              <strong>• Stay with your group</strong>
              <br />
              <span className="text-primary">اپنے گروپ کے ساتھ رہیں</span>
            </li>
            <li>
              <strong>• Follow crowd flow directions</strong>
              <br />
              <span className="text-primary">بھیڑ کی بہاؤ کی سمت پر عمل کریں</span>
            </li>
            <li>
              <strong>• Use designated pathways</strong>
              <br />
              <span className="text-primary">مقررہ راستے استعمال کریں</span>
            </li>
            <li>
              <strong>• Avoid rushing</strong>
              <br />
              <span className="text-primary">جلدی بازی سے بچیں</span>
            </li>
          </ul>
        </Card>
        <Card variant="accent" className="p-6">
          <h3 className="mb-4 text-center text-xl font-semibold text-primary">🧳 Essential Items - ضروری اشیاء</h3>
          <ul className="space-y-3 text-left text-base leading-7">
            <li>
              <strong>• Water bottle (refillable)</strong>
              <br />
              <span className="text-primary">پانی کی بوتل (دوبارہ بھرنے کے قابل)</span>
            </li>
            <li>
              <strong>• Umbrella for sun protection</strong>
              <br />
              <span className="text-primary">سورج سے بچاؤ کے لیے چھتری</span>
            </li>
            <li>
              <strong>• Comfortable walking shoes</strong>
              <br />
              <span className="text-primary">آرام دہ چلنے والے جوتے</span>
            </li>
            <li>
              <strong>• Hand sanitizer & tissues</strong>
              <br />
              <span className="text-primary">ہاتھ کی صفائی اور ٹشو</span>
            </li>
          </ul>
        </Card>
      </div>
      <Card variant="accent" className="mt-6 p-6 text-center">
        <h3 className="mb-3 text-2xl font-semibold text-primary">🤲 Final Reminder</h3>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed">
          <strong>"Make this Hajj a source of spiritual renewal"</strong>
          <br />
          <span className="text-primary">"اس حج کو روحانی نئی زندگی کا ذریعہ بنائیں"</span>
          <br />
          Remember Allah, seek forgiveness, and pray for all • الله کو یاد کریں، معافی مانگیں اور سب کے لیے دعا کریں
        </p>
      </Card>
    </div>
  );
}

function QiblaAzkarSlide() {
  const [angle, setAngle] = useState(0);
  const [prevAngle, setPrevAngle] = useState(0);
  const [bearing, setBearing] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [morningActive, setMorningActive] = useState(true);
  const [permissionAsked, setPermissionAsked] = useState(false);
  const [deviceSupportsOrientation, setDeviceSupportsOrientation] = useState(true);

  const kaaba = { lat: 21.4225, lon: 39.8262 };
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const norm = (a: number) => ((a % 360) + 360) % 360;

  const calcBearing = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const φ1 = toRad(lat1), φ2 = toRad(lat2);
    const λ1 = toRad(lon1), λ2 = toRad(lon2);
    const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
    return norm(toDeg(Math.atan2(y, x)));
  };

  const haversineKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (typeof DeviceOrientationEvent === "undefined") setDeviceSupportsOrientation(false);
  }, []);

  // Get user location
  useEffect(() => {
    const setFrom = (lat: number, lon: number) => {
      const b = calcBearing(lat, lon, kaaba.lat, kaaba.lon);
      setBearing(b);
      setDistance(haversineKm(lat, lon, kaaba.lat, kaaba.lon));
      if (!deviceSupportsOrientation) setAngle(b);
    };

    const localLat = parseFloat(localStorage.getItem("lat") || "");
    const localLng = parseFloat(localStorage.getItem("lng") || "");
    if (!Number.isNaN(localLat) && !Number.isNaN(localLng)) setFrom(localLat, localLng);

    const success = (p: GeolocationPosition) => setFrom(p.coords.latitude, p.coords.longitude);
    const error = () => setFrom(21.3745089, 39.8327681);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true, timeout: 5000, maximumAge: 600000 });
      const watchId = navigator.geolocation.watchPosition(success);
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [deviceSupportsOrientation]);

  const enableCompass = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      try {
        const res = await (DeviceOrientationEvent as any).requestPermission();
        if (res !== "granted") return alert("Permission denied for compass");
      } catch (err) {
        console.error("Permission request failed", err);
        return;
      }
    }
    setPermissionAsked(true);

    const handler = (event: DeviceOrientationEvent) => {
      if (bearing == null) return;

      let heading = 0;
      if ((event as any).webkitCompassHeading != null) {
        heading = (event as any).webkitCompassHeading;
      } else if (event.absolute && event.alpha != null) {
        heading = 360 - event.alpha;
      } else {
        return;
      }

      const rel = (bearing - heading + 360) % 360;
      setAngle(rel);
    };

    window.addEventListener("deviceorientationabsolute", handler, true);
    window.addEventListener("deviceorientation", handler, true);
  };

  useEffect(() => {
    let diff = angle - prevAngle;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const wobble = Math.random() - 0.5;
    setPrevAngle((prev) => prev + diff + wobble);
  }, [angle]);

  useEffect(() => {
    const choose = () => {
      const h = new Date().getHours();
      setMorningActive(!(h >= 15 && h < 19));
    };
    choose();
    const id2 = setInterval(choose, 3600000);
    return () => clearInterval(id2);
  }, []);

  const AzkarBlock = ({
    title,
    time,
    items,
    active,
    onToggle,
  }: {
    title: string;
    time: string;
    items: { ar: string; en: string; times: string }[];
    active: boolean;
    onToggle: () => void;
  }) => (
    <div className={`overflow-hidden rounded-2xl border ${active ? "bg-primary/5" : ""}`}>
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-3 border-b bg-muted/50 px-4 py-3 text-left">
        <div className="flex items-center gap-2">
          <span className="text-xl">{title.includes("Morning") ? "🌅" : "🌙"}</span>
          <h4 className="font-semibold text-primary">{title}</h4>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{time}</span>
      </button>
      <div className={`grid transition-all ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="space-y-3 p-4">
            {items.map((d, i) => (
              <div key={i} className="relative rounded-xl border-l-4 border-primary bg-white p-4 pr-14">
                <p className="text-right text-primary leading-8" dir="rtl">{d.ar}</p>
                <p className="text-sm text-muted-foreground">{d.en}</p>
                <span className="absolute right-3 top-3 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">×{d.times}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-88px)] flex flex-col justify-center py-8">
      <div className="flex justify-center mb-6">
        <div className="relative p-6 sm:p-8 rounded-full bg-white/40 backdrop-blur-md shadow-2xl border border-white/60">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fcb6a09a5e7a34258bfc759c4f32a4d0f%2F936c97c4e7574dcb98915cd7d21ce8f9?format=webp&width=800"
            alt="Qibla direction logo"
            className="h-20 w-auto object-contain sm:h-28 md:h-32"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card variant="accent" className="order-2 p-6 lg:order-1">
          <h3 className="mb-4 text-center text-2xl font-semibold text-primary">🕋 Qibla Direction • قبلہ کی سمت</h3>

          {deviceSupportsOrientation && !permissionAsked && (
            <div className="mb-4 text-center">
              <button onClick={enableCompass} className="rounded-xl border border-primary bg-muted/40 px-4 py-2 text-primary shadow hover:bg-primary/10 transition">
                Enable Compass
              </button>
              <p className="mt-2 text-sm text-red-600">Move your device in a figure-8 to calibrate</p>
            </div>
          )}

          <div className="mx-auto my-4 flex items-center justify-center">
            <div className="relative h-64 w-64 rounded-full border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent shadow-inner sm:h-72 sm:w-72 md:h-80 md:w-80">
              <div className="absolute inset-3 rounded-full border-2 border-primary/30" />
              <div className="absolute inset-7 rounded-full border bg-muted/40" />
              {Array.from({ length: 32 }).map((_, i) => {
                const rot = (i * 360) / 32;
                return <span key={i} className="absolute left-1/2 top-1/2 block h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-primary/40" style={{ transform: `translate(-50%, -50%) rotate(${rot}deg) translateY(-132px)` }} />;
              })}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative h-36 w-1 origin-bottom rounded bg-gradient-to-t from-red-500 to-primary shadow transition-transform duration-500 ease-out" style={{ transform: `rotate(${prevAngle}deg)` }}>
                  <div className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">🕋</div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0">
                <span className="absolute left-1/2 top-0 -translate-x-1/2 text-xs font-semibold text-primary">N • شمال</span>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary">E • مش��ق</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-semibold text-primary">S • جنوب</span>
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary">W • مغرب</span>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Bearing to Kaaba: <span className="text-primary font-semibold">{bearing != null ? `${bearing.toFixed(1)}°` : "—"}</span>
          </p>
          <div className="rounded-xl border-l-4 border-primary bg-muted/40 p-4 text-center">
            <p className="font-semibold">Live geolocation when permitted</p>
            <p className="mt-2 text-lg font-bold">
              Distance to Kaaba: <span className="text-primary">{distance ? `${distance.toFixed(1)} km` : "—"}</span>
            </p>
          </div>
        </Card>

        <div className="order-1 col-span-2 flex flex-col gap-4 lg:order-2">
          <h2 className="text-xl font-semibold text-primary">Morning & Evening Azkar • صبح و شام کے اذکار</h2>
          <AzkarBlock
            title="Morning Azkar - صبح کے اذکار"
            time="After Fajr until Sunrise"
            items={[
              { ar: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", en: "I seek refuge in Allah from Satan the accursed", times: "3" },
              { ar: "بِسْمِ اللهِ الَّذِ�� لَا يَضُرُّ مَعَ اسْمِهِ شَ��ْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", en: "In the name of Allah, nothing can harm with His name on earth or in heaven. He is All‑Hearing, All‑Knowing", times: "3" },
              { ar: "رَضِيتُ بِاللهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ رَسُولًا", en: "I am pleased with Allah as my Lord, Islam as my religion, and Muhammad as my messenger", times: "3" },
            ]}
            active={morningActive}
            onToggle={() => setMorningActive((v) => !v)}
          />
          <AzkarBlock
            title="Evening Azkar - شام کے اذکار"
            time="After Asr until Maghrib"
            items={[
              { ar: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ", en: "We have reached evening and the dominion belongs to Allah, Lord of the worlds", times: "1" },
              { ar: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ", en: "O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant", times: "1" },
              { ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", en: "Glory is to Allah and praise is to Him", times: "100" },
            ]}
            active={!morningActive}
            onToggle={() => setMorningActive((v) => !v)}
          />
        </div>
      </div>
    </div>
  );
}

function DensityBar({ label, value }: { label: string; value: number }) {
  const color = value < 40 ? "bg-emerald-500" : value < 70 ? "bg-amber-500" : "bg-red-600";
  const text = value < 40 ? "Low • منخفض" : value < 70 ? "Moderate • متوسط" : "High • مرتفع";
  return (
    <div className="rounded-xl border p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium text-primary">{label}</span>
        <span className="text-sm text-muted-foreground">{text}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${color}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "Open" | "Busy" | "Closed" }) {
  const map = {
    Open: "bg-emerald-100 text-emerald-700 border-emerald-300",
    Busy: "bg-amber-100 text-amber-700 border-amber-300",
    Closed: "bg-red-100 text-red-700 border-red-300",
  } as const;
  return <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[status]}`}>{status}</span>;
}

function TafweejSlide() {
  const [densities, setDensities] = useState([
    { name: "Jamarat L1 • جمرات - سطح 1", v: 62 },
    { name: "Jamarat L2 • جمرات - سطح 2", v: 48 },
    { name: "King Fahd Tunnel • کنگ فہد ٹنل", v: 55 },
    { name: "Gate 79 • دروازہ 79", v: 72 },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setDensities((arr) =>
        arr.map((d, i) => ({
          ...d,
          v: Math.max(15, Math.min(95, d.v + (i % 2 === 0 ? 1 : -1) * (Math.floor(Math.random() * 7) - 3))),
        }))
      );
    }, 30000);
    return () => clearInterval(id);
  }, []);

  const groupPlan = [
    { grp: "A", time: "10:15", gate: "79", path: "Tunnel → Bridge L3", note: "Elderly priority" },
    { grp: "B", time: "10:45", gate: "80", path: "Tunnel → Bridge L2", note: "Standard flow" },
    { grp: "C", time: "11:15", gate: "78", path: "Shari' 204 → L1", note: "Wheelchair lane available" },
  ];

  const minaLat = localStorage.getItem("minaLat") || "";
  const minaLng = localStorage.getItem("minaLng") || "";
  const assemblyPoint = minaLat && minaLng ? `https://maps.google.com/?q=${minaLat},${minaLng}` : "";

  return (
    <div className="min-h-[calc(100vh-88px)] flex flex-col justify-center py-8">
      <SectionTitle
        icon={<Users className="h-10 w-10" />}
        children="Tafweej: Crowd Management & Grouping"
        subtitle="تفویج: بھیڑ کا انتظام اور گروپ بندی"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2 space-y-4">
          <Card variant="accent" className="p-6">
            <h3 className="mb-2 text-xl font-semibold text-primary flex items-center gap-2"><Activity className="h-5 w-5" /> Live Crowd Density • بھیڑ کی کثافت</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {densities.map((d) => (
                <DensityBar key={d.name} label={d.name} value={d.v} />
              ))}
            </div>
          </Card>

          <Card variant="accent" className="p-6">
            <h3 className="mb-2 text-xl font-semibold text-primary flex items-center gap-2"><TrafficCone className="h-5 w-5" /> Path Status & Advisories • را��تے کی صورتحال</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li className="flex items-center justify-between gap-3">
                <span>King Fahd Tunnel • کنگ فہد ٹنل</span>
                <StatusBadge status={densities[2].v < 65 ? "Open" : "Busy"} />
              </li>
              <li className="flex items-center justify-between gap-3">
                <span>Jamarat Bridge Gate 79 • جمرات پل دروازہ 79</span>
                <StatusBadge status={densities[3].v < 70 ? "Open" : "Busy"} />
              </li>
              <li className="flex items-center justify-between gap-3">
                <span>Al‑Mashaer Train • المشاعر ریل</span>
                <StatusBadge status="Closed" />
              </li>
            </ul>
            <div className="mt-3 rounded-xl border-l-4 border-primary bg-muted/40 p-4">
              <p className="text-sm"><strong>Advisory • تنبيه:</strong> Keep right, follow marshals’ signs, and maintain 2‑3 person spacing • دائیں رہیں، مارشلز کے اشاروں پر عمل کریں، اور 2-3 افراد کے درمی��ن فاصلہ برقرار رکھیں </p>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card variant="accent" className="p-6">
            <h3 className="mb-2 text-xl font-semibold text-primary flex items-center gap-2"><Timer className="h-5 w-5" /> Group Departures • گروپ کے روانگی کے اوقات</h3>
            <div className="divide-y">
              {groupPlan.map((g) => (
                <div key={g.grp} className="flex items-start justify-between gap-3 py-2">
                  <div>
                    <div className="text-sm font-semibold text-primary">Group {g.grp} • گروپ {g.grp}</div>
                    <div className="text-xs text-muted-foreground">Path: {g.path}</div>
                    <div className="text-xs text-muted-foreground">Note: {g.note}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{g.time}</div>
                    <div className="text-xs">Gate {g.gate} • دروازہ {g.gate}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="accent" className="p-6">
            <h3 className="mb-2 text-xl font-semibold text-primary flex items-center gap-2"><Route className="h-5 w-5" /> Stoning Windows • کنکریاں مارنے کے اوقات</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>Morning: 10:30–11:30 • صبح: 10:30–11:30</li>
              <li>Late Evening: 8:30–10:00 • شام: 8:30–10:00</li>
              <li className="text-red-600 flex items-center gap-2"><ShieldAlert className="h-4 w-4" /> Avoid peak 12:30–3:30 • پیک ٹائم سے بچیں 12:30–3:30</li>
            </ul>
          </Card>

          <Card variant="accent" className="p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold text-primary">Assembly Point • جمع ہونے کی جگہ</h3>
            {assemblyPoint ? (
              <img
                className="mx-auto mt-2 h-28 w-28 rounded-lg border"
                alt="Assembly Point QR"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(assemblyPoint)}`}
              />
            ) : (
              <p className="text-2xl font-bold">Not set</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function CampInfoSlide() {
  const [campNo, setCampNo] = useState<string>("");
  const [serviceNo, setServiceNo] = useState<string>("");
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [minaLat, setMinaLat] = useState<string>("");
  const [minaLng, setMinaLng] = useState<string>("");
  const [arafatLat, setArafatLat] = useState<string>("");
  const [arafatLng, setArafatLng] = useState<string>("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromParams = {
      camp: params.get("camp") || "",
      service: params.get("service") || "",
      lat: params.get("lat") || "",
      lng: params.get("lng") || "",
      minaLat: params.get("minaLat") || "",
      minaLng: params.get("minaLng") || "",
      arafatLat: params.get("arafatLat") || "",
      arafatLng: params.get("arafatLng") || "",
    };
    const get = (k: string) => localStorage.getItem(k) || "";
    setCampNo(fromParams.camp || get("campNo"));
    setServiceNo(fromParams.service || get("serviceNo"));
    localStorage.setItem("lng", "39.8327681");
    localStorage.setItem("lat", "21.3745089");
    localStorage.setItem("minaLng", "39.881108");
    localStorage.setItem("minaLat", "21.415722");
    localStorage.setItem("arafatLng", "39.9809327");
    localStorage.setItem("arafatLat", "21.3491038");
    setLat(fromParams.lat || get("lat"));
    setLng(fromParams.lng || get("lng"));
    setMinaLat(fromParams.minaLat || get("minaLat"));
    setMinaLng(fromParams.minaLng || get("minaLng"));
    setArafatLat(fromParams.arafatLat || get("arafatLat"));
    setArafatLng(fromParams.arafatLng || get("arafatLng"));
  }, []);

  const save = () => {
    localStorage.setItem("campNo", campNo.trim());
    localStorage.setItem("serviceNo", serviceNo.trim());
    localStorage.setItem("lat", lat.trim());
    localStorage.setItem("lng", lng.trim());
    localStorage.setItem("minaLat", minaLat.trim());
    localStorage.setItem("minaLng", minaLng.trim());
    localStorage.setItem("arafatLat", arafatLat.trim());
    localStorage.setItem("arafatLng", arafatLng.trim());
    setEditing(false);
  };

  const mapsUrl = lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : undefined;
  const mapsMina = minaLat && minaLng ? `https://maps.google.com/?q=${minaLat},${minaLng}` : undefined;
  const mapsArafat = arafatLat && arafatLng ? `https://maps.google.com/?q=${arafatLat},${arafatLng}` : undefined;

  return (
    <div className="min-h-[calc(100vh-88px)] flex flex-col items-center justify-center py-8">
      <div className="text-6xl md:text-7xl 2xl:text-8xl mb-4">
        <Users2 className="h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 xl:h-16 xl:w-16" />
      </div>

      <SectionTitle children="Hajj Camps & Service Center Info" subtitle="حج کیمپ اور سروس کی معلومات" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card variant="accent" className="p-6 text-center transition-transform hover:-translate-y-0.5">
          <div className="mx-auto mb-3 text-primary"><Users className="h-8 w-8" /></div>
          <p className="text-sm font-semibold text-primary">Service Center Head</p>
          <p className="mt-2 text-lg font-bold">ماهر بن عبدالمقتدر بن عبدالقادر اسكندر</p>
        </Card>
        <Card variant="accent" className="p-6 text-center transition-transform hover:-translate-y-0.5">
          <div className="mx-auto mb-3 text-primary"><Building2 className="h-8 w-8" /></div>
          <p className="text-sm font-semibold text-primary">Service Center Name</p>
          <p className="mt-2 text-lg font-bold">مركز خدمة 1</p>
        </Card>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card variant="accent" className="p-6 text-center transition-transform hover:-translate-y-0.5">
          <div className="mx-auto mb-3 text-primary"><Tent className="h-8 w-8" /></div>
          <p className="text-sm font-semibold text-primary">Camp No • کیمپ نمبر</p>
          <p className="mt-2 text-3xl font-extrabold">{campNo || "205 / B"}</p>
        </Card>
        <Card variant="accent" className="p-6 text-center transition-transform hover:-translate-y-0.5">
          <div className="mx-auto mb-3 text-primary"><Users className="h-8 w-8" /></div>
          <p className="text-sm font-semibold text-primary">Pilgrims Count • حاجیوں کی تعداد</p>
          <p className="mt-2 text-3xl font-extrabold">4100</p>
        </Card>
        <Card variant="accent" className="p-6 text-center transition-transform hover:-translate-y-0.5">
          <div className="mx-auto mb-3 text-primary"><Flag className="h-8 w-8" /></div>
          <p className="text-sm font-semibold text-primary">Pilgrims Nationality • حاجیوں کی قومیت</p>
          <p className="mt-2 text-3xl font-extrabold"> Pakistan</p>
        </Card>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card variant="accent" className="p-6 text-center transition-transform hover:-translate-y-0.5">
          <div className="mx-auto mb-3 text-primary"><MapPin className="h-8 w-8" /></div>
          <p className="text-sm font-semibold text-primary">Makkah Location • مکہ کی جگہ</p>
          {mapsUrl ? (
            <>
              <img
                className="mx-auto mt-3 h-28 w-28 rounded-lg border"
                alt="Makkah location QR"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(mapsUrl)}`}
              />
            </>
          ) : (
            <p className="mt-2 text-2xl font-bold">Not set</p>
          )}
        </Card>
        <Card variant="accent" className="p-6 text-center transition-transform hover:-translate-y-0.5">
          <div className="mx-auto mb-3 text-primary"><MapPin className="h-8 w-8" /></div>
          <p className="text-sm font-semibold text-primary">Mina Location • منیٰ کی جگہ</p>
          {mapsMina ? (
            <>
              <img className="mx-auto mt-3 h-28 w-28 rounded-lg border" alt="Mina QR" src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(mapsMina)}`} />
            </>
          ) : (
            <p className="mt-2 text-2xl font-bold">Not set</p>
          )}
        </Card>
        <Card variant="accent" className="p-6 text-center transition-transform hover:-translate-y-0.5">
          <div className="mx-auto mb-3 text-primary"><MapPin className="h-8 w-8" /></div>
          <p className="text-sm font-semibold text-primary">Arafat Location • عرفات کی جگہ</p>
          {mapsArafat ? (
            <>
              <img className="mx-auto mt-3 h-28 w-28 rounded-lg border" alt="Arafat QR" src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(mapsArafat)}`} />
            </>
          ) : (
            <p className="mt-2 text-2xl font-bold">Not set</p>
          )}
        </Card>
      </div>
      {editing && (
        <Card variant="accent" className="mx-auto mt-4 max-w-3xl p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <label className="text-left">
              <span className="text-sm text-muted-foreground">Camp No</span>
              <input value={campNo} onChange={(e) => setCampNo(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </label>
            <label className="text-left">
              <span className="text-sm text-muted-foreground">Service Center No</span>
              <input value={serviceNo} onChange={(e) => setServiceNo(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </label>
            <label className="text-left">
              <span className="text-sm text-muted-foreground">Latitude</span>
              <input value={lat} onChange={(e) => setLat(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </label>
            <label className="text-left">
              <span className="text-sm text-muted-foreground">Longitude</span>
              <input value={lng} onChange={(e) => setLng(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </label>
            <div className="hidden md:block" />
            <label className="text-left">
              <span className="text-sm text-muted-foreground">Mina Latitude</span>
              <input value={minaLat} onChange={(e) => setMinaLat(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </label>
            <label className="text-left">
              <span className="text-sm text-muted-foreground">Mina Longitude</span>
              <input value={minaLng} onChange={(e) => setMinaLng(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </label>
            <label className="text-left">
              <span className="text-sm text-muted-foreground">Arafat Latitude</span>
              <input value={arafatLat} onChange={(e) => setArafatLat(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </label>
            <label className="text-left">
              <span className="text-sm text-muted-foreground">Arafat Longitude</span>
              <input value={arafatLng} onChange={(e) => setArafatLng(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={() => setEditing(false)} className="rounded-full border px-4 py-2">Cancel</button>
            <button onClick={save} className="rounded-full border border-primary bg-primary px-4 py-2 text-white">Save</button>
          </div>
        </Card>
      )}
    </div>
  );
}

function FoodMenuSlide() {
  const FoodURL = `https://drive.google.com/file/d/1iogI14LUzrk7cyIqP5_f10AAw9wxQAQ3/view?usp=sharing`;
  return (
    <div className="min-h-[calc(100vh-88px)] flex flex-col items-center justify-center py-8">
      <div className="text-6xl md:text-7xl 2xl:text-8xl mb-4">
        <ChefHat className="h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 xl:h-16 xl:w-16" />
      </div>
      <SectionTitle children="Food Menu" subtitle="کھانے کی فہرست" />

      <div className="grid w-full max-w-4xl grid-cols-1 gap-8">
        <Card
          variant="accent"
          className="p-6 text-center transition-transform hover:-translate-y-0.5 mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl"
        >
          <p className="text-sm sm:text-base lg:text-xl xl:text-2xl font-semibold text-primary">
            Food Menu • کھانے کی فہرست
          </p>

          <img
            className="mx-auto mt-4 h-28 w-28 sm:h-36 sm:w-36 lg:h-48 lg:w-48 xl:h-56 xl:w-56 rounded-lg border"
            alt="Food QR"
            src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
              FoodURL
            )}`}
          />
        </Card>
      </div>
      <Card variant="accent" className="mt-6 p-6">
        <h3 className="mb-3 text-xl font-semibold text-primary">Nutritional Tips - غذائی مشورے</h3>
        <div className="space-y-2 text-sm md:text-base">
          <p>• Drink 8 cups of water daily • روزانہ 8 پانی کے گلاس پیں</p>
          <p>• Avoid overeating before stoning the Jamarat  •  تجنّب الأكل حتى التخمة قبل رمي الجمرات</p>
          <p>• If you feel unwell, seek help immediately • اگر آپ بیمار محسوس کریں تو فوری طور پر مدد مانگیں</p>
          <p>• Don’t forget to say Bismillah before eating, and Alhamdulillah alladhi at‘amana wa saqana after • لا تنسَ أن تقول بسم الله قبل الأكل، والحمد لله الذي أطعمنا وسقانا بعده</p>
        </div>
      </Card>
    </div>
  );
}
