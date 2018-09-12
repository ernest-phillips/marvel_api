const URL = `https://gateway.marvel.com:443/v1/public/characters?
`
const KEY = "dae95cc0861de65bc53fe1c135bc361b"
let offset = 0;
let getLetterResults;

function getDataFromApi(callback) {
  let data;
  const query = {
    limit:100 ,
    apikey: KEY,
    orderBy: 'name',
    offset: `${offset}`,
    nameStartsWith: `"${getLetterResults}"`
  };

$.getJSON(URL, query,callback)
}

function readQuery(data) {

  let response = data.data
  console.log(data)
  //clear old data and then do this

  $('.query-results').html('')
  const list = response.results.map((item, index) => showHeroes(item));
  // showInfo()
}

function showHeroes(item) {
  console.log("show heroes running")
  $('.query-results').append(`
     <div class="hero-viewed col-4">
<img src="${item.thumbnail.path}/standard_xlarge.${item.thumbnail.extension}" alt="${item.name} portrait">
  <h4 class="hero-name">${item.name}</h4></a>
</div>`)
console.log(item.name)

}

function showInfo(){
  $('img').on('click',function(event){
   $('.query-results').html(`

   `)

  })
}

// <button class="js-popup">
function nextPage(){

  $('.page-num').on('click', function(event){
     event.preventDefault();

     offset = ($(this).text() - 1) * 10  ;

     getDataFromApi(readQuery);
  })
}
// function generateLetterNav(){
//   let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
//   alphabet.map(() => )
// }
function letterClicked(){
  $('.js-letterClicked').on('click', function(event){
     event.preventDefault();

     getLetterResults =  $(this).text().toLowerCase();
     console.log(getLetterResults);

     getDataFromApi(readQuery);
       })
}
function onPageLoad(){
  getDataFromApi(readQuery)
  nextPage()
  letterClicked()

}

$(onPageLoad);
