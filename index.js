const URL = `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=100&apikey=dae95cc0861de65bc53fe1c135bc361b&offset=0
`
const URL1 = `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=12&apikey=dae95cc0861de65bc53fe1c135bc361b&offset=13
`
fetch(URL)
.then(function(res)
{
  res.json().then(dataAsJson =>
  {
    const query =  dataAsJson.data;

    readQuery(query);

  });

});

// function myFunction(){
//   const query = {
//     limt
//     apikey
//   }
// $.getJSON(URL, query, callback)
// }


function readQuery(data){
    //clear old data and then do this
    $('.query-results').html()
    const list = data.results.map((item, index) => showHeroes(item));
  }

function showHeroes(item){
 let heroIMG = item.thumbnail.path

  const heroData =   $('.query-results').append(`
     <div class="hero-viewed col-4">
  <img src="${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}" alt="${item.name} portrait">
  <h4 class="hero-name">${item.name}</h4></a>
</div>`


) console.log(heroData.length())
// hideNotFound(heroIMG)
}
  // function hideNotFound(heroIMG){
  //   $(`${heroIMG}:contains("image_not_available")`).hide();
  // }

function nextPage(){
  $('#btn_next').on('click', function(){
    fetch(URL1)
.then(function(res)
{
  res.json().then(dataAsJson =>
  {
    const query =  dataAsJson.data;

    readQuery(query);
  });

});
  })
}

nextPage()
