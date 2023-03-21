var searchForm = document.querySelector('#search-form')
var qInput = document.querySelector('#q');

var handleSearch = function (event) {
    event.preventDefault();
    var q = qInput.value.trim();
    
    if (!q) {
        return;
    }
    
    var baseURL = 'https://en.wikipedia.org/w/api.php?origin=*&action=';
    var apiURL = baseURL + 'opensearch&search=' + q + '&limit=5&namespace=0&format=json';

   fetch(apiURL)
   .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            })
            .catch(function (err) {
                console.log(err);
            });
}
 
searchForm.addEventListener('submit', handleSearch);