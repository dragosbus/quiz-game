const DATA = (function() {
    let questions = [];
    function init(category, difficulty) {
        let api = new Quiz(category, difficulty);
        api.fetchData().then(res=>questions=res);
    }
    return {questions, init};
}());