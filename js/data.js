const DATA = (function () {
    let quiz = [];
    function init(category, difficulty) {
        let api = new Quiz(category, difficulty);
        return api.fetchData().then(res => quiz=res);
    }
    return { quiz, init };
}());