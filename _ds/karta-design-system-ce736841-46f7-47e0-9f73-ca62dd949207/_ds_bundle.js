/* @ds-bundle: {"format":3,"namespace":"PitchDeckDesignSystem_ce7368","components":[],"sourceHashes":{"slides/transitions.js":"93bcd7560f3d","ui_kits/proposal/app.jsx":"2cb42025350d","ui_kits/proposal/components.jsx":"6fb71de79516","ui_kits/proposal/hero-shader.js":"56ba106c0f1f","ui_kits/proposal/sections.jsx":"d387552b5172"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PitchDeckDesignSystem_ce7368 = window.PitchDeckDesignSystem_ce7368 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// slides/transitions.js
try { (() => {
/* ============================================================
   Karta — Reusable slide transitions
   Framework-agnostic. Each transition animates an OUTgoing and
   INcoming element (absolutely stacked) given a direction.

   API
     KartaTransitions.DUR / .EASE              defaults
     KartaTransitions.list                     ["drift","fade",...]
     KartaTransitions.run(name, out, inc, dir, [dur]) -> Promise
     KartaTransitions[name](out, inc, dir, dur) -> Promise

   `dir`:  +1 = forward / next,  -1 = backward / prev
   `out` and `inc` must be position:absolute; inset:0 siblings.
   Load the incoming element's content BEFORE calling. Each
   transition sets its own start ("from") and end ("to") states
   and resolves a Promise when done.
   ============================================================ */
(function (global) {
  const DUR = 520;
  const EASE = "cubic-bezier(.44,0,.16,1)";

  // tween one element from -> to. Commits `from` (no transition),
  // then on the next frame enables the transition and applies `to`.
  function tween(el, from, to, dur) {
    return new Promise(res => {
      el.style.transition = "none";
      Object.assign(el.style, from);
      void el.offsetWidth; // commit FROM (no transition)
      el.style.transition = Object.keys(to).map(p => `${cssProp(p)} ${dur}ms ${EASE}`).join(",");
      void el.offsetWidth; // enable transition, still at FROM
      Object.assign(el.style, to); // change -> animates over dur
      let done = false;
      const fin = () => {
        if (done) return;
        done = true;
        el.removeEventListener("transitionend", fin);
        res();
      };
      el.addEventListener("transitionend", fin);
      setTimeout(fin, dur + 140);
    });
  }
  const cssProp = p => p === "opacity" ? "opacity" : "transform";
  const z = (el, n) => {
    el.style.zIndex = n;
  };
  const T = {
    /* crossfade + small directional drift (deck default) */
    drift(out, inc, dir, dur = DUR) {
      z(inc, 2);
      z(out, 1);
      return Promise.all([tween(inc, {
        opacity: "0",
        transform: `translateX(${dir * 6}%)`
      }, {
        opacity: "1",
        transform: "translateX(0%)"
      }, dur), tween(out, {
        opacity: "1",
        transform: "translateX(0%)"
      }, {
        opacity: "0",
        transform: `translateX(${-dir * 6}%)`
      }, dur)]);
    },
    /* plain crossfade */
    fade(out, inc, dir, dur = DUR) {
      z(inc, 2);
      z(out, 1);
      return Promise.all([tween(inc, {
        opacity: "0",
        transform: "none"
      }, {
        opacity: "1"
      }, dur), tween(out, {
        opacity: "1"
      }, {
        opacity: "0"
      }, dur)]);
    },
    /* both move together, outgoing pushed off */
    push(out, inc, dir, dur = DUR) {
      z(inc, 2);
      z(out, 1);
      return Promise.all([tween(inc, {
        opacity: "1",
        transform: `translateX(${dir * 100}%)`
      }, {
        transform: "translateX(0%)"
      }, dur), tween(out, {
        opacity: "1",
        transform: "translateX(0%)"
      }, {
        transform: `translateX(${-dir * 100}%)`
      }, dur)]);
    },
    /* Keynote "Cover" — incoming slides over the top, outgoing stays */
    cover(out, inc, dir, dur = DUR) {
      z(inc, 2);
      z(out, 1);
      out.style.transition = "none";
      out.style.transform = "none";
      out.style.opacity = "1";
      return tween(inc, {
        opacity: "1",
        transform: `translateX(${dir * 100}%)`
      }, {
        transform: "translateX(0%)"
      }, dur);
    },
    /* "Uncover" — outgoing slides away, revealing incoming beneath */
    reveal(out, inc, dir, dur = DUR) {
      z(inc, 1);
      z(out, 2);
      inc.style.transition = "none";
      inc.style.transform = "none";
      inc.style.opacity = "1";
      return tween(out, {
        opacity: "1",
        transform: "translateX(0%)"
      }, {
        transform: `translateX(${-dir * 100}%)`
      }, dur);
    },
    /* vertical scroll-snap feel */
    slideVertical(out, inc, dir, dur = DUR) {
      z(inc, 2);
      z(out, 1);
      return Promise.all([tween(inc, {
        opacity: "1",
        transform: `translateY(${dir * 100}%)`
      }, {
        transform: "translateY(0%)"
      }, dur), tween(out, {
        opacity: "1",
        transform: "translateY(0%)"
      }, {
        transform: `translateY(${-dir * 100}%)`
      }, dur)]);
    },
    /* soft zoom + fade */
    zoom(out, inc, dir, dur = DUR) {
      z(inc, 2);
      z(out, 1);
      return Promise.all([tween(inc, {
        opacity: "0",
        transform: "scale(.92)"
      }, {
        opacity: "1",
        transform: "scale(1)"
      }, dur), tween(out, {
        opacity: "1",
        transform: "scale(1)"
      }, {
        opacity: "0",
        transform: "scale(1.04)"
      }, dur)]);
    },
    /* no animation */
    instant(out, inc) {
      inc.style.transition = "none";
      inc.style.opacity = "1";
      inc.style.transform = "none";
      out.style.transition = "none";
      out.style.opacity = "0";
      return Promise.resolve();
    }
  };
  global.KartaTransitions = {
    DUR,
    EASE,
    list: ["drift", "fade", "push", "cover", "reveal", "slideVertical", "zoom", "instant"],
    run(name, out, inc, dir, dur) {
      return (T[name] || T.fade)(out, inc, dir, dur);
    },
    ...T
  };
})(window);
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/transitions.js", error: String((e && e.message) || e) }); }

