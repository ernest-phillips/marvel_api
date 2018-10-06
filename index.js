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
   getComicData()
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
      <div class="col-5 js-heroContainer">       
      <img src="${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}" alt="${item.name} portrait" tabindex="0" class="hero-viewed" name="${item.name}">
        <p class="hero-name" name="${item.name}">${item.name}</p>
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
 $('.col-5').on('click','img[name], .hero-name',function()
 {   

   charName = $(this).attr('name') 
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
let issues = item.comics.items
if(item.description.length < 1){
  description = "This character does not currently have any biographical data."
}

   $('#lightbox').html(
     `
<div id="lb-container">
  <div class="header-box">
    <img class="logo" src="https://seeklogo.com/images/S/s-h-i-e-l-d-logo-F89847BD30-seeklogo.com.png">
    <h1 class="pg-header">S.H.I.E.L.D. <span class="lb-head-text">Intelligence File</span></h1>
  </div>
  <section id="char-container" class="row">
    <h1 class="code-name">${item.name}</h1>
    <div class="lb-photo">
      <img class="img-thumb " src="${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}" alt="${item.name} portrait"></div>
    <div class="description">
      <h2 class="bio">Bio:</h2>
      <p>${description}</p>
      <h2>Comic Appearances</h2>
      <section id="issues"></section>
      </div>
  </section>    
    
      <a href="#" class="js-exit-lb" class="exit">
  <img src="https://bit.ly/2DXX3x8" class="exit-img" alt="exit lightbox button">
</a>
   
</div>
      
      `  ).show() 
 
   for (let i = 0; i < 5; i++){  
      let issueName = item.comics.items[i].name;
      // if(issueName > 0){
      
   if(issues.length < 1){
      $('#issues').html(`<p>No Issue Data Available</p>`)      
    } else {
      $('#issues').append(`<p class="issue-name">${issueName}</p>`)
    }
   }
    
}

//close lightbox
function closeLightBox(){
  //Click anywhere on the page to get rid of lightbox window
	$('body').on('click',".js-exit-lb", function() { 
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
  closeLightBox()
  }

$(onPageLoad);


