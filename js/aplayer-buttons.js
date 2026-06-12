/* APlayer 固定模式下添加上一首/下一首按钮 */
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    var meting = document.querySelector("meting-js");
    if (!meting || !meting.aplayer) return;

    var ap = meting.aplayer;
    var tpl = ap.template;

    // 在时间前面插入上一首/下一首按钮
    var controller = tpl.querySelector(".aplayer-controller");
    if (!controller) return;

    var timeEl = controller.querySelector(".aplayer-time");
    if (!timeEl) return;

    // 上一首按钮
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

    // 下一首按钮
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
  }, 800);
});
