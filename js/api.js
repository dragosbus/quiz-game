class Quiz {
  constructor(category, difficulty) {
    this.category = category;
    this.difficulty = difficulty;
  }
  fetchData() {
    let url = `https://opentdb.com/api.php?amount=10&category=${this.category}&difficulty=${this.difficulty}&type=multiple`;
    return fetch(url).then(res => res.json());
  }

}