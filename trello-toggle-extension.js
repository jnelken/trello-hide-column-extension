window.document.body.onload = function() {
  if (!window.location.pathname.includes("/b/")) return;

  const UNMATCHABLE = "!@%$)^!@@#$)(&";

  const HIDE = "display:none;";
  const SHOW = "";
  let searchText = UNMATCHABLE;
  let nextStyle = HIDE;

  const button = document.createElement("div");
  // style it like the other buttons using the Trello class
  button.classList.add("board-header-btn");

  button.style =`
    display:inline-block;
    margin-right:5px;
    cursor:pointer;
    text-align:center;
    font-size:2em;
    line-height:1em;
    padding-left:10px;
    padding-right:10px;
  `.replace(/\s/g, "");

  button.onclick = e => {
    let columns = document.querySelectorAll(".js-list.list-wrapper");
    columns.forEach(col => {
      const cardsTotalCount = col.querySelectorAll(".list-card").length;
      const cardsHiddenCount = col.querySelectorAll(".list-card.hide").length;
      const isEmpty = cardsTotalCount === cardsHiddenCount
      const headerText = col.querySelector(
        ".list-header-name-assist.js-list-name-assist"
      ).innerHTML;
      const matchesSearch = headerText.includes(searchText);

      if (isEmpty) {
        col.style = nextStyle;
      }
      // override hide style if matches search
      if (matchesSearch) {
        col.style = SHOW;
      }
    });
    // toggle style for next button press
    nextStyle = nextStyle === HIDE ? SHOW : HIDE;
  };

  button.innerHTML = "☺︎";

  const search = document.createElement("input");
  search.type = "text";
  search.style = "width:120px;margin:8px;";
  search.addEventListener("keyup", e => {
    searchText = e.target.value || UNMATCHABLE;
  });

  const component = document.createElement("div");
  component.style = "display:inline-flex;";
  component.classList.add("board-header-btn");
  component.appendChild(search);
  component.appendChild(button);

  let attempts = 0
  const interval = setInterval(() => {
    console.log('attempts', attempts)
    const container = document.querySelector(".board-header-btns.mod-right");
    if(container) {
      container.insertBefore(component, container.firstChild);
      clearInterval(interval)
    }
    if(attempts > 10) {
      console.log('Toggle Trello Extension could not find the correct place to mount :(')
      clearInterval(interval)
    }
    attempts++
  }, 1000);
};
