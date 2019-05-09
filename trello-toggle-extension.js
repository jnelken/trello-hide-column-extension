window.document.body.onload = function() {
  if (!window.location.pathname.includes("/b/")) return;

  const UNMATCHABLE = "!@%$)^!@@#$)(&";

  const HIDE = "display:none;";
  const SHOW = "";
  const SEARCH_STYLE = 'width:120px;margin:8px;'
  let searchText = UNMATCHABLE;
  let nextStyle = HIDE;

  /* SEARCH */
  const search = document.createElement("input");
  search.type = "text";
  search.style = SEARCH_STYLE + HIDE;
  search.addEventListener("keyup", e => {
    searchText = e.target.value || UNMATCHABLE;
  });

  /* BUTTON */
  const button = document.createElement("div");

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

      let matchesSearch = false
      searchText.split('||').forEach(s => {
        if(headerText.includes(s.trim())) matchesSearch = true
      })

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

  /* CONTAINER */
  const container = document.createElement("div");
  // style it like the other header buttons using the Trello class
  container.classList.add("board-header-btn");
  container.style = "display:inline-flex;";
  container.appendChild(search);
  container.appendChild(button);
  container.onmouseover = e => search.style = SEARCH_STYLE + SHOW
  container.onmouseout = e => search.style = SEARCH_STYLE + HIDE

  /* MOUNT */
  let attempts = 0
  const interval = setInterval(() => {
    const trelloParent = document.querySelector(".board-header-btns.mod-right");
    if(trelloParent) {
      trelloParent.insertBefore(container, trelloParent.firstChild);
      clearInterval(interval)
    }
    if(attempts > 5) {
      console.log('Toggle Trello Extension could not find the correct place to mount :(')
      clearInterval(interval)
    }
    attempts++
  }, 1000);
};