// ui_kits/proposal/app.jsx
try { (() => {
/* Pitch Pro / Karta — app assembly. Scroll-spy nav + email copy. */
const {
  useState: uS,
  useEffect: uE,
  useRef: uR
} = React;
function App() {
  const [active, setActive] = uS("Start");
  const [copied, setCopied] = uS(false);
  const refs = uR({});
  const map = {
    "Start": "start",
    "Who we are": "who-we-are",
    "Scope": "our-work",
    "Operation": "our-work",
    "Timeline": "investment",
    "Value": "investment",
    "Investment": "investment",
    "Next Steps": "next-steps"
  };
  const set = key => el => {
    if (el) refs.current[key] = el;
  };
  const scrollToId = (id, off) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: window.scrollY + el.getBoundingClientRect().top - off,
      behavior: "smooth"
    });
  };
  const nav = n => scrollToId(map[n], 90);
  const contact = () => scrollToId("next-steps", 60);
  const copy = () => {
    navigator.clipboard && navigator.clipboard.writeText("hello@karta.io").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  uE(() => {
    const ids = ["start", "who-we-are", "our-work", "investment", "next-steps"];
    const label = {
      start: "Start",
      "who-we-are": "Who we are",
      "our-work": "Scope",
      investment: "Investment",
      "next-steps": "Next Steps"
    };
    const onScroll = () => {
      let cur = "Start";
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) cur = label[id];
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
    active: active,
    onNav: nav,
    onCopy: copy,
    copied: copied
  }), /*#__PURE__*/React.createElement(Hero, {
    onCta: () => nav("Start")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      background: "var(--pp-page)"
    }
  }, /*#__PURE__*/React.createElement(OurRead, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(SectionDivider, {
    id: "who-we-are-divider",
    num: "02",
    title: "Who We Are"
  }), /*#__PURE__*/React.createElement(WhoWeAre, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(SectionDivider, {
    id: "our-work-divider",
    num: "03",
    title: "Selected Work"
  }), /*#__PURE__*/React.createElement(OurWork, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(SectionDivider, {
    id: "investment-divider",
    num: "07",
    title: "Investment"
  }), /*#__PURE__*/React.createElement(Investment, null)), /*#__PURE__*/React.createElement(Footer, {
    onCopy: copy,
    copied: copied
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposal/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/proposal/components.jsx
try { (() => {
/* Pitch Pro — UI kit components. Exports to window for app.jsx. */
const {
  useState,
  useEffect,
  useRef
} = React;

/* responsive helper — true under `bp` px */
function useIsMobile(bp = 760) {
  const [m, setM] = useState(typeof window !== "undefined" && window.innerWidth <= bp);
  useEffect(() => {
    const on = () => setM(window.innerWidth <= bp);
    window.addEventListener("resize", on);
    on();
    return () => window.removeEventListener("resize", on);
  }, [bp]);
  return m;
}

/* ---------- shared bits ---------- */
function Label({
  children,
  variant
}) {
  const mid = variant === "light" ? "#f1f1f1" : "var(--pp-fg-2)";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--pp-font-display)",
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.5,
      display: "inline-flex",
      color: mid
    }
  }, children);
}
function ArrowIcon({
  color = "#030303"
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 9h10M10 5l4 4-4 4"
  }));
}
function Button({
  children,
  variant = "primary",
  onClick,
  href
}) {
  const cls = "pp-pill-btn" + (variant === "primary" ? " pp-pill-btn--accent" : "");
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    className: cls,
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    className: "ic",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    className: "disc",
    cx: "12",
    cy: "12",
    r: "11"
  }), /*#__PURE__*/React.createElement("path", {
    className: "glyph",
    d: "M8 12h7M12.4 8.8l3.4 3.2-3.4 3.2",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), children);
}

/* ---------- social tiles ---------- */
const socials = {
  ig: "M9 6.2A2.8 2.8 0 1 0 9 11.8 2.8 2.8 0 0 0 9 6.2Zm0 1.5A1.3 1.3 0 1 1 9 10.3 1.3 1.3 0 0 1 9 7.7Zm3-1.9a.7.7 0 1 1-1.4 0 .7.7 0 0 1 1.4 0ZM6 4h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  in: "M5.5 7.5H7.3V13H5.5V7.5ZM6.4 4.8a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1ZM8.5 7.5h1.7v.8c.3-.5.9-.9 1.7-.9 1.5 0 2.1 1 2.1 2.6V13h-1.8v-2.5c0-.7-.2-1.2-.9-1.2-.6 0-.9.4-.9 1.1V13H8.5V7.5Z",
  x: "M11.6 4.5h1.7l-3.7 4.3 4.4 5.7h-3.4L8.3 11l-2.9 3.5H3.6l4-4.7L3.4 4.5h3.5L9.3 7.7 11.6 4.5Zm-.6 8.9h.9L7 5.5h-1L11 13.4Z",
  th: "M11.6 8.6c-.1-.05-.2-.1-.3-.14.05-1.4-.7-2.2-2-2.2-.85 0-1.5.36-1.86 1l.78.53c.27-.4.7-.49.99-.49.45 0 .9.27.94.86-.3-.05-.62-.05-.94-.03-1.27.07-2.08.8-2.03 1.83.03.95.86 1.5 1.84 1.45 1.13-.06 1.8-.7 1.98-1.86.18.11.32.26.39.46.13.32.13.85-.31 1.29-.39.39-.86.56-1.57.56-.79 0-1.39-.25-1.78-.75-.36-.46-.55-1.13-.56-1.98.01-.85.2-1.52.56-1.99.39-.5.99-.75 1.78-.76 1.12.01 1.74.45 2.13 1.31l.91-.39c-.5-1.14-1.5-1.84-3.04-1.85-1.08 0-1.95.36-2.55 1.07-.55.66-.84 1.59-.85 2.66 0 1.07.3 2 .85 2.66.6.71 1.47 1.07 2.55 1.07.96 0 1.74-.25 2.34-.85.79-.78.76-1.76.55-2.27-.15-.37-.43-.68-.81-.91Z"
};
function Social({
  k
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: 40,
      height: 40,
      borderRadius: 4,
      background: h ? "#444" : "var(--pp-control)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background .3s"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "#fff"
  }, /*#__PURE__*/React.createElement("path", {
    d: socials[k]
  })));
}

