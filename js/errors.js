class ERRORS {
  constructor() {
    this.parentIntro = document.getElementById('intro-page');
  }
  quizNotAvaible() {
    let error = `<div class="not-quiz slide-left-in">
    <h3>Error!</h3>
    <p>Is not exist questions for category selected!Please choose other category or other difficulty</p>
    </div>`;
    this.parentIntro.innerHTML+=error;
  }
}