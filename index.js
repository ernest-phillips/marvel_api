const URL = `https://gateway.marvel.com:443/v1/public/characters?`
const COMIC_URL = `https://gateway.marvel.com:443/v1/public/comics?`
const KEY = "dae95cc0861de65bc53fe1c135bc361b"
let offset = 0;
let getLetterResults;


function getDataFromApi() {

  const query = {

    limit: 9,
    apikey: KEY,
    orderBy: 'name',
    offset: `${offset}`,
    nameStartsWith: `${getLetterResults}`
  }

$.getJSON(URL, query, characterQuery)
}


function characterQuery(data) {
  let response = data.data ;
  //clear old data and then do this
  $('.js-query-results').html('');
   response.results.map((item, index) => showHeroes(item));
}


function showHeroes(item) {
//Add character blocks to the DOM
  $('.js-query-results').append(`
     <div class="col-4">
     <div class="container">
<img src="${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}" alt="${item.name} portrait" tabindex="0">
  <h4 class="hero-name">${item.name}</h4></a>
  </div>
</div>`)

}

function letterClicked(){
  $('.js-letterClicked').on('click', function(event){
     event.preventDefault();
     getLetterResults =  $(this).text().toLowerCase();
//call the API again with new query value
     getDataFromApi();
       });
}

function footerInfo(){
  $('footer').html(
    ``
  )
}


function onPageLoad(){
  getDataFromApi();
  letterClicked();
}

$(onPageLoad);