/* ---------- header / collapsible mega-menu ---------- */
const NAV = ["Start", "Who we are", "Scope", "Timeline", "Investment", "Next Steps"];
const MENU = [{
  label: "Start",
  id: "start"
}, {
  label: "Who we are",
  id: "who-we-are"
}, {
  label: "Scope",
  id: "our-work"
}, {
  label: "Operation",
  id: "our-work"
}, {
  label: "Timeline",
  id: "investment"
}, {
  label: "Value",
  id: "investment"
}, {
  label: "Investment",
  id: "investment"
}, {
  label: "Next Steps",
  id: "next-steps"
}];
function MenuIcon({
  open
}) {
  const bar = {
    display: "block",
    position: "absolute",
    left: 0,
    width: 22,
    height: 2,
    background: "#fafafa",
    borderRadius: 2,
    transition: "transform .4s cubic-bezier(.44,0,.16,1)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: 22,
      height: 12,
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      top: open ? 5 : 2,
      transform: open ? "rotate(45deg)" : "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      top: open ? 5 : 8,
      transform: open ? "rotate(-45deg)" : "none"
    }
  }));
}
function Header({
  active,
  onNav,
  onCopy,
  copied
}) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const go = item => {
    onNav(item.label);
    setOpen(false);
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "fixed",
      top: 16,
      left: 0,
      right: 0,
      zIndex: 40,
      width: "min(100% - 24px, 980px)",
      height: 60,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: open ? "100%" : "min(100%, 280px)",
      maxWidth: open ? 820 : 280,
      background: "rgba(20,20,20,0.55)",
      backdropFilter: "blur(22px) saturate(165%)",
      WebkitBackdropFilter: "blur(22px) saturate(165%)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: open ? "0 30px 80px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(255,255,255,0.03)" : "0 8px 30px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,0.16)",
      transition: "width .5s cubic-bezier(.44,0,.16,1), box-shadow .4s, background .4s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 60,
      pointerEvents: "none",
      background: "linear-gradient(180deg, rgba(255,255,255,0.08), transparent)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 20px",
      height: 60,
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/karta-logo-white.svg",
    alt: "Karta",
    style: {
      height: 20
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    "aria-expanded": open,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: "#fafafa",
      fontFamily: "var(--pp-font-display)",
      fontWeight: 500,
      fontSize: 19
    }
  }, /*#__PURE__*/React.createElement(MenuIcon, {
    open: open
  }), /*#__PURE__*/React.createElement("span", null, "Menu"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: open ? isMobile ? 760 : 520 : 0,
      opacity: open ? 1 : 0,
      overflow: "hidden",
      transition: "max-height .5s cubic-bezier(.44,0,.16,1) " + (open ? ".1s" : "0s") + ", opacity .35s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr",
      gap: 18,
      padding: "6px 18px 20px"
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      background: "rgba(13,13,13,0.5)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 10,
      padding: "22px 26px",
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, MENU.map((it, i) => {
    const on = active === it.label;
    return /*#__PURE__*/React.createElement("button", {
      key: it.label,
      onClick: () => go(it),
      style: {
        textAlign: "left",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "2px 0",
        color: on ? "var(--pp-acid)" : "#fafafa",
        fontFamily: "var(--pp-font-display)",
        fontWeight: 500,
        fontSize: isMobile ? 21 : 24,
        lineHeight: 1.34,
        letterSpacing: "-.01em",
        transform: open ? "translateY(0)" : "translateY(10px)",
        opacity: open ? 1 : 0,
        transition: `transform .45s cubic-bezier(.44,0,.16,1) ${0.06 + i * 0.035}s, opacity .45s ease ${0.06 + i * 0.035}s, color .2s`
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.color = "var(--pp-acid)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.color = "#fafafa";
      }
    }, it.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 6px",
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--pp-font-display)",
      fontWeight: 500,
      fontSize: 30,
      color: "#fafafa",
      letterSpacing: "-.01em"
    }
  }, "Get in touch."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "pp-body",
    style: {
      margin: 0
    }
  }, "Send an email to:"), /*#__PURE__*/React.createElement("button", {
    onClick: onCopy,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      alignSelf: "flex-start",
      background: "var(--pp-control)",
      border: "none",
      borderRadius: 6,
      padding: "10px 14px",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "#fafafa",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "6",
    width: "8",
    height: "8",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.5 6V5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5v5A1.5 1.5 0 0 0 5 11.5h1"
  })), /*#__PURE__*/React.createElement("span", {
    className: "pp-body",
    style: {
      color: "#fafafa"
    }
  }, copied ? "Email copied" : "hello@karta.io"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "pp-body",
    style: {
      margin: 0
    }
  }, "Follow us on social media:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Social, {
    k: "ig"
  }), /*#__PURE__*/React.createElement(Social, {
    k: "in"
  }), /*#__PURE__*/React.createElement(Social, {
    k: "th"
  }), /*#__PURE__*/React.createElement(Social, {
    k: "x"
  }))))))));
}

