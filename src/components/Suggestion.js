export default function Suggestion({ $root, initialState, onSelect }) {
  this.$element = document.createElement("div");
  this.$element.className = "Suggestion";
  $root.appendChild(this.$element);

  this.state = {
    selectedWord: 0,
    items: initialState.items,
    currentWord: initialState.currentWord,
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.renderMatchedItem = (item) => {
    const matchedWord = item.match(new RegExp(this.state.currentWord, "gi"))[0];
    return item.replace(
      new RegExp(this.state.currentWord, "gi"),
      `<span class="Suggestion__item--matched">${matchedWord}</span>`
    );
  };

  this.render = () => {
    const { items = [], selectedWord } = this.state;

    if (items.length === 0) {
      this.$element.style.display = "none";
      this.$element.innerHTML = ``;
    } else {
      this.$element.style.display = "block";
      this.$element.innerHTML = `
            <ul>
                ${items
                  .map((item, index) => {
                    return `<li data-index=${index}
                    class="${
                      index === selectedWord ? "Suggestion__item--selected" : ""
                    }">${this.renderMatchedItem(item)}</li>`;
                  })
                  .join("")}
            </ul>`;
    }
  };

  window.addEventListener("keyup", (e) => {
    if (this.state.items.length > 0) {
      const { items = [], selectedWord } = this.state;
      const lastIndex = items.length - 1;
      let nextIndex = selectedWord;

      if (e.key === "ArrowDown" || "ArrowUp" || "Enter") {
        if (e.key === "ArrowDown") {
          nextIndex = selectedWord === lastIndex ? 0 : nextIndex + 1;
        } else if (e.key === "ArrowUp") {
          nextIndex = selectedWord === 0 ? lastIndex : nextIndex - 1;
        } else if (e.key === "Enter") {
          onSelect(items[nextIndex]);
        }
      }

      this.setState({ ...this.state, selectedWord: nextIndex });
    }
  });

  this.$element.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { index } = $li.dataset;
      try {
        onSelect(this.state.items[index]);
      } catch (error) {
        alert("선택할 수 없습니다!");
      }
    }
  });

  this.render();
}
