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
$.getJSON(URL,query,getFooter)
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
  response.results.map((item, index) => showBio(item));
}


function showHero(item) {

     //remove thumbnails with no image
    if(! item.thumbnail.path.includes("image_not_available")){
      $(`#letter-result`).append(`
      <div class="col-5">
      <img src="${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}" alt="${item.name} portrait" tabindex="0" class="hero-viewed">
        <p class="hero-name">${item.name}</p>
        </div>
      </div>
      `)
 }
}

function loader(){
  $('#letter-result').append(`<div class="loader"></div>`)
}

function letterSection(){
  //add event delegation
  $('body').on('click', '.navLetter',function(){
    getLetterResults = $(this).text();
    //add loader gif while images load
    loader();
    getDataFromApi();
       });
}


//Store the clicked character name in charName variable
function registerClickedName(){
 $('.hero-name').on('click',function()
 {
   charName = $(this).text();
  //  console.log(charName)
   getComicData();
   isLightBoxPresent();
   matchStoredCharacter();
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
  //  codeName = indexMatch.name
  //  intelligence = indexMatch.powerstats.intelligence
  //  strength = indexMatch.powerstats.strength
  //  speed = indexMatch.powerstats.speed
  //  durability = indexMatch.powerstats.durability
  //  power = indexMatch.powerstats.power
  //  combat = indexMatch.powerstats.combat
  //  gender = indexMatch.appearance.gender
  //  height = indexMatch.appearance.height[0]
  //  weight = indexMatch.appearance.weight[0]
  //  realName = indexMatch.biography.fullName
  //  alterEgo = indexMatch.biography.alterEgos
  //  alias = indexMatch.biography.aliases[0]
  //  alignment = indexMatch.biography.alignment
  //  affiliation = indexMatch.connexts.groupAffiliation

let description = item.description
let issues = item.comics.items


   $('#lightbox').html(
     `<div id="lb-container">
    <div class="header-box row">
      <div class="logo-box col-1">
        <img src="https://bit.ly/2P2EBV5" id="Shield-logo">
      </div>
      <div class="col-25">
        <h1 class="pg-header">S.H.I.E.L.D. Intelligence</h1>
      </div>
    </div>
    <section id="char-container">
      <h1 class="code-name">${item.name}</h1>
      <div class="row">
      <div class="col-4">
        <img class="img-thumb" src="${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}" alt="${item.name} portrait"></div>
      </div>
      <p class "describe">${item.description}</p>
      <h3>Comic Appearances</h3>
      <ul id ="issues"></ul>
    </section>

  </div>`
   ).show()

   for (let i = 0; i < 5; i++){
  let issueName = item.comics.items[i].name;
  if(issueName > 0){
  $('#issues').append(`<li>${issueName}</li>`)
}else{
  $('#issues').append(`<p>No Issue Data Available</p>`)
}}


}
// <h3>Power Ratings</h3>
//           <div class="power-rating">
//             <ul>
//               <li>Intelligence:${intelligence} </li>
//               <li>Strength:${strength} </li>
//               <li>Speed:${speed} </li>
//               <li>Durability: ${durability}</li>
//               <li>Power:${power} </li>
//               <li>Combat:${combat} </li>
//             </ul>
//           </div>

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
  getDataFromApi();
  letterSection();

  }

$(onPageLoad);


/////////////////////Deprecated CODE////////////////////////////////////
// function (data){
//   characterIndex(data)
//   pageNav(data)
//   // pagination()
//
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