/* ---------- hero ---------- */
function Stagger({
  text,
  style
}) {
  const words = text.split(" ");
  let i = 0;
  return /*#__PURE__*/React.createElement("span", {
    style: style
  }, words.map((w, wi) => /*#__PURE__*/React.createElement("span", {
    key: wi,
    style: {
      whiteSpace: "nowrap"
    }
  }, w.split("").map(c => {
    const idx = i++;
    return /*#__PURE__*/React.createElement("span", {
      key: idx,
      className: "pp-rise",
      style: {
        display: "inline-block",
        animationDelay: `${0.2 + idx * 0.03}s`
      }
    }, c);
  }), wi < words.length - 1 ? " " : "")));
}
function Hero({
  onCta
}) {
  const bgRef = React.useRef(null);
  const cardRef = React.useRef(null);
  const isMobile = useIsMobile();
  React.useEffect(() => {
    if (bgRef.current && window.KartaHeroShader) {
      var h = window.KartaHeroShader.mount(bgRef.current, {
        acid: "#ccff00",
        blur: 130,
        intensity: 1
      });
    }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!cardRef.current || reduce) return;
        const vh = window.innerHeight;
        const p = Math.min(Math.max(window.scrollY / (vh * 0.85), 0), 1);
        const rot = p * 9; // tilt back
        const scale = 1 - p * 0.14; // recede
        const ty = p * -6; // drift up
        const op = 1 - p * 0.55; // dim out
        cardRef.current.style.transform = `rotateX(${rot}deg) scale(${scale}) translateY(${ty}%)`;
        cardRef.current.style.opacity = String(op);
        cardRef.current.style.filter = `brightness(${1 - p * 0.35})`;
      });
    };
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return () => {
      h && h.destroy();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 0,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      perspective: "1400px",
      perspectiveOrigin: "50% 0%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    style: {
      position: "relative",
      width: "100%",
      flex: 1,
      minHeight: 520,
      borderRadius: 4,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: isMobile ? 28 : 40,
      padding: isMobile ? 28 : 60,
      background: "#040404",
      transformOrigin: "50% 0%",
      willChange: "transform, opacity"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: bgRef,
    style: {
      position: "absolute",
      inset: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Label, null, "commercial proposal"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Stagger, {
    text: "Karta",
    style: {
      fontFamily: "var(--pp-font-mono)",
      fontWeight: 800,
      fontStretch: "125%",
      fontVariationSettings: "'wght' 800, 'wdth' 125",
      fontSize: "clamp(64px,9vw,128px)",
      lineHeight: 1,
      letterSpacing: "-0.02em",
      color: "#fafafa"
    }
  })), /*#__PURE__*/React.createElement("h2", {
    className: "pp-lead",
    style: {
      margin: 0,
      textAlign: "center",
      maxWidth: 620
    }
  }, "A brand, a product, and a website \u2014 built to work together."), /*#__PURE__*/React.createElement("p", {
    className: "pp-body",
    style: {
      margin: 0,
      textAlign: "center",
      color: "#fafafa",
      textShadow: "0 1px 14px rgba(0,0,0,.55)"
    }
  }, "Branding \u2022 UX/UI \u2022 Website")), /*#__PURE__*/React.createElement(Button, {
    onClick: onCta
  }, "Explore The Pitch")));
}
Object.assign(window, {
  Label,
  Button,
  ArrowIcon,
  Social,
  Header,
  Hero,
  Stagger,
  NAV,
  useIsMobile
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposal/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/proposal/hero-shader.js
try { (() => {
/* ============================================================
   Karta — Hero background (blurred gradient mesh)
   Recreates the source hero: large, heavily-blurred acid-green
   gradient masses on near-black, drifting slowly. No grain, no
   noise — just soft light. DOM + CSS (cheap, GPU-composited).

   Usage:
     <div id="hero-bg"></div>            // any block element
     <script src="hero-shader.js"></script>
     <script>KartaHeroShader.mount(document.getElementById('hero-bg'));</script>

   Options: { acid:'#ccff00', blur:90, speed:1, intensity:1 }
   Returns { destroy() }. Honors prefers-reduced-motion (static).
   ============================================================ */
(function (global) {
  let injected = false;
  function injectCSS() {
    if (injected) return;
    injected = true;
    const s = document.createElement("style");
    s.textContent = `
    .khb-root{position:absolute;inset:0;overflow:hidden;background:#040404;pointer-events:none}
    .khb-stage{position:absolute;inset:-30%;filter:blur(var(--khb-blur,130px)) saturate(1.04);will-change:transform}
    .khb-blob{position:absolute;border-radius:50%;mix-blend-mode:screen;opacity:var(--o,.9);will-change:transform}
    @keyframes khb1{0%{transform:translate(0,0) scale(1)}50%{transform:translate(-16%,-12%) scale(1.32)}100%{transform:translate(0,0) scale(1)}}
    @keyframes khb2{0%{transform:translate(0,0) scale(1.15)}50%{transform:translate(18%,12%) scale(.82)}100%{transform:translate(0,0) scale(1.15)}}
    @keyframes khb3{0%{transform:translate(0,0) scale(1)}50%{transform:translate(14%,-14%) scale(1.34)}100%{transform:translate(0,0) scale(1)}}
    @keyframes khb4{0%{transform:translate(0,0) scale(.9)}50%{transform:translate(-18%,14%) scale(1.28)}100%{transform:translate(0,0) scale(.9)}}
    @media (prefers-reduced-motion: reduce){ .khb-blob{animation:none !important} }
    .khb-shade{position:absolute;inset:0;pointer-events:none;
      background:linear-gradient(180deg, #040404 0%, rgba(4,4,4,.72) 26%, rgba(4,4,4,.18) 50%, transparent 72%),
                radial-gradient(120% 90% at 50% 108%, transparent 40%, rgba(4,4,4,.55) 100%)}
    .khb-dither{position:absolute;inset:0;opacity:.055;mix-blend-mode:soft-light;
      background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");background-size:160px 160px}
    `;
    document.head.appendChild(s);
  }
  function rgba(hex, a) {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16),
      g = parseInt(h.slice(2, 4), 16),
      b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }
  function mount(el, opts) {
    opts = opts || {};
    const acid = opts.acid || "#ccff00";
    const blur = opts.blur || 115;
    const speed = opts.speed || 1;
    const k = opts.intensity == null ? 1 : opts.intensity;
    injectCSS();
    el.innerHTML = "";
    const root = document.createElement("div");
    root.className = "khb-root";
    const stage = document.createElement("div");
    stage.className = "khb-stage";
    stage.style.setProperty("--khb-blur", blur + "px");

    // blobs: bright acid light blooming from the BOTTOM (like the source) —
    // saturated core that fades up to near-black, plus a brighter hot core.
    const blobs = [{
      x: "50%",
      y: "87%",
      s: 820,
      c: rgba(acid, 1.0 * k),
      anim: "khb1",
      dur: 15,
      o: 1
    }, {
      x: "86%",
      y: "71%",
      s: 600,
      c: rgba(acid, 0.92 * k),
      anim: "khb2",
      dur: 18,
      o: 1
    }, {
      x: "16%",
      y: "83%",
      s: 540,
      c: rgba(acid, 0.68 * k),
      anim: "khb3",
      dur: 16,
      o: 0.95
    }, {
      x: "66%",
      y: "45%",
      s: 440,
      c: rgba(acid, 0.34 * k),
      anim: "khb4",
      dur: 21,
      o: 0.8
    }, {
      x: "52%",
      y: "93%",
      s: 420,
      c: "rgba(230,255,130," + 1.0 * k + ")",
      anim: "khb1",
      dur: 13,
      o: 1
    }];
    for (const b of blobs) {
      const d = document.createElement("div");
      d.className = "khb-blob";
      d.style.left = b.x;
      d.style.top = b.y;
      d.style.width = b.s + "px";
      d.style.height = b.s + "px";
      d.style.marginLeft = -b.s / 2 + "px";
      d.style.marginTop = -b.s / 2 + "px";
      const mid = b.c.replace(/,([0-9.]+)\)$/, (m, a) => `,${(parseFloat(a) * 0.55).toFixed(3)})`);
      d.style.background = `radial-gradient(circle at center, ${b.c} 0%, ${b.c} 16%, ${mid} 36%, transparent 64%)`;
      d.style.setProperty("--o", b.o);
      d.style.animation = `${b.anim} ${b.dur / speed}s ease-in-out infinite`;
      stage.appendChild(d);
    }
    const grain = document.createElement("div");
    grain.className = "khb-grain";
    root.appendChild(stage);
    const shade = document.createElement("div");
    shade.className = "khb-shade";
    root.appendChild(shade);
    const dither = document.createElement("div");
    dither.className = "khb-dither";
    root.appendChild(dither);
    el.appendChild(root);

    // pause animations when offscreen / hidden
    let io = null;
    const setPlay = p => stage.querySelectorAll(".khb-blob").forEach(n => n.style.animationPlayState = p ? "running" : "paused");
    if ("IntersectionObserver" in global) {
      io = new IntersectionObserver(e => setPlay(e[0].isIntersecting), {
        threshold: 0
      });
      io.observe(root);
    }
    const onVis = () => setPlay(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", onVis);
    return {
      destroy() {
        io && io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        el.innerHTML = "";
      }
    };
  }
  global.KartaHeroShader = {
    mount
  };
})(window);
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposal/hero-shader.js", error: String((e && e.message) || e) }); }

// ui_kits/proposal/sections.jsx
try { (() => {
/* Pitch Pro — content sections. Depends on components.jsx (window globals). */
const {
  useState: useS2,
  useRef: useR2,
  useEffect: useE2
} = React;

/* generic section shell */
function Section({
  id,
  children,
  label,
  intro,
  refCb
}) {
  const isMobile = useIsMobile();
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    ref: refCb,
    style: {
      position: "relative",
      zIndex: 1,
      background: "var(--pp-page)",
      padding: isMobile ? "56px 20px" : 80,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: isMobile ? 48 : 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 1040,
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? 48 : 80
    }
  }, (label || intro) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      alignItems: "flex-start",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 0 160px"
    }
  }, /*#__PURE__*/React.createElement(Label, null, label)), intro && /*#__PURE__*/React.createElement("h2", {
    className: "pp-lead",
    style: {
      flex: "2 0 320px",
      margin: 0
    }
  }, intro)), children));
}

