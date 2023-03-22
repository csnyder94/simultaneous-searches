var searchForm = document.querySelector('#search-form') //Getting Variables From HTML Page
var qInput = document.querySelector('#q');
var videosList = document.getElementById('videos');
var wikipediaDiv = document.getElementById('wikipediaDiv');

var wikiHandleSearch = function (event) { //Function to fetch from WikiPedia
    event.preventDefault(); //Prevents page from resetting on submission

    var q = qInput.value.trim(); //Turns user search input into variable "q"

    if (!q) {
        return;
    }

    var baseURL = 'https://en.wikipedia.org/w/api.php?origin=*&action=';
    var apiURL = baseURL + 'opensearch&search=' + q + '&limit=5&namespace=0&format=json';

    fetch(apiURL)
        .then(function (response) {
            return response.json();
            
        })
        .then(function (data) { //Iterates through data and appends Wikipedia URLs onto page
            console.log(data)
            var results = data[1];
            var links = data[3];
            var html = '<ul>';
            for (var i = 0; i < results.length; i++) {
                html += `<li><a href="${links[i]}" target="_blank">${results[i]}</a></li>`;
            }
            html += '</ul>';
            wikipediaDiv.innerHTML = html;
        })
        .catch(function (err) { //Catching and console logging errors
            console.log(err);
        });
};

searchForm.addEventListener('submit', wikiHandleSearch); //Event listener for submission button

var bingOptions = { //Sets Bing API Key and Host
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '168a4d3a4cmsh9a1eadacaa150cap199683jsn69b0a6c3e172',
        'X-RapidAPI-Host': 'bing-video-search1.p.rapidapi.com'
    }
};

searchForm.addEventListener('submit', function (event) { //Function for Bing Videos
    event.preventDefault(); //Prevents page from resetting on submission

    var q = qInput.value.trim(); //Takes user search input and makes into a variable trimming off whitespace

    fetch(`https://bing-video-search1.p.rapidapi.com/videos/search?count=5&q=${q}`, bingOptions) //Fetches Bing with search input as "q"
        .then(response => response.json())
        .then(response => {
            console.log(response)
            videosList.innerHTML = '';
            var videos = response.value;
        
            for (var i = 0; i < videos.length; i++) { // Iterating through data to display video and video title as clickable links
                var video = videos[i];
                var li = document.createElement('li');

                li.innerHTML = `<div><a href="${video.contentUrl}" target="_blank"><h3>${video.name}</h3></a></div> 
                <div><a href="${video.contentUrl}" target="_blank"><img src="${video.thumbnailUrl}" alt="${video.name}"></a></div>`;

                videosList.appendChild(li);
            }
        })
        .catch(err => console.error(err));
});
