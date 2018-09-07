const URL = `https://gateway.marvel.com:443/v1/public/characters?apikey=dae95cc0861de65bc53fe1c135bc361b&limit=5
`

fetch(URL) .then(function (res) { res.json().then(dataAsJson => { console.log(dataAsJson.data[]); }); });

function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
  }

  // Search for a specified string.
  function getDataFromApi(searchTerm, callback) {

    let query =
      {
        q: `${searchTerm}`,
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key : KEY,
        order: 'viewCount'
    };

  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
  }

function renderResult(result) {

  return `
  <section role="region">

  <a href="https://www.youtube.com/watch?v=${result.id.videoId}" alt="${result.snippet.title} Youtube video thumbnail."><img src ="${result.snippet.thumbnails.medium.url}"target="_blank"/></a>
  <h5>${result.snippet.title}</h5>
  <br>
  </section>`

}

function displayYouTubeSearchData(data) {

    const results = data.items.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);

}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}


$(watchSubmit);