/* hairline card */
function HCard({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--pp-card)",
      border: "1px solid var(--pp-line)",
      borderRadius: 4,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, children);
}
function SectionDivider({
  id,
  num,
  title,
  refCb
}) {
  const cardRef = React.useRef(null);
  const secRef = React.useRef(null);
  const isMobile = useIsMobile();
  React.useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let startY = 0;
    const measure = () => {
      if (secRef.current) startY = secRef.current.getBoundingClientRect().top + window.scrollY;
    };
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!cardRef.current || reduce) return;
        const vh = window.innerHeight;
        const p = Math.min(Math.max((window.scrollY - startY) / (vh * 0.85), 0), 1);
        cardRef.current.style.transform = `rotateX(${p * 9}deg) scale(${1 - p * 0.14}) translateY(${p * -6}%)`;
        cardRef.current.style.opacity = String(1 - p * 0.55);
        cardRef.current.style.filter = `brightness(${1 - p * 0.35})`;
      });
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    setTimeout(measure, 0);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onResize);
    onScroll();
    // fire entrance animations when the divider enters view
    let io;
    if (cardRef.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            cardRef.current && cardRef.current.setAttribute("data-in", "");
            io.disconnect();
          }
        });
      }, {
        threshold: 0.35
      });
      io.observe(cardRef.current);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      io && io.disconnect();
    };
  }, []);
  const words = String(title).split(" ");
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    ref: el => {
      secRef.current = el;
      if (refCb) refCb(el);
    },
    style: {
      position: "sticky",
      top: 0,
      zIndex: 0,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      perspective: "1400px",
      perspectiveOrigin: "50% 0%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "pp-divider",
    style: {
      position: "relative",
      width: "100%",
      flex: 1,
      minHeight: 520,
      borderRadius: 4,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: isMobile ? 28 : 60,
      transformOrigin: "50% 0%",
      willChange: "transform, opacity",
      background: "radial-gradient(120% 90% at 50% 122%, rgba(204,255,0,.42), transparent 55%), radial-gradient(80% 70% at 84% 116%, rgba(204,255,0,.30), transparent 60%), radial-gradient(80% 70% at 14% 120%, rgba(170,221,0,.22), transparent 60%), #040404"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-div-num",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: "6%",
      right: isMobile ? "5%" : "3%",
      zIndex: 0,
      fontFamily: "var(--pp-font-display)",
      fontWeight: 800,
      fontStretch: "125%",
      fontVariationSettings: "'wght' 800, 'wdth' 125",
      fontSize: "clamp(120px, 22vw, 300px)",
      lineHeight: .8,
      letterSpacing: "-.05em",
      color: "transparent",
      WebkitTextStroke: "1.5px #262626"
    }
  }, num), /*#__PURE__*/React.createElement("h1", {
    className: "pp-h1",
    style: {
      position: "relative",
      zIndex: 1,
      margin: 0,
      maxWidth: 1120,
      textAlign: "center",
      fontSize: "clamp(48px,7vw,96px)",
      lineHeight: 1.0,
      letterSpacing: "-.035em"
    }
  }, words.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "pp-div-word",
    style: {
      animationDelay: `${0.12 + i * 0.05}s`
    }
  }, w, i < words.length - 1 ? "\u00A0" : "")))));
}

