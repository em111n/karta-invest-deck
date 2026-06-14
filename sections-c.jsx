/* Karta - Investor Deck · sections 8-12: Market, Vision, Team, Roadmap, Ask + Footer */
const { useState: cS, useEffect: cE, useRef: cR } = React;

/* 08 - MARKET lives in market-section.jsx (ported bento layout) */

/* ============================================================
   08 - VISION
   ============================================================ */
const HORIZONS = [
  { y: "5",  unit: "years", tagline: "Near term",
    t: "Primary financial home for 10M+ borderless people.",
    d: "The default place where global income lands, gets spent globally, sent globally, and earns yield natively.",
    tag: "A neobank-scale business on stablecoin rails." },
  { y: "10", unit: "years", tagline: "Infrastructure",
    t: "Stablecoins become the infrastructure of money.",
    d: "Like TCP/IP for the internet - invisible, universal, default.",
    tag: "Karta is one of the consumer interfaces that won that transition." },
  { y: "∞",  unit: "bigger bet", tagline: "The worldview",
    t: "Borderless living isn't a niche - it's where the world is going.",
    d: "Remote work. Creator economy. Global teams. Distributed families. The financial system has to adapt.",
    tag: "We're building it.", acid: true },
];
/* crescendo card - big top-pinned ghost number (+ gray "years" to its right) */
function CCard({ h, half }) {
  const fd = "var(--pp-font-display)";
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 8, border: `1px solid ${h.acid ? "rgba(204,255,0,.28)" : "var(--pp-line)"}`, padding: "clamp(24px,2.6vw,38px)", height: "100%", minHeight: "clamp(200px,19vw,264px)", display: "flex", flexDirection: "column", justifyContent: "center",
      background: h.acid ? "radial-gradient(120% 130% at 88% 50%, rgba(204,255,0,.14), transparent 60%), var(--pp-card)" : "var(--pp-card)" }}>
      <div aria-hidden="true" style={{ position: "absolute", right: half ? "clamp(-2px,.6vw,14px)" : "clamp(-4px,1vw,22px)", top: half ? "clamp(-14px,-1.2vw,0px)" : "50%", transform: half ? "none" : "translateY(-50%)", display: "flex", flexDirection: "row", alignItems: "flex-end", gap: "0.06em", lineHeight: 0.8, pointerEvents: "none", userSelect: "none" }}>
        <span style={{ fontFamily: fd, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: half ? "clamp(120px,15vw,200px)" : "clamp(116px,15vw,224px)", lineHeight: 0.78, letterSpacing: "-.04em", color: "transparent", WebkitTextStroke: `1.4px ${h.acid ? "rgba(204,255,0,.5)" : "#1f1f1f"}` }}>{h.y}</span>
        {h.y !== "∞" && <span style={{ fontFamily: fd, fontWeight: 600, fontStretch: "125%", fontVariationSettings: "'wght' 600,'wdth' 125", fontSize: half ? "clamp(15px,1.7vw,26px)" : "clamp(22px,2.6vw,40px)", letterSpacing: ".02em", marginBottom: "0.22em", color: "rgba(255,255,255,.1)" }}>years</span>}
      </div>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 11, maxWidth: half ? "none" : 720, paddingRight: half ? "clamp(96px,14vw,250px)" : 0 }}>
        <span style={{ fontFamily: fd, fontWeight: 600, fontSize: 12.5, letterSpacing: ".16em", textTransform: "uppercase", color: h.acid ? "var(--pp-acid)" : "var(--pp-fg-4)" }}>{h.tagline} · {h.unit === "bigger bet" ? "the long bet" : h.y + " " + h.unit}</span>
        <h3 style={{ margin: 0, fontFamily: fd, fontWeight: 700, fontStretch: "125%", fontSize: "clamp(22px,2.6vw,34px)", lineHeight: 1.16, letterSpacing: "-.025em", color: "var(--pp-fg)" }}>{h.t}</h3>
        <p className="pp-body" style={{ margin: 0, fontSize: 15, maxWidth: 580 }}>{h.d}</p>
        <span style={{ fontFamily: fd, fontWeight: 600, fontSize: 15.5, color: h.acid ? "var(--pp-acid)" : "var(--pp-fg-2)" }}>{h.tag}</span>
      </div>
    </div>);
}
function Vision() {
  return (
    <React.Fragment>
      <SectionHero
        id="vision" num="08" kicker="vision" align="left" glow
        parts={[
          { t: "Karta becomes the default " },
          { t: "financial home", hi: true },
          { t: " for a whole generation." },
        ]}
        lead="The generation that doesn't fit one country anymore." />
      <Section tightTop dataLabel="08 Vision · detail">
        {/* 5y + 10y side by side, ∞ full-width below */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}>
            <Reveal variant="scale" style={{ height: "100%" }}><CCard h={HORIZONS[0]} half /></Reveal>
            <Reveal variant="scale" delay={0.07} style={{ height: "100%" }}><CCard h={HORIZONS[1]} half /></Reveal>
          </div>
          <Reveal variant="scale" delay={0.12}><CCard h={HORIZONS[2]} /></Reveal>
        </div>

        <Reveal>
          <div style={{ borderTop: "1px solid var(--pp-line)", paddingTop: "clamp(40px,5vw,64px)", display: "flex", justifyContent: "center" }}>
            <p style={{ margin: 0, maxWidth: 900, textAlign: "center", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(22px,2.8vw,36px)", lineHeight: 1.3, letterSpacing: "-.01em", color: "var(--pp-fg)" }}>
              We're not betting on crypto. We're betting on <span style={{ color: "var(--pp-acid)" }}>people who don't fit into one country anymore.</span>
            </p>
          </div>
        </Reveal>
      </Section>
    </React.Fragment>
  );
}

/* ============================================================
   10 - TEAM
   ============================================================ */
const LINE = "var(--pp-line)";
const AVATAR = "assets/user-avatar.png";

const HEADCOUNT = [
  ["Engineering", "13 (13.5 FTE)", "[FILL: validated with CTO]"],
  ["Product & Discovery", "3", "[FILL]"],
  ["Marketing", "9 (~7.5 FTE)", "~27 FTE (per roadmap)"],
  ["Compliance / Risk", "onboarding", "[FILL]"],
  ["Business / Ops", "~10 (Finance, Ops, Support, HR)", "[FILL]"],
];
const HEADCOUNT_TOTAL = ["Total", "~35+", "~57+ (per hiring plan)"];
const OPEN_ROLES = [
  "Head of AI Infra (P1)", "CFO", "SecDevOps",
  "Mobile dev team (2 Mobile + 1 Back + 1 QA + Design)",
  "B2B team (1 Back + 1 QA + Design)", "AI Engineer",
  "19 marketing positions across Q2 2026 → Q1 2027 (see Roadmap)",
];
/* render a headcount cell - [FILL...] placeholders show dimmed */
function Cell({ v, head, total }) {
  const fill = typeof v === "string" && v.indexOf("[FILL") === 0;
  return <span style={{ fontFamily: total ? FD : FB, fontWeight: total ? 700 : 400, fontSize: head ? 11 : 13.5, letterSpacing: head ? ".14em" : 0, textTransform: head ? "uppercase" : "none", color: head ? FG4 : (fill ? "#4a4a4a" : (total ? FG : FG2)), fontStyle: fill ? "italic" : "normal" }}>{v}</span>;
}
function HeadcountTable() {
  const cols = "minmax(0,1.2fr) minmax(0,1.4fr) minmax(0,1.4fr)";
  return (
    <div style={{ border: `1px solid ${LINE}`, borderRadius: 8, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 18, padding: "13px 20px", borderBottom: `1px solid ${LINE}`, background: "#0c0c0c" }}>
        {["Function", "Now", "EOY 2026 plan"].map((h, i) => <Cell key={i} v={h} head />)}
      </div>
      {HEADCOUNT.map((r, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: cols, gap: 18, padding: "13px 20px", borderBottom: `1px solid #141414`, alignItems: "center" }}>
          {r.map((c, ci) => <Cell key={ci} v={c} />)}
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 18, padding: "15px 20px", alignItems: "center", background: "linear-gradient(90deg, rgba(204,255,0,.06), transparent 70%)" }}>
        {HEADCOUNT_TOTAL.map((c, ci) => <Cell key={ci} v={c} total />)}
      </div>
    </div>);
}
function OpenRoles() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {OPEN_ROLES.map((r, i) => (
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 11, padding: "9px 0", borderTop: i > 0 ? `1px solid #141414` : "none" }}>
          <span style={{ flex: "none", width: 6, height: 6, borderRadius: "50%", background: ACID, transform: "translateY(-2px)" }} />
          <span style={{ fontFamily: FB, fontSize: 14, lineHeight: 1.4, color: FG2 }}>{r}</span>
        </div>
      ))}
    </div>);
}

