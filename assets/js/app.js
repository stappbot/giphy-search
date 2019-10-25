var giphy = [
  "Italian Greyhound",
  "Gardening",
  "Art",
  "Bicycle",
  "Massage",
  "Jellyfish",
  "Seinfeld",
  "Skeleton",
  "Vampire",
  "Turtle",
  "Ganesha",
  "Sloth",
  "Glasses"
];

function displayGiphy() {
  $("#giphy-display").empty();
  var giph = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    giph +
    "&apikey=3qa36TfqgfrKDr9roPZQrX8iflqGDn4a";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    let data = response.data;

    for (let i = 0; i < data.length; i++) {
      //make new div to display rating and giphy
      var giphyBox = $("<div>");
      var rating = $("<p>");
      rating.text("Rated: " + data[i].rating);

      //add rating to giphyBox
      var giphyReel = $("<img>");
      giphyReel
        .addClass("show")
        .attr("src", data[i].images.fixed_height_still.url)
        .attr("data-still", data[i].images.fixed_height_still.url)
        .attr("data-animate", data[i].images.fixed_height.url)
        .attr("data-state", "still");
      //.attr(data-)^^
      //add giphyReel to giphyBox
      var title = $("<p>");
      title.text("Title: " + data[i].title);

      giphyBox.append(giphyReel);
      giphyBox.append(rating);
      giphyBox.append(title);

      $("#giphy-display").append(giphyBox);
      //^show giphyBox, instead of giphyReel
    }
  });
}

//function to display gif
function renderButtons() {
  //deletes giphys before adding new ones
  $("#giphy-view").empty();
  //loop through giphy array
  for (let i = 0; i < giphy.length; i++) {
    //generate buttons for each gif in array
    var newGiph = $("<button>");

    newGiph.addClass("giphy");
    newGiph.addClass("btn btn-outline-success");
    newGiph.attr("data-name", giphy[i]);
    newGiph.text(giphy[i]);

    $("#giphy-view").append(newGiph);
  }
}

//functions for event of add gif getting clicked
$("#add-giphy").on("click", function(event) {
  event.preventDefault();

  var giph = $("#giphy-input")
    .val()
    .trim();

  //movie from textbox added to array
  giphy.push(giph);

  //call renderButtons
  renderButtons();
});

// //function for animating gif upon clicking
// $(".show").on("click", function() {
//   var gif = $(this);
//   console.log("This is: " + this);
//   var state = gif.attr("data-state");

//   if (state === "still") {
//     gif.attr("src", gif.attr("data-animate"));
//     gif.attr("data-state", "animate");
//   } else {
//     gif.attr("src", gif.attr("data-still"));
//     gif.attr("data-state", "still");
//   }
// });

//add click event listeners to all elements with a class of "giphy"
$(document).on("click", ".giphy", displayGiphy);

//call the renderButtons to display initial buttons
renderButtons();
