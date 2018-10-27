
// Get 10 gifs
// var loadGifs = $(window).on('load', function(data) {
//     alert('All assets are loaded');
// })

// Main program
$( document ).ready(function() {

    var animals = ["cheetah", "hyena", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbill", "pygmy goat", "chicken", "capybara", "serval", "salamander", "frog"];

    animals.forEach((animal) => { // mak a button for every animal in the array
        var button = $("<button type='button' class='animals' id='" + animal + "'>" + animal + "</button>");
        $("header.buttons").append(button);
    });

    $("button#submit").on("click", function(e){
        e.preventDefault();
        var animal = $("#animal").val();
        console.log(animal);

        if (!animals.includes(animal)) {
            console.log(animal, " doesn't exist in list of buttons, yay!");
            animals.push(animal);
            console.log(animals);
            var button = $("<button type='button' class='animals' data-animal='" + animal + "'>" + animal + "</button>");
            $("header.buttons").append(button);
        } else {
            alert("Sorry, animal exists in the current list already!");
        }
    });

    $("header").on("click", ".animals", function(loadGifs) {

        $("#gifs-appear-here").empty();
    
        var animal = $(this).attr("id");
        const gifQuota = 10;
        console.log(animal, " clicked");
    
        // Create query string with which to hit the API at Giphy.com
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&limit=" + gifQuota + "&rating=g&api_key=QgYQ4iv21G3Cgx98hVz8TgUSgKjWBRfc";
    
        // Performing our AJAX GET request
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        // After the data comes back from the API
        .then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
            var gifCount = 0;
            var searchBar = true;
            console.log(results);
    
            for (var i = 0; i < Math.ceil(gifQuota / 3); i++) {

                var newRow = $("<div>").addClass("row");
                
                for (var j = 0; j < 4; j++) {
                    
                    if (searchBar && gifCount === 3){ // add a fourth column to first row GUI for search form of new animal
                        
                        searchBar = false;
                        var addNewAnimalSearch = $('<figure></figure>').addClass('search');
                        addNewAnimalSearch.addClass("col-xl-3 col-lg-3");
                        addNewAnimalSearch.html('<form role="form"><fieldset><label for="animal"><strong>Add animal: </strong></label><input type="text" name="animal" id="animal" style="width: 125px"/><button type="submit" id="submit" value="Submit">Submit</button></fieldset></form>');
                        newRow.append(addNewAnimalSearch);
    
                    } else if (gifCount === i * 3 + 5) { // gifCount is 5 or 8 or 11 or 14... gifCount === (i * 3 + 5)
                        console.log('gifCount is ', gifCount); // never gets executed
                        var emptyCol = $('<figure>&nbsp;</figure>').addClass("empty col-lg-3 col-md-3");
                        newRow.append(emptyCol);
                    } else {
                        if( gifCount === 10 ) break;
                        console.log("i ", i, "results", results[gifCount], ' gifCount var', gifCount);
                        var column = $("<figure>").addClass("col-xl-3 col-lg-3"); // Used as a box to include caption, still .jpg, and animated .gif
                        var caption = $("<figcaption>").addClass("rating");
                        // if( results[gifCount].rating ) caption.text("rating: " + results[gifCount]['rating']); // rating caption
                        // else 
                        caption.text("rating: g");
                        var gif = $("<img>").addClass('gif');
                        gif.attr({ 'src': results[gifCount].images['480w_still'].url, 'index': gifCount, 'data-state': 'still', 'data-url': results[gifCount].images['downsized_medium'].url});
                        column.append(caption);
                        column.append(gif);
                        newRow.append(column); 
                        gifCount += 1;
                        // This did not work as an event doesn't fire with visibility hidden :(
                        // gif.css("visibility", "hidden");
                        // var jpeg = "url(" + results[gifCount].images['480w_still']['url'] + ")";
                        // column.css({'background-image': jpeg});
    
                        // var gif = $("<img>");
                        // gif.attr("src", results[i].images.fixed_width['url']);
                        // gif.attr('index', i);
                        // gif.css({'width': '268px', 'display': 'none'});
                        // gif.attr('data-state', 'animate');
                        // figure.prepend(gif);
                    }
                }
                $("#gifs-appear-here").append(newRow); // append row to the main element section where gifs appear
            }
        });
    });

    $("img.gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this);
        
        alert(state);
        state = state.attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            let animation = $(this).attr("data-url");
            let jpeg = $(this).attr("src");
            $(this).attr("src", animation);
            $(this).attr("data-url", jpeg);
            $(this).attr("data-state", "animate");
        } else {
            let jpg = $(this).attr("data-url");
            let anime = $(this).attr("src");
            $(this).attr("src", jpg);
            $(this).attr("data-url", anime);          
            $(this > "img").attr("data-state", "still");
        }
      });
});
