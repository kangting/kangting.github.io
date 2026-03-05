/* =========================================================
   파일: assets/js/main.js
   - 탭 전환(Publications)
   - 다크/라이트 테마 토글
   - footer 연도 자동 표시
   ========================================================= */

(function () {
  // Footer 연도
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Publications 탭
  var tabButtons = document.querySelectorAll(".tab-btn");
  var panels = document.querySelectorAll(".pub-panel");

  function activate(tabId) {
    tabButtons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-tab") === tabId;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    panels.forEach(function (panel) {
      panel.hidden = panel.id !== tabId;
    });
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activate(btn.getAttribute("data-tab"));
    });
  });

  // 초기 활성 탭(첫 번째 버튼 기준)
  if (tabButtons.length > 0) {
    activate(tabButtons[0].getAttribute("data-tab"));
  }

  // 테마 토글 (localStorage에 저장)
  var toggle = document.getElementById("themeToggle");
  var storageKey = "theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (toggle) toggle.textContent = theme === "dark" ? "🌙" : "☀️";
  }

  try {
    var saved = localStorage.getItem(storageKey);
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
    }
  } catch (e) {
    // localStorage 접근 불가 환경이면 무시
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      // data-theme이 없으면 시스템 테마가 적용되므로, 클릭 시 반대 테마로 고정
      var next = current === "dark" ? "light" : "dark";

      applyTheme(next);
      try { localStorage.setItem(storageKey, next); } catch (e) {}
    });
  }
})();
