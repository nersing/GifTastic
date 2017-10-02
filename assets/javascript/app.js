//array of topics for sports
var topics = ["Cleveland Cavaliers", "LeBron James", "Cleveland Indians", "NE Patriots", "Tom Brady", "Jordan Spieth"];

function displaySportsInfo(){

	  $("#gifs-appear-here").empty();

	var sport = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      sport + "&api_key=dc6zaTOxFJmzC&limit=10";

 	$.ajax({
      	url: queryURL,
      	method: "GET"
      }).done(function(response){
      	console.log(response);

     var results = response.data;

     for(var i = 0; i < results.length; i++){
 	      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          
          var gifDiv = $("<div>");
          gifDiv.addClass("gifs-go-here");
          
          	//rating
          var rating = results[i].rating;

          var ratingP = $("<p>").text("Rating: " + rating);
          	
          	//image
          var sportsImage = $("<img>");

          sportsImage.addClass("pics");
          sportsImage.attr("data-state", results[i]);
          sportsImage.attr("data-animate", results[i].images.fixed_height_small.url);
          sportsImage.attr("data-still", results[i].images.fixed_height_small_still.url);
          sportsImage.attr("src", results[i].images.fixed_height_small_still.url); 
          

          // Appending the paragraph and sportsImage
          gifDiv.append(ratingP);
          gifDiv.append(sportsImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);

        }

       	   $(".pics").on("click", function() {

      		var state = $(this).attr("data-state");
     				console.log("HI")
     		
      		if (state === "still") {
        	$(this).attr("src", $(this).attr("data-animate",));
       		$(this).attr("data-state", "animate");
      		} else {
        	$(this).attr("src", $(this).attr("data-still"));
        	$(this).attr("data-state", "still");
      			}
    		});

      }
	})
}



// Function for displaying sports data
      function renderButtons() {

        // Deletes the gif prior to adding new ones
        $("#buttons-view").empty();
        // Loops through the array of topics
        for (var i = 0; i < topics.length; i++) {

          var newButton = $("<button>");
         
          newButton.addClass("sports");
          
          newButton.attr("data-name", topics[i]);
          
          newButton.text(topics[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(newButton);
        }
      }

      // This function handles events where the add sports button is clicked
      $("#add-sports").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var sportNamed = $("#sports-input").val().trim();

        // The movie from the textbox is then added to our array
       topics.push(sportNamed);

        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".sports", displaySportsInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


