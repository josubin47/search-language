export default function SearchInput({ $root, initialState, onInputChange }) {
  this.$element = document.createElement("form");
  this.$element.className = "SearchInput";
  this.state = initialState;

  $root.appendChild(this.$element);

  this.$element.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  this.debounce = (callback, limit = 200) => {
    let timeout;
    return function (...arg) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback.apply(this, args);
      }, limit);
    };
  };

  this.render = () => {
    this.$element.innerHTML = `<input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value=${this.state}>`;
    document.querySelector(".SearchInput__input").focus();
  };

  this.$element.addEventListener("keyup", (e) => {
    const ignoreKeys = [
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
    ];
    if (!ignoreKeys.includes(e.key)) {
      this.debounce(onInputChange(e.target.value));
    }
  });

  this.render();
}
