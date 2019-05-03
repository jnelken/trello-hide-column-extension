window.onload = function() {
  const HIDE = "display:none;";
  const SHOW = "";
  let nextStyle = HIDE;
  const container = document.querySelector(".board-header-btns.mod-right");
  const button = document.createElement("div");

  button.style =
    "display:inline-block;margin-right:5px;cursor:pointer;text-align:center;font-size:2em;line-height:1em;padding-left:10px;padding-right:10px;";
  button.classList.add("board-header-btn");

  button.onclick = e => {
    let columns = document.querySelectorAll(".js-list.list-wrapper");
    columns.forEach(col => {
      const hiddenCount = col.querySelectorAll(".list-card.hide").length;
      const allCount = col.querySelectorAll(".list-card").length;
      if (hiddenCount === allCount) {
        col.style = nextStyle;
      }
    });
    nextStyle = nextStyle === HIDE ? SHOW : HIDE;
  };

  button.innerHTML = "☺︎";

  container.insertBefore(button, container.firstChild);
};
