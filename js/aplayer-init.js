/* 全局 APlayer 初始化 —— 只初始化一次，不受 Swup 页面切换影响 */
(function () {
  // 防止重复初始化
  if (window.__aplayer_inited) return;
  window.__aplayer_inited = true;

  function initAplayer() {
    // 如果页面上已经有 meting-js 元素，不再创建
    if (document.querySelector("meting-js")) return;

    var meting = document.createElement("meting-js");
    meting.setAttribute("server", "netease");
    meting.setAttribute("type", "playlist");
    meting.setAttribute("id", "397526221");
    meting.setAttribute("fixed", "true");
    meting.setAttribute("mini", "false");
    meting.setAttribute("autoplay", "true");
    meting.setAttribute("theme", "#1a1a2e");
    meting.setAttribute("loop", "all");
    meting.setAttribute("order", "list");
    meting.setAttribute("preload", "auto");
    meting.setAttribute("volume", "0.7");
    meting.setAttribute("list-folded", "true");
    meting.setAttribute("list-max-height", "400px");
    document.body.appendChild(meting);

    // 等待 MetingJS 初始化完成后添加上一首/下一首按钮
    var checkCount = 0;
    var timer = setInterval(function () {
      checkCount++;
      if (meting.aplayer) {
        clearInterval(timer);
        addNavButtons(meting.aplayer);
      } else if (checkCount > 50) {
        clearInterval(timer);
      }
    }, 200);
  }

  function addNavButtons(ap) {
    var tpl = ap.template;
    var controller = tpl.querySelector(".aplayer-controller");
    if (!controller) return;
    var timeEl = controller.querySelector(".aplayer-time");
    if (!timeEl) return;

    // 上一首
    var prevBtn = document.createElement("span");
    prevBtn.className = "aplayer-icon aplayer-icon-back";
    prevBtn.style.cssText = "display:inline-flex;margin:0 4px;cursor:pointer;";
    prevBtn.innerHTML =
      '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#3a3a48" d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>';
    prevBtn.onclick = function () {
      var idx = ap.list.audios.indexOf(ap.list.current);
      idx = (idx - 1 + ap.list.audios.length) % ap.list.audios.length;
      ap.list.switch(idx);
    };

    // 下一首
    var nextBtn = document.createElement("span");
    nextBtn.className = "aplayer-icon aplayer-icon-forward";
    nextBtn.style.cssText = "display:inline-flex;margin:0 4px;cursor:pointer;";
    nextBtn.innerHTML =
      '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#3a3a48" d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>';
    nextBtn.onclick = function () {
      var idx = ap.list.audios.indexOf(ap.list.current);
      idx = (idx + 1) % ap.list.audios.length;
      ap.list.switch(idx);
    };

    timeEl.insertAdjacentElement("beforebegin", nextBtn);
    timeEl.insertAdjacentElement("beforebegin", prevBtn);
  }

  // 等 APlayer 和 MetingJS 加载完毕后初始化
  if (window.APlayer && window.MetingJS) {
    initAplayer();
  } else {
    window.addEventListener("load", function () {
      setTimeout(initAplayer, 500);
    });
  }
})();