/* "our read" — two cards */
function OurRead({
  refCb
}) {
  return /*#__PURE__*/React.createElement(Section, {
    id: "start",
    label: "our read",
    refCb: refCb,
    intro: "This proposal brings together everything your brand needs to communicate with the clarity and credibility it deserves \u2014 from the first visual touchpoint to the last page of your digital presence."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(HCard, {
    style: {
      flex: "1 1 320px",
      minHeight: 360,
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pp-h3",
    style: {
      margin: 0
    }
  }, "Our read on where you stand"), /*#__PURE__*/React.createElement("p", {
    className: "pp-body",
    style: {
      margin: 0
    }
  }, "You've built something real. The product works, the service delivers, the team is ready. What's lagging behind is how it looks and how it's found. The next natural step is making sure the brand, the interface, and the digital presence are at the same level as what's already been built.")), /*#__PURE__*/React.createElement(HCard, {
    style: {
      flex: "1 1 320px",
      minHeight: 360,
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pp-h3",
    style: {
      margin: 0
    }
  }, "What we're building together"), /*#__PURE__*/React.createElement("p", {
    className: "pp-body",
    style: {
      margin: 0
    }
  }, "Karta steps in at exactly this moment \u2014 with method, predictability, and focus on what actually moves the business forward. This proposal was built in Karta \u2014 so you can see the quality of our work before the project even starts."))));
}

