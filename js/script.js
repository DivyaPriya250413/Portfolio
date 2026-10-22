(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Footer year */
  var yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* Theme toggle (saved in localStorage when available) */
  var root = document.documentElement;
  var themeBtn = $("#themeToggle");
  function setTheme(t) {
    if (t === "light") { root.setAttribute("data-theme", "light"); themeBtn.textContent = "☀️"; }
    else { root.removeAttribute("data-theme"); themeBtn.textContent = "🌙"; }
    try { localStorage.setItem("theme", t); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  setTheme(saved === "light" ? "light" : "dark");
  themeBtn.addEventListener("click", function () {
    setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
  });

  /* Mobile menu */
  var burger = $("#hamburger");
  var links = $("#navLinks");
  function closeMenu() {
    links.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
  burger.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("a", links).forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* Typing effect */
  var phrases = ["AWS (EC2, S3, IAM, VPC)", "Java Programming", "Android App Development", "React.js & Node.js", "Cloud Automation & DevOps"];
  var typed = $("#typed");
  var pi = 0, ci = 0, deleting = false;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function tick() {
    var word = phrases[pi];
    if (reduce) { typed.textContent = phrases[0]; return; }
    typed.textContent = word.substring(0, ci);
    var delay = deleting ? 45 : 90;
    if (!deleting && ci === word.length) { deleting = true; delay = 1400; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
    else { ci += deleting ? -1 : 1; }
    setTimeout(tick, delay);
  }
  tick();

  /* Scroll: navbar, progress, back-to-top, active link */
  var navbar = $("#navbar");
  var progress = $("#scrollProgress");
  var toTop = $("#toTop");
  var sections = $$("main section[id]");
  var navAnchors = $$("a", links);
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    navbar.classList.toggle("scrolled", y > 20);
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    toTop.classList.toggle("show", y > 500);
    var current = "home";
    sections.forEach(function (s) { if (y + 140 >= s.offsetTop) current = s.id; });
    navAnchors.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + current); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* Reveal on scroll */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Counter */
  $$(".counter").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    var done = false;
    function run() {
      if (done) return; done = true;
      var n = 0;
      var t = setInterval(function () {
        n++; el.textContent = n;
        if (n >= target) clearInterval(t);
      }, 250);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es, ob) {
        if (es[0].isIntersecting) { run(); ob.disconnect(); }
      }, { threshold: 0.6 }).observe(el);
    } else { el.textContent = target; }
  });

  /* Skill filters */
  var filters = $$(".filter");
  var cards = $$(".skill-card");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      cards.forEach(function (c) {
        var cat = c.getAttribute("data-cat");
        var show = f === "all" || cat === f || (f === "tools" && cat === "soft");
        c.classList.toggle("hide", !show);
        if (show) c.classList.add("visible");
      });
    });
  });

  /* Contact form -> opens email app (no backend needed for GitHub Pages) */
  var form = $("#contactForm");
  var err = $("#formError");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#cName").value.trim();
    var email = $("#cEmail").value.trim();
    var msg = $("#cMsg").value.trim();
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !email || !msg) { err.textContent = "Please fill in all fields."; return; }
    if (!ok) { err.textContent = "Please enter a valid email address."; return; }
    err.textContent = "";
    var subject = encodeURIComponent("Portfolio enquiry from " + name);
    var body = encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")");
    window.location.href = "mailto:divyapriyait2026@gmail.com?subject=" + subject + "&body=" + body;
  });
})();
