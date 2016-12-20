// Initial array of movies
      var tvShows = ["Parks and Recreation", "Westworld", "Psych", "Family Guy"];
      // displayTvInfo function re-renders the HTML to display the appropriate content
      function displayTvInfo() {
        var tv = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        tv + "&api_key=dc6zaTOxFJmzC&limit=10";
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
         
          
          $("#tv-view").empty();
          var results = response.data;
          // Looping through each result item
          for (var i = 0; i < results.length; i++) {
            // Creating and storing a div tag
            var tvDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
            var tvImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            tvImage.attr("src", results[i].images.fixed_height_still.url);
            tvImage.attr("data-still", results[i].images.fixed_height_still.url);
            tvImage.attr("data-animate", results[i].images.fixed_height.url);
            tvImage.attr("data-state", "still");
            tvImage.addClass("tvImage");
            // Appending the paragraph and image tag to the tvDiv
            tvDiv.append(p);
            tvDiv.append(tvImage);
            // Prependng the tvDiv to the HTML page in the "#tv-view" div
            $("#tv-view").prepend(tvDiv);
          }

          
        });
      }
      // Function for displaying movie data
      function renderButtons() {
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < tvShows.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of tv show to our button
          a.addClass("tv");
          // Adding a data-attribute
          a.attr("data-name", tvShows[i]);

          // Providing the initial button text
          a.text(tvShows[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }
      // This function handles events where a tv show button is clicked
      $("#add-tv").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var tv = $("#tv-input").val().trim();
        // Adding movie from the textbox to our array
        tvShows.push(tv);
        // Calling renderButtons which handles the processing of our tv show array
        renderButtons();
      });
      // Adding a click event listener to all elements with a class of "tv"
      $(document).on("click", ".tv", displayTvInfo);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      $(document).on("click", ".tvImage", function(event) {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      } else {
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
      }
    });