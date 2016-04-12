// API Docs at: 
// http://www.omdbapi.com
'use strict';

// Save jQuery elements
const $movieselect = $('#movie-select');
const $searchbutton = $('#search-button');
const $moviesearch = $('#movie-search');
const $moviedetail = $('#movie-detail');

// Hide the movie select dropdown
$movieselect.hide();

// On form submit,
$searchbutton.on('click', function(e) {
	e.preventDefault();

	// get the user input
	let searchTerm = $moviesearch.val();
	searchTerm.replace(/ /g, '+');

	// make AJAX call to omdbapi
	searchKeyword(searchTerm);
});

const searchKeyword = (keyword) => {
	$.ajax({
		url: "http://www.omdbapi.com/?s=" + keyword,
		// Work with the response
    success: function( response ) {
      parseResults(response, keyword);
		}
	});
};

const parseResults = (response, keyword) => {
	// add option to movie select that says "Movies matching 'keyword'" (but keyword is saved user input)
	$movieselect.first().html('<option>Movies matching "' + keyword + '"</option>');
	const moviesArray = response.Search;

	// loop through the results, setting each one as an option in the movie select element
	$.each(moviesArray, function(i, movie) {
		$movieselect.append('<option>' + movie.Title + '</option>');
	});

	// un-hide the movie select dropdown
	$movieselect.show();
};

// On 'change' to the movie select dropdown, 
$movieselect.on('change', function() {
	let title = $('#movie-select :selected').text();
	title = title.replace(/[^A-Z0-9]+/ig, "+");

	// delete results from any previous searches
	$moviedetail.empty();

	searchTitle(title);
});		

// construct new AJAX call for selected movie
const searchTitle = (title) => {
	$.ajax({
		url: "http://www.omdbapi.com/?s=" + title,
		// Work with the response
    success: function( response ) {
      parseSingleResult(response);
		}
	});
};

// append movie title and movie poster to movie-detail div
const parseSingleResult = (response) => {
	const movieObj = response.Search[0];
	const movieTitle = movieObj.Title;
	const moviePoster = movieObj.Poster;
	$moviedetail.append('<h1>' + movieTitle + '</h1>');
	$moviedetail.append('<img src="' + moviePoster + '" />');
};

	
		