const PEOPLE = [
  { name: "Nik Zimarkov", role: "Founder & CEO", initials: "NZ", li: "https://www.linkedin.com",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    short: "Serial entrepreneur since 2013. Co-founded SWIPE (Thailand) - scaled the team 20→100, $1M revenue in two months. Founded Karta in 2021.",
    bio: "Serial entrepreneur since 2013. Co-founded SWIPE (Thailand) - raised seed from FRII, scaled the team 20→100, $1M revenue in two months. Led business development at DataLead managing $0.5M+ enterprise accounts. Founded Karta in 2021 to build stablecoin-native payment infrastructure for borderless people." },
  { name: "Ron Lieberman", role: "Co-Founder", initials: "RL", li: "https://www.linkedin.com",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    short: "Venture builder & serial entrepreneur. Co-founded Karta in 2022. Built Kometa.Black and Raketa.Fit; Managing Partner at Boson Kicks.",
    bio: "Venture builder and serial entrepreneur. Co-founded Karta in July 2022. Previously founded and scaled Kometa.Black - a concept fitness and social club that became a category icon in Moscow. CEO of Raketa.Fit. Managing Partner at Boson Kicks - a VC and acceleration fund focused on IT, e-commerce and SaaS. Board Member at Cosmic Solutions OÜ (Estonia)." },
  { name: "Matvey Aliev", role: "Co-Founder & CTO", initials: "MA", li: "https://www.linkedin.com",
    photo: "https://randomuser.me/api/portraits/men/41.jpg",
    short: "Engineer & AI systems builder. 120× gains at Haute Coupure; launched Supastore solo. Owns Karta's AI-agent architecture.",
    bio: "Engineer and AI systems builder. Built algorithmic financial-strategy systems at Haute Coupure - 120× performance gains, 3rd place in U.S. Financial Competitions (2023). Founded and launched Supastore solo (full-stack e-commerce, 2024). At Karta, defined the end-to-end AI-agent architecture and shipped the first production finance assistant with stateful memory and compliance guardrails." },
];

/* circular avatar with initials fallback */
function Avatar({ p, size }) {
  return (
    <div style={{ position: "relative", flex: "none", width: size, height: size, borderRadius: "50%", overflow: "hidden", background: "linear-gradient(150deg,#161616,#0c0c0c)", border: `1px solid ${LINE}` }}>
      <img src={AVATAR} alt={p.name} draggable={false} loading="lazy"
        onError={(e) => { e.target.style.display = "none"; }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", transform: "scale(0.84)" }} />
    </div>);
}
function LinkedIn({ href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", fontFamily: FD, fontWeight: 600, fontSize: 12.5, letterSpacing: ".02em", color: FG3, transition: "color .2s" }}
      onMouseEnter={(e) => { e.currentTarget.style.color = ACID; }} onMouseLeave={(e) => { e.currentTarget.style.color = FG3; }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 23, height: 23, borderRadius: 4, background: "#1a1a1a", border: `1px solid ${LINE}` }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.25 8.25h4.5V24h-4.5V8.25Zm7.5 0h4.31v2.15h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-6.99c0-1.67-.03-3.81-2.32-3.81-2.32 0-2.68 1.81-2.68 3.69V24h-4.5V8.25Z" /></svg>
      </span>
      LinkedIn
    </a>);
}
function NameRole({ p, nameSize = 19 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
      <span style={{ fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontSize: nameSize, letterSpacing: "-.01em", color: FG, lineHeight: 1.1 }}>{p.name}</span>
      <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12.5, letterSpacing: ".04em", color: ACID }}>{p.role}</span>
    </div>);
}

