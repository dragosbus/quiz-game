class UI {
  constructor() {
    this.main = document.querySelector('main');
    this.selectCat = document.querySelector('.categories--select');
  }
  categories() {
    let categories = [["Sports", 21], ["Geography", 22], ["Politics", 24]];
    for (let cat of categories) {
      let selectOption = document.createElement('option');
      selectOption.value = cat[1];
      selectOption.textContent = cat[0];

      this.selectCat.appendChild(selectOption);
    }
  }
}