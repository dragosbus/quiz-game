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
  
  infos(currentQuizIndex, quizes, time) {
    let info = `<div class="info">
    <p class="index-question">${currentQuizIndex+1}/${quizes.length}</p>
    <p>${time}</p>
    </div>`
    
    return info;
  }
}

class Animations{
  constructor(element) {
    this.element = element;
  }
  slideLeftOut() {
    this.element.classList.add('slide-left-out');
  }
  slideLeftIn() {
    this.element.classList.add('slide-left-in');
  }
  fadeOut() {
    this.element.classList.add('fade-out');
  }
  
}