/* ============================================================
   A - COMPACT CARDS (3 columns, small avatar, short bio)
   ============================================================ */
function Team() {
  return (
    <React.Fragment>
      <SectionHero id="team" num="09" kicker="team" align="left" glow
        parts={[{ t: "The team that " }, { t: "wins this market.", hi: true }]}
        lead="Track record, execution muscle, disciplined hiring." />
    <Section tightTop dataLabel="09 Team">
      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}>
        {PEOPLE.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.07} style={{ height: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%", padding: 24, borderRadius: 8, border: `1px solid ${LINE}`, background: "var(--pp-card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Avatar p={p} size={56} />
                <NameRole p={p} nameSize={18} />
              </div>
              <p className="pp-body" style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>{p.short}</p>
              <div style={{ marginTop: "auto", paddingTop: 2 }}><LinkedIn href={p.li} /></div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* headcount summary band - 35 → 57 */}
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(24px,4vw,56px)", flexWrap: "wrap", padding: "clamp(28px,3.5vw,44px) clamp(28px,3.5vw,48px)", border: `1px solid ${LINE}`, borderRadius: 8, background: "linear-gradient(100deg, rgba(204,255,0,.06), transparent 60%), var(--pp-card)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: "none" }}>
            <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12.5, letterSpacing: ".16em", textTransform: "uppercase", color: FG4 }}>Teammates</span>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(56px,8vw,104px)", lineHeight: 1, letterSpacing: "-.02em", color: ACID }}>35</span>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: FG4 }}>Now</span>
              </div>
              <span style={{ fontFamily: FD, fontWeight: 400, fontSize: "clamp(26px,3vw,42px)", color: FG4, lineHeight: 1, marginTop: "clamp(18px,2.6vw,34px)" }}>→</span>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(56px,8vw,104px)", lineHeight: 1, letterSpacing: "-.02em", color: ACID }}>57</span>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: FG4 }}>End of 2026 · Plan</span>
              </div>
            </div>
          </div>
          <p style={{ margin: 0, flex: "1 1 360px", minWidth: 300, fontFamily: FD, fontWeight: 600, fontStretch: "125%", fontVariationSettings: "'wght' 600,'wdth' 125", fontSize: "clamp(17px,1.7vw,23px)", lineHeight: 1.38, letterSpacing: "-.01em", color: FG2 }}>
            <span style={{ color: FG }}>Headcount now → EOY 2026.</span> Round funds: Head of AI Infra, CFO, SecDevOps, mobile &amp; B2B, +19 marketing roles.</p>
        </div>
      </Reveal>

      {/* headcount table + open roles, side by side */}
      <div className="founder-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 36, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Reveal><Label>headcount · april 2026</Label></Reveal>
          <Reveal delay={0.04}><HeadcountTable /></Reveal>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Reveal><Label variant="acid">open roles - seed-funded</Label></Reveal>
          <Reveal delay={0.04}><OpenRoles /></Reveal>
        </div>
      </div>
    </Section>
    </React.Fragment>);
}

/* ============================================================
   11 - ROADMAP → SERIES A
   ============================================================ */