/* team */
function Member({
  name,
  role,
  bio
}) {
  return /*#__PURE__*/React.createElement(HCard, {
    style: {
      flex: "1 1 280px",
      minHeight: 360,
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pp-h3",
    style: {
      margin: 0
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    className: "pp-role"
  }, role)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "pp-body",
    style: {
      margin: 0
    }
  }, bio), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Social, {
    k: "in"
  }), /*#__PURE__*/React.createElement(Social, {
    k: "ig"
  }), /*#__PURE__*/React.createElement(Social, {
    k: "th"
  }), /*#__PURE__*/React.createElement(Social, {
    k: "x"
  }))));
}
function WhoWeAre({
  refCb
}) {
  return /*#__PURE__*/React.createElement(Section, {
    id: "who-we-are",
    label: "who we are",
    refCb: refCb,
    intro: "A strategic design studio specialized in digital identities for companies building something that matters. We combine creative direction, brand strategy, and technical execution to deliver cohesive projects \u2014 from concept to launch."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Member, {
    name: "Alex Rivera",
    role: "Founder & Visual Designer",
    bio: "Leads the creative and strategic direction of every project. Designed the structure, copy system, and visual language of this proposal \u2014 the one you're reading right now."
  }), /*#__PURE__*/React.createElement(Member, {
    name: "Sam Okoye",
    role: "Co-founder & Motion Designer",
    bio: "Specialist in motion design and interactive experiences. Responsible for all animation and interaction layers throughout the project."
  }), /*#__PURE__*/React.createElement(HCard, {
    style: {
      flex: "1 1 280px",
      minHeight: 360,
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/photo-team.png",
    alt: "The studio team",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }))));
}

