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

  quiz(category, question, answers, right) {
    let quiz = `<div class="quiz slide-left-in">
      <h3>${category}</h3>
      <p>${question}</p>
      <ul>
      <li>${answers[0]}</li>
      <li>${answers[1]}</li>
      <li>${answers[2]}</li>
      <li>${right}</li>
      </ul>
      </div>`;
    
    return quiz;
  }
}

class Animations{
  constructor(element) {
    this.element = element;
  }
  slideLeftOut() {
    this.element.classList.add('slide-left-out');
    setTimeout(() => {
      this.element.style.display = 'none';
    },600);
  }
  slideLeftInt() {
    this.element.classList.add('slide-left-in');
  }
}