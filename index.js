const URL = `https://gateway.marvel.com:443/v1/public/characters?`
const KEY = "dae95cc0861de65bc53fe1c135bc361b"

const COMIC_URL = `https://gateway.marvel.com:443/v1/public/comics?`
let offset = 0;
let getLetterResults;

let charName;
let counter = 0;



function getDataFromApi() {


  const query = {
    limit: 50,
    apikey: KEY,
    orderBy: 'name',
    offset: `${offset}`,
    nameStartsWith: `${getLetterResults}`
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

function sendLetterToAPI(){
    const getAlphabet =
    ["A","B","C","D","E","F"
    ,"G","H","I","K","L","M",
    "N","O","P","Q","R","S",
    "T","V","X","Y","Z"]



}

//Map index for the characacter results information

function characterIndex(data) {
  let response = data.data ;
  //clear old data and then do this
  $('#letter-result').html('');
   response.results.map((item, index) => showHero(item));
   registerClickedName()
}

//Map index for the characacter comics results information
function comicsIndex(data){
  let response = data.data
  // console.log(response)
  response.results.map((item, index) => showBio(item));

}


function showHero(item) {
 let firstLetter = item.name[0]

    //  remove thumbnails with no image
    // if(item.thumbnail.path.includes("image_not_available")){
    //   $(this).hide();
    // }else{

  $(`#letter-result`).append(`
      <div class="col-5">
  <img src="${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}" alt="${item.name} portrait" tabindex="0">
    <p class="hero-name">${item.name}</p>
    </div>
  </div>
  `)
 }


function letterSection(){

  $('.navLetter').on('click', function(){
    getLetterResults = $(this).text();
    getDataFromApi();
       });
}


//Store the clicked character name in charName variable
function registerClickedName(){
 $('.hero-name').on('click',function()
 {
   charName = $(this).text();
   console.log(charName)
   getComicData();
   isLightBoxPresent();
  }
 )
}

//check to see if lightbox is present
function isLightBoxPresent(){
  if ($('#lightbox').length > 0) {
      $('lightbox').show()
      } else{
        $('body').append()
      }
 }

//When character name clicked, a lightbox with more info shows
function showBio(item){

let description = item.description
let issues = item.comics.items.map((item,index) => (item))
console.log(issues.item)
   $('#lightbox').html(
     `<div id="lb-container">
  <h1>${item.name}</h1>
  <img class="img-thumb" src="${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}" alt="${item.name} portrait">
  <p class"describe">${item.description}</p>
  <section class="appearances">
  <h3>Character Appearances</h3>
    <ul>
    </ul>
  </section>
  </div>`
   ).show()
  //  console.log(item.comics.items)

}

//close lightbox
function goBack(){
  //Click anywhere on the page to get rid of lightbox window
	$('#lightbox').on('click', function() {
		$('#lightbox').hide();
	});
}


//add footer to DOM
function getFooter(data){
  let copy = data.copyright;
  let attrTxt = data.attributionText
  let attrHTML = data.attributionHTML
  $('.js-footer').html(`${attrHTML}`)
}

function randomChar(){

}

function onPageLoad(){
  // sendLetterToAPI()
  getDataFromApi();
  letterSection()
  // createSections()
  goBack();
  }

$(onPageLoad);


/////////////////////Deprecated CODE////////////////////////////////////
// function (data){
//   characterIndex(data)
//   pageNav(data)
//   // pagination()
//   getFooter(data)
// }

// function goBack(){
  //  $('.js-back').on('click', function(){
  //    $('.js-more-info').remove();
  //    getDataFromApi()

// function pagination(){
//   $('.js-btm-nav').html(`
//  <ul>
//  <li class="toShow"><a href="#" class="js-page-prev"><</a></li>
//  <li class="toShow"><a href="#" class="js-page-next">></a></li>
//  </ul>
// `)
// }

// function prevPage(){
//     $('.js-btm-nav').on('click', '#js-page-prev', function(event){
//     //  event.preventDefault();

//      counter-=1;
//      offset = (counter) * 10  ;
//      getDataFromApi();

//   })
// }

// function nextPage(){
//    $('.js-btm-nav').on('click', ".js-page-next", function(event){
//     //  event.preventDefault();
//      counter+=1;
//      offset = (counter) * 10  ;
//      getDataFromApi();

//   })
// }

// function pageNav(data){
//   let results = data.data.results;
//   let totalChars = data.data.total;

//   //determin amount of pages from results
//   let totalPages = totalChars/9;
//   let pagesRemain = totalPages - counter;

//   if (pagesRemain > 0){
//      $('.toShow').toggle(function () {
//      $(".toShow").addClass("active");
//        })
//   }  else {
//      $('.toShow').toggle(function () {
//      $(".toShow").addClass("inactive");
//        })
//   }

// }

// function getBookImgData(){
//   let bookURL = `https://gateway.marvel.com:443/v1/public/comics?characters=`

//   let query = {
//     limit: 3,
//     apikey: KEY
//   }
//   $.getJSON(bookURL,query,callback)
// }





//     $('#letter-group').html(heroGroup.join(" \n"))
//     // console.log(heroGroup.join(" \n"));
//     letterSection();
// }
