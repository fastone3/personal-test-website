// ========== 移动端导航切换 ==========
const navToggle = document.querySelector(".nav-toggle");
const navLinks  = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// ========== 联系表单（演示用，不真正发送） ==========
const form    = document.getElementById("contact-form");
const formMsg = document.getElementById("form-msg");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 简单验证
    const name  = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const msg   = form.querySelector("textarea").value.trim();

    if (!name || !email || !msg) {
      formMsg.textContent = "请填写所有字段 😊";
      formMsg.style.color = "#ef4444";
      return;
    }

    // 演示：显示成功提示（实际部署后可接入 Netlify Forms）
    formMsg.textContent = "消息已收到，谢谢！🎉（演示模式，未真实发送）";
    formMsg.style.color = "#10b981";
    form.reset();
  });
}

// ========== 导航栏滚动高亮 ==========
const sections  = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      current = sec.getAttribute("id");
    }
  });
  navAnchors.forEach((a) => {
    a.style.color = a.getAttribute("href") === "#" + current ? "#4f46e5" : "#555";
  });
});
