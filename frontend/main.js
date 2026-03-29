/* ─────────────────────────────────────────────
   SOURAV PAUL — Cloud Resume JS
   Handles: visitor counter, scroll reveal,
            active nav, skill bar animation
───────────────────────────────────────────── */

// ── 1. Visitor Counter (AWS API Gateway → Lambda → DynamoDB) ──
const COUNTER_API = "https://g7k1pt54j2.execute-api.us-east-1.amazonaws.com/count";

async function fetchVisitorCount() {
  // ✅ Fix 1 — ID matches index.html id="visitor_count"
  const el = document.getElementById("visitor_count");
  try {
    const lastVisit = localStorage.getItem("lastVisitTime");
    const now = Date.now();
    const threeHours = 3 * 60 * 60 * 1000;

    const isNewVisit = !lastVisit || (now - parseInt(lastVisit)) > threeHours;

    let res;
    if (isNewVisit) {
      // New visitor — POST to increment
      res = await fetch(COUNTER_API, { method: "POST" });
      if (!res.ok) throw new Error("Non-OK response");
      localStorage.setItem("lastVisitTime", now.toString());
    } else {
      // Within 3 hours — GET to just read
      res = await fetch(COUNTER_API, { method: "GET" });
      if (!res.ok) throw new Error("Non-OK response");
    }

    // ✅ Fix 2 — these lines are INSIDE the function, not floating outside
    const data = await res.json();
    const count = data.count ?? data.views ?? data.visitor_count ?? "—";
    animateCount(el, count);

  } catch (err) {
    console.warn("Visitor counter unavailable:", err.message);
    if (el) el.textContent = "—";
  }
}

// Smoothly count up to the final number
function animateCount(el, target) {
  if (typeof target !== "number") { el.textContent = target; return; }
  const duration = 1400;
  const start = performance.now();
  const from = 0;
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(from + (target - from) * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

fetchVisitorCount();


// ── 2. Scroll Reveal ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));


// ── 3. Skill Bar Animation ──
const skillsSection = document.getElementById("skills");
let barsAnimated = false;

const barObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !barsAnimated) {
      barsAnimated = true;
      document.querySelectorAll(".bar-fill").forEach(bar => {
        const target = bar.style.getPropertyValue("--w");
        bar.style.width = target;
      });
    }
  },
  { threshold: 0.3 }
);

if (skillsSection) barObserver.observe(skillsSection);


// ── 4. Active Nav Highlight on Scroll ──
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-item[data-section]");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach(item => {
          item.classList.toggle("active", item.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
);

sections.forEach(section => navObserver.observe(section));


// ── 5. Smooth scroll for sidebar nav links ──
document.querySelectorAll(".nav-item").forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});