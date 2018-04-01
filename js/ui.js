class UI {
  constructor() {
    this.main = document.querySelector('main');
    this.selectCat = document.querySelector('.categories--select');
  }
  categories() {
    let categories = ["Sports", "Geography", "Politics"];
    for (let cat of categories) {
      let selectOption = document.createElement('option');
      selectOption.value = cat.toLowerCase();
      selectOption.textContent = cat;

      this.selectCat.appendChild(selectOption);
    }
  }
}