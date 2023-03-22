var searchForm = document.querySelector('#search-form')
var qInput = document.querySelector('#q');
var videosList = document.getElementById('videos');
var wikipediaDiv = document.getElementById('wikipediaDiv'); // added this line

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
                // added code to display wikipedia search results
                var results = data[1];
                var links = data[3];
                var html = '<ul>';
                for (var i = 0; i < results.length; i++) {
                    html += `<li><a href="${links[i]}" target="_blank">${results[i]}</a></li>`;
                }
                html += '</ul>';
                wikipediaDiv.innerHTML = html;
            })
            .catch(function (err) {
                console.log(err);
            });
};
 
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
            // added this for loop 
            for (var i = 0; i < videos.length; i++) {
                var video = videos[i];
                var li = document.createElement('li');
                li.innerHTML = `<h3>${video.name}</h3><p>${video.description}</p><a href="${video.contentUrl}" target="_blank">Watch video</a>`;
                videosList.appendChild(li);
            }
        })
        .catch(err => console.error(err));
});
