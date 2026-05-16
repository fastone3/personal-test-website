// ========== 粒子背景 ==========
(function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // 创建粒子
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(88, 166, 255, ${p.alpha})`;
      ctx.fill();
    });

    // 连线
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(88, 166, 255, ${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ========== 终端打字效果 ==========
(function typeWriter() {
  const el = document.getElementById("typed-text");
  if (!el) return;
  const lines = [
    "initializing control system...",
    "loading PLC runtime environment...",
    "connecting to SCADA network...",
    "system ready. welcome aboard.",
  ];
  let lineIdx = 0,
    charIdx = 0,
    deleting = false;

  function tick() {
    const current = lines[lineIdx];
    if (!deleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        setTimeout(() => {
          deleting = true;
          tick();
        }, 2000);
        return;
      }
      setTimeout(tick, 50 + Math.random() * 40);
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 25);
    }
  }
  tick();
})();

// ========== 导航栏滚动效果 ==========
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ========== 汉堡菜单 ==========
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  // 点击链接后关闭
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// ========== 导航高亮 ==========
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute("id");
    }
  });
  navAnchors.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

// ========== 技能条动画（滚动触发） ==========
const fills = document.querySelectorAll(".skill-fill");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("animate");
      }
    });
  },
  { threshold: 0.5 }
);
fills.forEach((f) => observer.observe(f));

// ========== 滚动淡入 ==========
const fadeEls = document.querySelectorAll(".fade-in");
const fadeObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);
fadeEls.forEach((el) => fadeObs.observe(el));

// ========== 联系表单（Netlify Forms AJAX 提交） ==========
const form = document.getElementById("contact-form");
const formMsg = document.getElementById("form-msg");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        formMsg.textContent = "> 消息已发送，谢谢！";
        formMsg.style.color = "#3fb950";
        form.reset();
      })
      .catch(() => {
        formMsg.textContent = "> 发送失败，请稍后重试";
        formMsg.style.color = "#f85149";
      });
  });
}