const QUARTERS = [
  { q: "Q2 2026", items: ["Self-custody migration (Privy)", "Metal LED card + US launch", "Pay In / Pay Out (VA + local rails)"], milestone: "Foundation set, self-custody live" },
  { q: "Q3 2026", items: ["iOS + Android apps live", "Visa Direct", "Earn - yield on balance"], milestone: "Mobile distribution unlocked, yield enabled" },
  { q: "Q4 2026", items: ["Karat Loyalty + Cashback", "Karta Card launch", "QR Payments"], milestone: "Monetization & retention live" },
  { q: "Q1 2027", items: ["Credit Line launch", "Family Banking (shared accounts)", "Series A close"], milestone: "~$14M ARR (neutral case)", hero: true },
];
const SCENARIOS = [
  { metric: "Spending MAU", neg: "9,500", neu: "24,000", pos: "95,000" },
  { metric: "Monthly GTV", neg: "$19M", neu: "$55M", pos: "$250M" },
  { metric: "ARR (2.9% take)", neg: "$6.6M", neu: "$19M", pos: "$87M" },
];
function Roadmap() {
  return (
    <React.Fragment>
      <SectionHero id="roadmap" num="10" kicker="roadmap → series a" align="center"
        parts={[{ t: "Three priorities a quarter - to " }, { t: "Series A.", hi: true }]}
        lead="Rebased on April 2026. We commit to Neutral; Positive is upside." />
      <Section tightTop dataLabel="10 Roadmap · detail">

      {/* timeline */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {QUARTERS.map((qq, i) => (
          <Reveal key={qq.q} delay={i * 0.06}>
            <div className="roadmap-row" style={{ display: "grid", gridTemplateColumns: "minmax(0,190px) 1fr minmax(0,230px)", gap: 24, alignItems: "center", padding: "22px 0", borderTop: "1px solid var(--pp-line)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <span style={{ width: 9, height: 9, borderRadius: 100, background: qq.hero ? "var(--pp-acid)" : "var(--pp-fg-4)", display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 700, fontStretch: "125%", fontSize: 20, color: qq.hero ? "var(--pp-acid)" : "var(--pp-fg)" }}>{qq.q}</span>
              </div>
              <p className="pp-body" style={{ margin: 0, fontSize: 15 }}>{qq.items.join(" · ")}</p>
              <span style={{ textAlign: "right", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 14, color: qq.hero ? "var(--pp-acid)" : "var(--pp-fg-3)" }}>{qq.milestone}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* projections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Reveal><Label variant="acid">projections · december 2026</Label></Reveal>
        <Reveal variant="scale">
          <div style={{ border: "1px solid var(--pp-line)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", background: "#080808", borderBottom: "1px solid var(--pp-line)" }} className="proj-head">
              <div style={{ padding: "16px 18px", fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 13, color: "var(--pp-fg-3)" }}>Metric</div>
              {[{ l: "Negative", s: "7% m/m" }, { l: "Neutral", s: "17% m/m", hero: true }, { l: "Positive", s: "35% m/m" }].map((c) => (
                <div key={c.l} style={{ padding: "16px 18px", textAlign: "right", background: c.hero ? "rgba(204,255,0,.07)" : "transparent" }}>
                  <div style={{ fontFamily: "var(--pp-font-display)", fontWeight: 700, fontSize: 14, color: c.hero ? "var(--pp-acid)" : "var(--pp-fg)" }}>{c.l}{c.hero && " ★"}</div>
                  <div className="pp-caption" style={{ fontSize: 11 }}>{c.s}</div>
                </div>
              ))}
            </div>
            {SCENARIOS.map((row, ri) => (
              <div key={row.metric} style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", borderBottom: ri < SCENARIOS.length - 1 ? "1px solid var(--pp-line)" : "none" }} className="proj-row">
                <div style={{ padding: "16px 18px", fontFamily: "var(--pp-font-body)", fontSize: 14, color: "var(--pp-fg-2)" }}>{row.metric}</div>
                <div style={{ padding: "16px 18px", textAlign: "right", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 16, color: "var(--pp-fg-3)" }}>{row.neg}</div>
                <div style={{ padding: "16px 18px", textAlign: "right", fontFamily: "var(--pp-font-display)", fontWeight: 700, fontSize: 18, color: "var(--pp-acid)", background: "rgba(204,255,0,.07)" }}>{row.neu}</div>
                <div style={{ padding: "16px 18px", textAlign: "right", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 16, color: "var(--pp-fg-3)" }}>{row.pos}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p className="pp-body" style={{ margin: 0, fontSize: 15, maxWidth: 820 }}>
            <span style={{ color: "var(--pp-fg)" }}>We commit to Neutral.</span> Positive if compounding holds; Negative is the floor. 49% of the 3-5yr SOM target already at run-rate.
          </p>
        </Reveal>
      </div>
    </Section>
    </React.Fragment>
  );
}

/* ============================================================
   12 - ASK + USE OF FUNDS + CLOSE
   ============================================================ */
const BUCKETS = [
  { t: "Growth", pct: "[ 50% ]", d: "Paid acquisition. 20K+ MAU by Q1 2027." },
  { t: "Team", pct: "[ 35% ]", d: "Mobile, AI/Eng, compliance hires." },
  { t: "Product & Compliance", pct: "[ 15% ]", d: "Karta Stablecoin, US licensing, infra." },
];
const STEPS = [
  { t: "Data room", d: "within 1 week" },
  { t: "Term sheet", d: "4-6 weeks" },
  { t: "Contact", d: "[ Nik · email + Telegram ]" },
];
function Ask() {
  return (
    <React.Fragment>
      <SectionHero id="ask" num="11" kicker="the ask" align="center" glow
        parts={[{ t: "Raising " }, { t: "$[ FILL ]M", hi: true }, { t: " seed - to accelerate, not to survive." }]}
        lead="Profitable four months. The round accelerates Series A; it doesn't buy runway." />
      <Section tightTop dataLabel="11 The ask · detail" style={{ paddingBottom: 80 }}>
      {/* use of funds */}
      <Reveal>
        <Label variant="acid">use of funds</Label>
      </Reveal>

      {/* buckets */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="grid-3">
        {BUCKETS.map((b, i) => (
          <Reveal key={b.t} delay={i * 0.08}>
            <HCard hover style={{ minHeight: 200, justifyContent: "space-between", gap: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 className="pp-h3" style={{ margin: 0, fontSize: 24 }}>{b.t}</h3>
                <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontSize: 22, color: "var(--pp-acid)" }}>{b.pct}</span>
              </div>
              <p className="pp-body" style={{ margin: 0 }}>{b.d}</p>
            </HCard>
          </Reveal>
        ))}
      </div>

      {/* next steps */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="grid-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.06}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid var(--pp-line)", paddingTop: 18 }}>
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontSize: 13, color: "var(--pp-fg-4)" }}>0{i + 1}</span>
              <h4 style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 18, color: "var(--pp-fg)" }}>{s.t}</h4>
              <span className="pp-caption">{s.d}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
    </React.Fragment>
  );
}

/* mission close + footer */
function Close() {
  return (
    <footer style={{ position: "relative", zIndex: 1, background: "radial-gradient(120% 140% at 50% 120%, rgba(204,255,0,.12), transparent 60%), #050505", padding: "120px 24px 64px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 1440, display: "flex", flexDirection: "column", gap: 56 }}>
        <Reveal>
          <h2 style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(34px,6vw,84px)", lineHeight: 1.0, letterSpacing: "-.03em", color: "var(--pp-fg)", maxWidth: 980 }}>
            To make money as <span style={{ color: "var(--pp-acid)" }}>free as the people</span> who use it.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <span className="pp-h3" style={{ fontSize: 22 }}>Let's build it.</span>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <PillButton href="#" onClick={(e) => e.preventDefault()} variant="accent" glyph="arrow">Request data room</PillButton>
                <PillButton href="#" onClick={(e) => e.preventDefault()} glyph="check">[ Nik · email ]</PillButton>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p className="pp-body" style={{ margin: 0 }}>Follow Karta</p>
              <div style={{ display: "flex", gap: 8 }}><Social k="in" /><Social k="x" /><Social k="tg" /></div>
            </div>
          </div>
        </Reveal>
        <img src="assets/karta-logo-white.svg" alt="Karta" style={{ height: 34, opacity: .9, marginTop: 10 }} />
        <p className="pp-caption" style={{ margin: 0, color: "var(--pp-fg-4)" }}>Seed round · 2026 · Figures April 2026 (Manifest Beautiful Table, Mixpanel). [ FILL ] = pending input.</p>
      </div>
    </footer>
  );
}

Object.assign(window, { Market, Vision, Team, Roadmap, Ask, Close });


/* ===== Market (bento) - merged from market-section.jsx for deterministic load order ===== */
/* Market - SCROLL-context section layouts (full-width, tall, Karta site).
   Three ways to tell the "borderless money market" story as a real
   vertical-scroll chapter - each uses the world map differently:
     A - Map-led: full-bleed map centerpiece with regional callouts
     B - Editorial spec-sheet: numbered beats, converging-markets table → map band → SAM/SOM
     C - TAM → SAM → SOM: structured around the bottom-up funnel, map is the "where we play" wedge
   Reuses the site's real components (Reveal, Label, HCard, Bar, Hi, Section, SectionHero). */

const { useState: mS, useEffect: mE } = React;
const ACID = "var(--pp-acid)", ROAD = "#FF7A1A";
const FG = "var(--pp-fg)", FG2 = "var(--pp-fg-2)", FG3 = "var(--pp-fg-3)", FG4 = "var(--pp-fg-4)";
const FD = "var(--pp-font-display)", FB = "var(--pp-font-body)";

/* ---------------- data ---------------- */
const SRC_RM = "https://www.researchandmarkets.com/reports/6191058/crypto-powered-remittances-market-report";
const SRC_CHAIN = "https://www.chainalysis.com/reports/the-new-rails/";
const SRC_ARTEMIS = "https://research.artemisanalytics.com/p/stablecoin-payments-at-scale-how";
const SRC_COINDESK = "https://www.coindesk.com/business/2026/01/16/crypto-card-spending-hits-usd18-billion-annualized-as-stablecoin-use-shifts-to-everyday-payments";
const SRC_VISA = "https://intellectia.ai/news/stock/visa-reports-167-trillion-in-payment-volume-for-fiscal-2025-strong-profitability";
const SRC_WB = "https://blogs.worldbank.org/en/peoplemove/in-2024--remittance-flows-to-low--and-middle-income-countries-ar";
const MARKETS = [
  { l: "Global remittances",      a: "$905B",  b: "$1.14T", cagr: "4.7%",  srcParts: [{ t: "World Bank", href: SRC_WB }, ", 2024"], w: 0.50 },
  { l: "Crypto-powered subset",   a: "$27.9B", b: "$85.8B", cagr: "25.2%", srcParts: [{ t: "Research & Markets", href: SRC_RM }, ", 2026"], w: 0.22, sub: true },
  { l: "Stablecoin tx volume",    a: "$33T",   b: "~$140T", cagr: "~38%",  srcParts: [{ t: "Chainalysis", href: SRC_CHAIN }, ", 2025"], w: 1.00, hero: true },
  { l: "Crypto card spend",       a: "$18B",   b: "n/d",    cagr: "106%",  srcParts: [{ t: "Artemis", href: SRC_ARTEMIS }, " / ", { t: "CoinDesk", href: SRC_COINDESK }, ", Jan 2026"], w: 0.14, note: "Too early to model reliably; we don't extrapolate triple-digit growth." },
];
const REGIONS = [
  { id: "mena",  p: "#1", r: "UAE / MENA", k: "UAE · Saudi Arabia",                     stat: "$56B+ received · +33% YoY",            why: "#1 MENA crypto adoption · Rain HQ in region · expat hub",              live: true },
  { id: "latam", p: "#2", r: "LATAM",      k: "Argentina · Brazil · Mexico · Colombia", stat: "63% YoY adoption · 92M wallets",        why: "Stablecoin-as-savings · inflation hedge",                              live: true },
  { id: "usaeu", p: "#3", r: "USA / EU",   k: "USA · EU",                               stat: "40M holders in US · top ARPPU",        why: "Largest crypto-wealth concentration · remote workers paid in USD/EUR", live: false },
  { id: "sea",   p: "#4", r: "SEA",        k: "Indonesia · Philippines · Vietnam",      stat: "69% YoY · 350M wallets (43% global)",  why: "Remittance-heavy corridors",                                           live: true },
];
const SIZE_FRAME = [
  { v: "$190T",  l: "Global cross-border payment volume" },
  { v: "$150B+", l: "Annual revenue pool" },
  { v: "$53B+",  l: "Annual border tax on remittances" },
];
/* map markers - base grid 201×97 (matches the site's GeoMap) */
const GEO = [
  { id: "usa",   x: 22.9, y: 32.0, lx: 22.9, ly: 9,  side: "top",    live: false, label: "USA" },
  { id: "eu",    x: 51.7, y: 24.7, lx: 51.7, ly: 7,  side: "top",    live: false, label: "EU" },
  { id: "mena",  x: 65.4, y: 41.2, lx: 66,   ly: 12, side: "top",    live: true,  label: "UAE / MENA" },
  { id: "sea",   x: 79.1, y: 58.8, lx: 80,   ly: 87, side: "bottom", live: true,  label: "SE Asia" },
  { id: "latam", x: 31.8, y: 63.9, lx: 30,   ly: 88, side: "bottom", live: true,  label: "LATAM" },
];

/* ---------------- shared bits ---------------- */
function GlowDot({ live = true, size = 11 }) {
  const c = live ? ACID : ROAD, g = live ? "rgba(204,255,0,.55)" : "rgba(255,122,26,.5)";
  return <span style={{ flex: "none", display: "inline-block", width: size, height: size, borderRadius: "50%", background: c, boxShadow: `0 0 7px 2px ${g}, 0 0 15px 4px ${g}` }} />;
}
function geoLabel(pos) {
  const base = { position: "absolute", whiteSpace: "nowrap", fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", fontSize: "clamp(12px,1vw,17px)", letterSpacing: "-.01em", color: FG, textShadow: "0 1px 6px rgba(0,0,0,.85),0 0 2px rgba(0,0,0,.9)" };
  if (pos === "top")    return { ...base, left: "50%", bottom: "calc(100% + 10px)", transform: "translateX(-50%)" };
  if (pos === "bottom") return { ...base, left: "50%", top: "calc(100% + 10px)", transform: "translateX(-50%)" };
  if (pos === "right")  return { ...base, left: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)" };
  return base;
}
/* origin dot - small marker sitting on the region itself */
function OriginDot({ x, y, live }) {
  const c = live ? ACID : ROAD, g = live ? "rgba(204,255,0,.6)" : "rgba(255,122,26,.6)";
  return <span style={{ position: "absolute", left: x + "%", top: y + "%", transform: "translate(-50%,-50%)", width: 5, height: 5, borderRadius: "50%", background: c, boxShadow: `0 0 4px 1px ${g}`, pointerEvents: "none" }} />;
}
/* leader dot - the glowing pinging dot + label out in the black area */
function LeaderDot({ lx, ly, live, delay, label, side }) {
  const c = live ? ACID : ROAD, g = live ? "rgba(204,255,0,.55)" : "rgba(255,122,26,.5)";
  return (
    <span style={{ position: "absolute", left: lx + "%", top: ly + "%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
      <span className="geo-ping" style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `1.5px solid ${c}`, animationDelay: delay + "s" }} />
      <span className="geo-ping" style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `1.5px solid ${c}`, animationDelay: (delay + 1.1) + "s" }} />
      <span className="geo-core" style={{ position: "relative", display: "block", width: 11, height: 11, borderRadius: "50%", background: c, boxShadow: `0 0 8px 2px ${g}, 0 0 18px 5px ${g}`, animationDelay: delay + "s" }} />
      <span style={geoLabel(side)}>{label}</span>
    </span>);
}
function Marker({ x, y, live, delay, label, pos, showLabel }) {
  const c = live ? ACID : ROAD, g = live ? "rgba(204,255,0,.55)" : "rgba(255,122,26,.5)";
  return (
    <span style={{ position: "absolute", left: x + "%", top: y + "%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
      <span className="geo-ping" style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `1.5px solid ${c}`, animationDelay: delay + "s" }} />
      <span className="geo-ping" style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `1.5px solid ${c}`, animationDelay: (delay + 1.1) + "s" }} />
      <span className="geo-core" style={{ position: "relative", display: "block", width: 11, height: 11, borderRadius: "50%", background: c, boxShadow: `0 0 8px 2px ${g}, 0 0 18px 5px ${g}`, animationDelay: delay + "s" }} />
      {showLabel && <span style={geoLabel(pos)}>{label}</span>}
    </span>);
}
/* the world map + pins. `callouts` overlays region stat cards (variant A). */
function GeoMap({ maxWidth = 1180, callouts = false, showLabels = true }) {
  const leader = showLabels && !callouts;
  return (
    <div className="geo-map" style={{ position: "relative", width: "100%", maxWidth, margin: "0 auto" }}>
      <img src="assets/world-map-dots-sm.svg" alt="World map - Karta active regions" draggable={false}
        style={{ display: "block", width: "100%", height: "auto", filter: "saturate(0) brightness(1.05)", opacity: 0.82 }} />
      {leader && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
          {GEO.map((m) => (
            <line key={m.id} x1={m.x} y1={m.y} x2={m.lx} y2={m.ly} stroke={m.live ? ACID : ROAD} strokeWidth="1" strokeDasharray="2.5 2.5" vectorEffect="non-scaling-stroke" opacity=".55" />
          ))}
        </svg>
      )}
      <div style={{ position: "absolute", inset: 0 }}>
        {leader
          ? GEO.map((m, i) => <React.Fragment key={m.id}><OriginDot x={m.x} y={m.y} live={m.live} /><LeaderDot {...m} delay={i * 0.3} /></React.Fragment>)
          : GEO.map((m, i) => <Marker key={m.id} {...m} delay={i * 0.3} showLabel={false} />)}
        {callouts && (
          <React.Fragment>
            <RegionCallout region={REGIONS[2]} place={{ left: "0%",  top: "0%" }} />
            <RegionCallout region={REGIONS[0]} place={{ right: "0%", top: "16%" }} />
            <RegionCallout region={REGIONS[3]} place={{ right: "0%", top: "64%" }} />
            <RegionCallout region={REGIONS[1]} place={{ left: "0%",  top: "70%" }} />
          </React.Fragment>
        )}
      </div>
    </div>);
}
function RegionCallout({ region, place }) {
  const c = region.live ? ACID : ROAD;
  return (
    <div style={{ position: "absolute", width: 234, padding: "13px 15px", background: "rgba(8,8,8,.78)", backdropFilter: "blur(4px)", border: `1px solid ${region.live ? "rgba(204,255,0,.3)" : "rgba(255,122,26,.3)"}`, borderRadius: 5, display: "flex", flexDirection: "column", gap: 5, ...place }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontSize: 14, color: c }}>{region.p}</span>
        <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 16, color: FG, letterSpacing: "-.01em" }}>{region.r}</span>
        {!region.live && <span style={{ marginLeft: "auto", fontFamily: FD, fontWeight: 600, fontSize: 9.5, letterSpacing: ".12em", color: ROAD }}>SOON</span>}
      </div>
      <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 13.5, color: region.live ? ACID : "#ffb27a", letterSpacing: "-.01em" }}>{region.stat}</span>
      <span style={{ fontFamily: FB, fontSize: 12, lineHeight: 1.4, color: FG3 }}>{region.why}</span>
    </div>);
}
function MapLegend({ center = true }) {
  return (
    <div style={{ display: "flex", gap: 48, justifyContent: center ? "center" : "flex-start", flexWrap: "wrap", alignItems: "center" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 11, fontFamily: FB, fontSize: 16, color: FG }}>
        <GlowDot live /><span><span style={{ color: FG3 }}>Live today&nbsp;·&nbsp;</span>MENA · LATAM · SE&nbsp;Asia</span></span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 11, fontFamily: FB, fontSize: 16, color: FG2 }}>
        <GlowDot live={false} /><span><span style={{ color: FG3 }}>On roadmap&nbsp;·&nbsp;</span>USA · EU</span></span>
    </div>);
}

