var searchForm = document.querySelector('#search-form')
var qInput = document.querySelector('#q');
var videosList = document.getElementById('videos');

var wikiHandleSearch = function (event) {
    event.preventDefault();
    var q = qInput.value.trim();
    
    if (!q) {
        return;
    }
    
    var baseURL = 'https://en.wikipedia.org/w/api.php?origin=*&action=';
    var apiURL = baseURL + 'opensearch&search=' + q + '&limit=5&namespace=0&format=json';

   fetch(apiURL)
   .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                console.log(data);
            })
            .catch(function (err) {
                console.log(err);
            });
}
 
searchForm.addEventListener('submit', wikiHandleSearch);

var bingOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '168a4d3a4cmsh9a1eadacaa150cap199683jsn69b0a6c3e172',
        'X-RapidAPI-Host': 'bing-video-search1.p.rapidapi.com'
    }
};

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var q = qInput.value.trim();
    fetch(`https://bing-video-search1.p.rapidapi.com/videos/search?count=5&q=${q}`, bingOptions)
        .then(response => response.json())
        .then(response => {
            videosList.innerHTML = '';
            var videos = response.value;
            console.log(videos)       
        })
        .catch(err => console.error(err));
});