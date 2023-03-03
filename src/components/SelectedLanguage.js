export default function SelectedLanguage({ $root, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "SelectedLanguage";
  this.state = initialState;

  $root.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    const { items = [] } = this.state;

    if (items.length === 0) {
      this.$element.style.display = "none";
      this.$element.innerHTML = ``;
    } else {
      this.$element.style.display = "block";
      this.$element.innerHTML = `
            <ul>
                ${items
                  .map((item, index) => {
                    return `<li data-index=${index}>${item}</li>`;
                  })
                  .join("")}
            </ul>`;
    }
  };

  this.render();
}