/* work + stat */
function ProjectCard({
  img,
  tag,
  title,
  href
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    target: "_blank",
    rel: "noopener",
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: "relative",
      flex: "1 1 320px",
      aspectRatio: "1.13",
      borderRadius: 4,
      overflow: "hidden",
      border: "1px solid var(--pp-line)",
      textDecoration: "none",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: h ? "scale(1.03)" : "scale(1)",
      transition: "transform .5s"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(3,3,3,0) 40%, #030303 100%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 20,
      bottom: 20,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Label, {
    variant: "light"
  }, tag), /*#__PURE__*/React.createElement("h3", {
    className: "pp-h3",
    style: {
      margin: 0
    }
  }, title)), h && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 16,
      right: 16,
      background: "var(--pp-lime)",
      color: "#030303",
      padding: "6px 12px",
      borderRadius: 2,
      fontFamily: "var(--pp-font-display)",
      fontWeight: 500,
      fontSize: 13,
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, "See live website ", /*#__PURE__*/React.createElement(ArrowIcon, null)));
}
function OurWork({
  refCb
}) {
  return /*#__PURE__*/React.createElement(Section, {
    id: "our-work",
    label: "our work",
    refCb: refCb
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(ProjectCard, {
    img: "../../assets/project-madrepunk.png",
    tag: "website",
    title: "Studio \u2014 Brand & Site",
    href: "#"
  }), /*#__PURE__*/React.createElement(ProjectCard, {
    img: "../../assets/project-artsaveur.png",
    tag: "website",
    title: "Art & Saveur",
    href: "#"
  })), /*#__PURE__*/React.createElement(HCard, {
    style: {
      alignItems: "flex-start",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-stat"
  }, "20+"), /*#__PURE__*/React.createElement("h3", {
    className: "pp-h3",
    style: {
      margin: 0,
      width: "80%"
    }
  }, "Projects delivered since 2024. Each one proof that intentional design changes how a brand is perceived \u2014 and how a proposal gets signed.")));
}

/* investment */
function Row({
  label,
  val
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: "14px 0",
      borderBottom: "1px solid var(--pp-line)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-body",
    style: {
      color: "var(--pp-fg)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--pp-font-display)",
      fontWeight: 500,
      fontSize: 18,
      color: "var(--pp-fg-2)"
    }
  }, val));
}
function Investment({
  refCb
}) {
  return /*#__PURE__*/React.createElement(Section, {
    id: "investment",
    label: "investment",
    refCb: refCb,
    intro: "One scope, three phases, one number. Transparent from the first line \u2014 no surprises before the work begins."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(HCard, {
    style: {
      flex: "1 1 360px",
      justifyContent: "space-between",
      minHeight: 360
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Label, null, "full scope")), /*#__PURE__*/React.createElement(Row, {
    label: "Branding",
    val: "Phase 01"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "UX / UI Product",
    val: "Phase 02"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Website",
    val: "Phase 03"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-stat",
    style: {
      fontSize: 64
    }
  }, "$24k"), /*#__PURE__*/React.createElement("p", {
    className: "pp-body",
    style: {
      margin: "6px 0 0"
    }
  }, "Estimated total \xB7 10\u201312 weeks \xB7 40% to start"))), /*#__PURE__*/React.createElement(HCard, {
    style: {
      flex: "1 1 260px",
      justifyContent: "space-between",
      minHeight: 360
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pp-h3",
    style: {
      margin: 0
    }
  }, "Out of scope"), /*#__PURE__*/React.createElement("span", {
    className: "pp-role"
  }, "included as bonus")), /*#__PURE__*/React.createElement("p", {
    className: "pp-body",
    style: {
      margin: 0
    }
  }, "Copywriting, photo and video production, domain registration, and third-party hosting fees (except the 1-year bonus included in the Website phase)."))));
}

/* footer */
function Footer({
  refCb,
  onCopy,
  copied
}) {
  const isMobile = useIsMobile();
  return /*#__PURE__*/React.createElement("footer", {
    id: "next-steps",
    ref: refCb,
    style: {
      position: "relative",
      zIndex: 1,
      background: "radial-gradient(100% 140% at 50% 120%, rgba(212,254,0,.1), transparent 60%), #050505",
      padding: isMobile ? "56px 20px" : 80,
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 1040,
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? 40 : 60
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "pp-lead",
    style: {
      margin: 0,
      maxWidth: 760
    }
  }, "We build brands for companies that are already moving \u2014 and need everything else to keep up."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 40,
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "pp-body",
    style: {
      margin: 0
    }
  }, "Send us an email:"), /*#__PURE__*/React.createElement("button", {
    onClick: onCopy,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "var(--pp-control)",
      border: "none",
      borderRadius: 4,
      padding: "12px 16px",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "#d4fe00",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "5",
    width: "12",
    height: "9",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.5 6l5.5 4 5.5-4"
  })), /*#__PURE__*/React.createElement("span", {
    className: "pp-body",
    style: {
      color: "#fafafa"
    }
  }, copied ? "Email copied" : "hello@karta.io"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "pp-body",
    style: {
      margin: 0
    }
  }, "Follow us:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Social, {
    k: "in"
  }), /*#__PURE__*/React.createElement(Social, {
    k: "ig"
  }), /*#__PURE__*/React.createElement(Social, {
    k: "th"
  }), /*#__PURE__*/React.createElement(Social, {
    k: "x"
  })))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/karta-logo-white.svg",
    alt: "Karta",
    style: {
      height: 40,
      opacity: .9,
      marginTop: 20
    }
  })));
}
Object.assign(window, {
  Section,
  HCard,
  SectionDivider,
  OurRead,
  WhoWeAre,
  OurWork,
  Investment,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposal/sections.jsx", error: String((e && e.message) || e) }); }

})();
