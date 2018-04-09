const App = (function() {
    
    const introPage = {
        categoryVal:"",
        difficultyVal:"",
        getDifificulty(e) {
            let target = e.target;
            if (target.tagName === 'LABEL') {
                let value = target.textContent;
                this.difficultyVal = value.toLowerCase();
            }
        }
    };
    
    function init() {
        
    }
    
    function timer() {
         
    }
    
}());