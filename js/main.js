(function () {
  
  let ui = new UI();
  const playBtn = document.querySelector('.play');
  const ulChecks = document.querySelector('.checks');
  
  //append all data when document is loaded
  document.addEventListener('DOMContentLoaded', () => {
    ui.categories();
  });

  //get dificulty clicked
  ulChecks.addEventListener('click', e => {
    let target = e.target;
    if (target.tagName === 'LABEL') {
      let value = target.textContent;
      console.log(value.toLowerCase());
    }
  });

  //get category selected


}());