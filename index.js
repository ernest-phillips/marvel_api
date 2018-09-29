const URL = `https://gateway.marvel.com:443/v1/public/characters?`
const KEY = "dae95cc0861de65bc53fe1c135bc361b"

const COMIC_URL = `https://gateway.marvel.com:443/v1/public/comics?`
let offset = 0;
let getLetterResults;
let charName;
console.log(charName)
let counter = 0;



function getDataFromApi() {
  const query = {
    limit: 100,
    apikey: KEY,
    orderBy: '-name',
    offset: `${offset}`
    }
$.getJSON(URL, query, characterIndex)
}

function getComicData(){
  const query = {
    limit: 3,
    apikey: KEY,
    orderBy: 'name',
    name: `${charName}`
      }
$.getJSON(URL, query, comicsIndex)
}

function getBookImgData(){
  let bookURL = `https://gateway.marvel.com:443/v1/public/comics?characters=`

  let query = {
    limit: 3,
    apikey: KEY
  }

  $.getJSON(bookURL,query,callback)
}


// function (data){
//   characterIndex(data)
//   pageNav(data)
//   // pagination()
//   getFooter(data)
// }

function characterIndex(data) {
  let response = data.data ;
  //clear old data and then do this
  $('.js-query-results').html('');
   response.results.map((item, index) => showHero(item));
   registerClickedName()
}

function comicsIndex(data){
  let response = data.data
  // event.preventDefault();
  //   $('.query-results').html('')
  response.results.map((item, index) => showBio(item));
  registerClickedName()
}


function showHero(item) {
  let firstLetter = item.name[0]

//  console.log(item.thumbnail.path.includes("image_not_available"))
 if(item.thumbnail.path.includes("image_not_available")){
   $(this).hide();
 }else{
  $(`.js-char-data`).append(`
      <div class="col-5">
  <img src="${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}" alt="${item.name} portrait" tabindex="0">
    <p class="hero-name">${item.name}</p>
    </div>
  </div>
  `)
 }
}


function registerClickedName(){
 $('.hero-name').on('click',function(){

   charName = $(this).text()
   getComicData();
    if ($('#lightbox').length > 0) {
      $('lightbox').show()
      } else{
        $('body').append(showBio())
      }
 })
}

function showBio(item){
   $('.js-char-data').html(
     `<article id="lightbox">
  <h1>${item.name}</h1>
  <img src="${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}" alt="${item.name} portrait">

  <p>${item.description}</p>
</article>

<section class="appearances">
    <ul>
      <li>${item.comics.items[0].name}</li>
      <li>${item.comics.items[1].name}</li>
      <li>${item.comics.items[2].name}</li>
    </ul>
  </section>`
   )
   console.log(item.comics.items)
    goBack();
}

function goBack(){
  //  $('.js-back').on('click', function(){
  //    $('.js-more-info').remove();
  //    getDataFromApi()
  //    console.log("did something")

  //Click anywhere on the page to get rid of lightbox window
	$('#lightbox').on('click', function() { //must use live, as the lightbox element is inserted into the DOM
		$('#lightbox').hide();
	});

}
// function letterSection(){
//   $('a').attr('name', function(event){
//     getLetterResults = $(this).text().toLowerCase();
//     getDataFromApi();
//        });
// }



// function pagination(){
//   $('.js-btm-nav').html(`
//  <ul>
//  <li class="toShow"><a href="#" class="js-page-prev"><</a></li>
//  <li class="toShow"><a href="#" class="js-page-next">></a></li>
//  </ul>
// `)
// }

function nextPage(){
   $('.js-btm-nav').on('click', ".js-page-next", function(event){
    //  event.preventDefault();
     counter+=1;
     offset = (counter) * 10  ;
     getDataFromApi();
    //  console.log("The offset is now: " ,offset)
  })
}

function pageNav(data){
  let results = data.data.results;
  let totalChars = data.data.total;
  // console.log(totalChars)
  //determin amount of pages from results
  let totalPages = totalChars/9;
  let pagesRemain = totalPages - counter;
  // console.log(pagesRemain)
  if (pagesRemain > 0){
     $('.toShow').toggle(function () {
     $(".toShow").addClass("active");
       })
  }  else {
     $('.toShow').toggle(function () {
     $(".toShow").addClass("inactive");
       })
  }

}



function prevPage(){
    $('.js-btm-nav').on('click', '#js-page-prev', function(event){
    //  event.preventDefault();

     counter-=1;
     offset = (counter) * 10  ;
     getDataFromApi();
     console.log("The offset is now: " ,offset)
  })
}

function getFooter(data){
  let copy = data.copyright;
  let attrTxt = data.attributionText
  let attrHTML = data.attributionHTML
  $('.js-footer').html(`${attrHTML}`)
}

function onPageLoad(){
   getDataFromApi();
  //  getAlphabet();
  //  letterSection();
   nextPage();
   prevPage();
  }

$(onPageLoad);
