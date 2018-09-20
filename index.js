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

  // const query2= {
  //   limit:6,
  //   apikey: KEY,
  //   orderBy: '-onsaleDate'
  // }
$.getJSON(URL, query, characterQuery)
// $.getJSON(COMIC_URL, query2, comicsQuery)
$.getJSON(URL, query, nextPage)
}


function characterQuery(data) {

  let response = data.data ;

  //clear old data and then do this
  $('.js-query-results').html('');
   response.results.map((item, index) => showHeroes(item));

}

// function comicsQuery(data){
//   let response = data.data
//   // event.preventDefault();
//   //   $('.query-results').html('')
//   response.results.map((item, index) => showComics(item));

// }


function showHeroes(item) {

  $('.js-query-results').append(`

     <div class="col-4">
     <div class="container">
<img src="${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}" alt="${item.name} portrait">
  <h4 class="hero-name">${item.name}</h4></a>
  </div>
</div>`)
$('.js-btm-nav').append(``)

}

function letterClicked(){

  $('.js-letterClicked').on('click', function(event){
     event.preventDefault();
     getLetterResults =  $(this).text().toLowerCase();

     getDataFromApi();
       });
}



// function showComics(item,getLetterResults){
//   //  console.log(`<article>${item.title} ${item.description}</article>`)
//    $('.js-moreData').on('click',function (){

//       $('.query-results').html(
//       `<article>${item.title}<br>
//       ${item.description}</article><br>
//       `)
//   });
//   $('.js-backBtn').on('click',()=>
//     getLetterResults = $(this).text()

//   )
// }

// function showInfo(){
//   $('img').on('click',function(event){
//    $('.query-results').html(`
   
//    `)

//   })
// }

// <button class="js-popup">

function nextPage(data){
  let results = data.data.results;
  // console.log(results)
  if(results.length > 9){
    $('.toShow').toggle(function () {
     $(".toShow").addClass("active");
    })
  }

  $('.js-page-num').on('click', function(event){
     event.preventDefault();

     offset = ($(this).text() - 1) * 10  ;

     getDataFromApi();
     console.log(offset)
  })
}



function onPageLoad(){
  getDataFromApi();

  letterClicked();

}

$(onPageLoad);
