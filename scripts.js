// collect all the children of student-list
const $numOfStudents = $('.student-list').children()
// hide everything first, then slice out first 10 list items and show
$numOfStudents.hide().slice(0, 10).show();
// Build outer html for pagination area, setup class name
const pageLinks = $("<div class='pagination'><ul></ul></div>");
// Place outer html (the div and ul) onto page by appending
$('.page').append(pageLinks);
// Calculate number of pages, append inner html list items onto
for (i = 0; i < ($numOfStudents.length / 10); i += 1) {
  $(".pagination ul").append($('<li><a href="#">' + i + '</a></li>'));
}
// Here the pagination li css class gets converted into a jQuery object and now can be used internally as 'this' keyword
// Now hide everything first, then slice out between this.index * 10 and this.index * 10 plus ten more, and show
$(".pagination li").on('click', function () {
  $numOfStudents.hide().slice($(this).index() * 10, $(this).index() * 10 + 10).show();
});
// Building the html for the search box and buttons
// Use arrow syntax
const $searchDiv = () => {
  // Build outer div and add class name
	const $searchOuterHtml = $("<div></div>").addClass("student-search");
  // Insert after the h2 element at top
	$("h2").after($searchOuterHtml);
  // Append search box into searchOuterHtml div via student-search class
	const $searchInput = $("<input></input>").attr("placeholder", "Search for students...")
	.addClass("hold-input");
	$(".student-search").append($searchInput);
  // Create and append search button into student-search class
	const $searchButton = $("<button></button").text("Search").addClass("search-button");
	$(".student-search").append($searchButton);
  // Create and append clear button into student-search class
	const $clearButton = $("<button><a href='index.html'>Clear</a></button>").addClass("search-button");
	$(".student-search").append($clearButton);
}

// run function to create elements and place onto document
$searchDiv();

// On click event
$(".search-button").on("click", function() {
  const $studentMatch = [];
	const $searchResults = $(".hold-input").val().toLowerCase(); //hold the value of the search results

	for ( let i = 0; i < $numOfStudents.length; i++) {
			const $studentName = $(".student-details h3");
			if ($studentName[i].innerHTML.indexOf($searchResults) !== -1) {
			$numOfStudents[i].style.display = '';
			$studentMatch.push(i);
		} else {
			$numOfStudents[i].style.display = 'none';
		}
	}

  	// message if no Results, start by hiding it
  	const $noMatch = $("<p class='no_matches'>Search returned no matches.</p>");
  	$noMatch.hide();

  	if ($studentMatch.length === 0) {
  		$noMatch.show();
  		$(".student-list").append($noMatch);
  	} else {
  		$(".student-search").val('');
  	}
  });
