function updateTime() {
  const target = document.getElementById("current-time");
  if (!target) return;
  const now = new Date();
  target.textContent = now.toLocaleString("zh-TW", { hour12: false });
}

document.addEventListener("DOMContentLoaded", () => {
  updateTime();
  const btn = document.getElementById("refresh-time");
  if (btn) {
    btn.addEventListener("click", updateTime);
  }
});