/* source citation with external links (Karta dark style) */
function SourceCite({ parts, fontSize = 10.5 }) {
  return (
    <span className="pp-caption" style={{ fontSize }}>
      {(parts || []).map((p, i) => typeof p === "string"
        ? <React.Fragment key={i}>{p}</React.Fragment>
        : <a key={i} className="src-link" href={p.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textDecorationColor: "rgba(204,255,0,.45)", textUnderlineOffset: 2 }}>{p.t}<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 3, marginBottom: 1 }}><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg></a>)}
    </span>);
}
/* info icon + hover tooltip (Karta dark style) */
function InfoTip({ text }) {
  const [h, setH] = mS(false);
  const c = h ? ACID : FG4;
  return (
    <span style={{ position: "relative", display: "inline-flex", verticalAlign: "middle", marginLeft: 7 }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <svg width="15" height="15" viewBox="0 0 18 18" fill="none" style={{ display: "block", cursor: "help" }}>
        <circle cx="9" cy="9" r="7.3" stroke={c} strokeWidth="1.4" />
        <circle cx="9" cy="5.7" r="0.95" fill={c} />
        <path d="M9 8.1v4.3" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {h && (
        <span style={{ position: "absolute", bottom: "calc(100% + 10px)", right: -7, width: 230, padding: "11px 13px", background: "var(--pp-surface-2)", border: "1px solid #2a2a2a", borderRadius: 5, zIndex: 40, fontFamily: FB, fontWeight: 400, fontSize: 12.5, lineHeight: 1.45, color: FG2, textAlign: "left", whiteSpace: "normal", letterSpacing: 0, boxShadow: "0 12px 34px rgba(0,0,0,.55)" }}>
          {text}
          <span style={{ position: "absolute", top: "100%", right: 13, width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid var(--pp-surface-2)" }} />
        </span>
      )}
    </span>);
}
/* converging-markets data table (bento card) - matches the site's canonical
   Key-metrics table: right-aligned numeric columns, muted metric name, acid
   last column, hairline row dividers. fr columns so rows align. */
function MiniMarketList() {
  const COLS = "minmax(0,1.85fr) .82fr .82fr .6fr";
  const hd = (right, acid) => ({ textAlign: right ? "right" : "left", fontFamily: FD, fontWeight: 600, fontSize: 11.5, letterSpacing: ".08em", textTransform: "uppercase", color: acid ? ACID : FG4, whiteSpace: "nowrap" });
  const numv = (m) => ({ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: 15.5, color: m.sub ? FG2 : FG, textAlign: "right", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", letterSpacing: "-.01em" });
  const cagrv = (m) => ({ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: 17, color: m.sub ? FG2 : ACID, textAlign: "right", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" });
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "grid", gridTemplateColumns: COLS, columnGap: 10, padding: "0 0 10px", borderBottom: "1px solid #1c1c1c" }}>
        <span style={hd(false)}>MARKET</span>
        <span style={hd(true)}>2025</span>
        <span style={hd(true)}>2030E</span>
        <span style={hd(true, true)}>CAGR</span>
      </div>
      {MARKETS.map((m, ri) => {
        const mainNo = MARKETS.slice(0, ri + 1).filter((x) => !x.sub).length;
        return (
        <div key={m.l} style={{ display: "grid", gridTemplateColumns: COLS, columnGap: 10, alignItems: "baseline", padding: m.sub ? "11px 0" : "14px 0", ...(m.hero
          ? { border: "1px solid rgba(204,255,0,.6)", borderRadius: 6, marginLeft: -26, marginRight: -26, paddingLeft: 26, paddingRight: 26, marginTop: 5, marginBottom: 5 }
          : { borderBottom: ri < MARKETS.length - 1 ? "1px solid #141414" : "none" }) }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, paddingLeft: m.sub ? 14 : 0, minWidth: 0 }}>
            <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: m.sub ? 13 : 15.5, color: m.sub ? FG2 : FG, lineHeight: 1.2, letterSpacing: "-.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%", display: "block" }}>{m.sub ? <span style={{ color: FG4, marginRight: 6 }}>↳</span> : <span style={{ color: ACID, marginRight: 9 }}>{mainNo}</span>}{m.l}</span>
            <SourceCite parts={m.srcParts} fontSize={13} />
          </div>
          <span style={numv(m)}>{m.a}</span>
          <span style={numv(m)}>{m.b}{m.note && <InfoTip text={m.note} />}</span>
          <span style={cagrv(m)}>{m.cagr}</span>
        </div>
        );
      })}
    </div>);
}
/* compact priority-region tiles (name + headline stat only) */
function RegionStrip() {
  return (
    <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      {REGIONS.map((r, i) => (
        <Reveal key={r.id} delay={(i % 4) * 0.06}>
          <HCard hover style={{ gap: 10, padding: 22, minHeight: 0, borderColor: r.live ? "var(--pp-line)" : "rgba(255,122,26,.22)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <GlowDot live={r.live} size={9} />
              <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontSize: 16, color: r.live ? ACID : ROAD }}>{r.p}</span>
              <h3 className="pp-h3" style={{ margin: 0, fontSize: 19 }}>{r.r}</h3>
            </div>
            <div style={{ fontFamily: FD, fontWeight: 600, fontSize: 13.5, color: r.live ? ACID : "#ffb27a" }}>{r.stat}</div>
            <div style={{ fontFamily: FB, fontSize: 11.5, color: FG3, lineHeight: 1.35 }}>{r.k}</div>
          </HCard>
        </Reveal>
      ))}
    </div>);
}

/* ============================================================
   MARKET - Bento dashboard (ported into the main deck).
   Hero + market sizing in number cards; map is its own block.
   ============================================================ */
function Market() {
  return (
    <React.Fragment>
      <SectionHero id="market" num="07" kicker="market" align="left" glow
        parts={[{ t: "We're building " }, { t: "borderless money.", hi: true }]}
        lead={<React.Fragment><span style={{ color: ACID }}>The market</span> where remittances, stablecoins, and card spend become one.</React.Fragment>}
        leadStyle={{ fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", letterSpacing: "-.02em", lineHeight: 1.12, fontSize: "clamp(24px,2.6vw,32px)" }} />
    <Section tightTop dataLabel="07 Market" style={{ overflowX: "clip", overflowY: "visible" }}>
      {/* ---------- the market, by the numbers (bento) ---------- */}
      <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
        {/* large planet - anchored to the section's right edge, behind the blocks */}
        <video src="assets/planet.webm" autoPlay loop muted playsInline aria-hidden="true" className="market-planet" style={{
          position: "absolute", top: "calc(clamp(-280px, -16vw, -150px) - 80px)", right: "clamp(20px, 2.5vw, 56px)",
          width: "clamp(422px, 42vw, 669px)", height: "auto", objectFit: "contain",
          pointerEvents: "none", zIndex: 0,
        }} />
        <Reveal style={{ position: "relative", zIndex: 1 }}><h3 style={{ margin: 0, fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", fontSize: "clamp(19px,2vw,26px)", letterSpacing: "-.02em", color: FG }}>Three converging markets <span style={{ color: FG4 }}>(TAM)</span></h3></Reveal>

        {/* row 1 - $33T proof + converging markets */}
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch", position: "relative", zIndex: 1 }}>
          <Reveal variant="up" style={{ height: "100%" }}>
            <HCard style={{ gap: 18, padding: 26, justifyContent: "center", height: "100%" }}>
              <MiniMarketList />
            </HCard>
          </Reveal>
          <Reveal variant="up" delay={0.06} style={{ height: "100%" }}>
            <HCard style={{ gap: 16, padding: 36, justifyContent: "center", height: "100%", background: "linear-gradient(135deg, rgba(204,255,0,.08), var(--pp-card) 62%)", borderColor: "rgba(204,255,0,.24)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <span className="pp-h3" style={{ fontSize: 20 }}>Stablecoin tx volume</span>
                <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 700, color: "var(--pp-acid)", fontSize: 15, whiteSpace: "nowrap" }}>~38% CAGR</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
                <span className="pp-stat" style={{ fontSize: 84, lineHeight: 1, fontStretch: "125%" }}>$33T</span>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 18, letterSpacing: "-.01em", color: FG3, whiteSpace: "nowrap" }}><span style={{ color: FG4 }}>2025</span> → <span style={{ color: FG2 }}>~$140T</span> <span style={{ color: FG4 }}>2030E</span></span>
              </div>
              <p className="pp-body" style={{ margin: 0, fontSize: 15, lineHeight: 1.55, maxWidth: 470, position: "relative", zIndex: 1 }}>In 2025, stablecoin transaction volume surpassed Visa - <span style={{ color: FG }}>Stablecoin's $33T</span> vs. <a className="inl-link" href={SRC_VISA} target="_blank" rel="noopener noreferrer">Visa's $16.7T<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 3, marginBottom: 1 }}><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg></a> fiscal year. This is no longer a niche: stablecoins are becoming <span style={{ color: FG }}>core payment infrastructure</span>. For Karta, that's the tailwind - the rails our product runs on are now at global scale.</p>
            </HCard>
          </Reveal>
        </div>

        {/* row 2 - size frame ×3 */}
        <Reveal style={{ position: "relative", zIndex: 1, marginTop: 10 }}><h3 style={{ margin: 0, fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", fontSize: "clamp(19px,2vw,26px)", letterSpacing: "-.02em", color: FG4 }}>TAM <span style={{ color: FG4 }}>·</span> Top-Down</h3></Reveal>
        <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {SIZE_FRAME.map((s, i) => (
            <Reveal key={s.v} delay={i * 0.06}>
              <HCard style={{ gap: 10, padding: 28 }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: 46, lineHeight: 1, color: FG }}>{s.v}</span>
                <span className="pp-body" style={{ margin: 0, fontSize: 14 }}>{s.l}</span>
              </HCard>
            </Reveal>
          ))}
        </div>

        {/* row 3 - SAM + SOM, each with its own heading above */}
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", fontSize: "clamp(19px,2vw,26px)", letterSpacing: "-.02em", color: FG4 }}>SAM <span style={{ color: FG4 }}>·</span> Bottom-Up</h3>
              <HCard style={{ gap: 14, minHeight: 214, justifyContent: "space-between", padding: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span className="pp-stat" style={{ fontSize: 54 }}>$1.41B</span>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12.5, letterSpacing: ".12em", color: FG4 }}>GTV / YR</span>
                  </div>
                  <div style={{ fontFamily: FD, fontWeight: 600, fontSize: 17, color: FG2 }}>→ <span style={{ color: ACID }}>$40.9M</span> revenue @ 2.9% take</div>
                </div>
                <p className="pp-body" style={{ margin: 0, fontSize: 13.5 }}>965K visitors → 7% conversion → 67.6K paying × $1,738/mo GTV per user.</p>
              </HCard>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", fontSize: "clamp(19px,2vw,26px)", letterSpacing: "-.02em", color: FG4 }}>SOM <span style={{ color: FG4 }}>·</span> 3-5yr target</h3>
              <HCard style={{ gap: 14, minHeight: 214, justifyContent: "space-between", padding: 32, borderColor: "rgba(204,255,0,.24)", background: "linear-gradient(140deg, rgba(204,255,0,.07), var(--pp-card) 55%)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span className="pp-stat" style={{ fontSize: 54 }}>$211M</span>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12.5, letterSpacing: ".12em", color: FG4 }}>GTV / YR</span>
                  </div>
                  <div style={{ fontFamily: FD, fontWeight: 600, fontSize: 17, color: FG2 }}>→ <span style={{ color: ACID }}>$6.1M</span> revenue @ 2.9% take</div>
                </div>
                <p className="pp-body" style={{ margin: 0, fontSize: 13.5 }}>15% of SAM · 49% already at run-rate ($102.8M GTV). Three methods converge.</p>
              </HCard>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------- where we operate (map - geography only) ---------- */}
      <div style={{ display: "flex", flexDirection: "column", gap: 30, textAlign: "center" }}>
        <Reveal><h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(32px,4.4vw,56px)", lineHeight: 1.04, letterSpacing: "-.025em", color: ACID }}>Where we operate</h3></Reveal>
        <Reveal delay={0.04}>
          <h3 className="pp-h3" style={{ margin: "0 auto", maxWidth: 780, fontWeight: 500, fontSize: 23, color: FG2 }}>
            Concrete markets, validated by team analysis - <span style={{ color: FG }}>live across MENA, LATAM and SE Asia</span>, with USA &amp; EU on the roadmap.</h3>
        </Reveal>
        <Reveal variant="scale"><GeoMap maxWidth={1320} /></Reveal>
        <Reveal delay={0.05}><MapLegend /></Reveal>
        <RegionStrip />
      </div>
    </Section>
    </React.Fragment>);
}

/* Market is rendered by app.jsx in the main deck. */
