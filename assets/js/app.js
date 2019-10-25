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
      //console.log(rating);
      console.log(data[i].rating);
      //add rating to giphyBox
      var giphyReel = $("<img>");
      giphyReel
        .addClass("show-it")
        .attr("src", data[i].images.fixed_height.url);
      //.attr(data-)
      //add giphyReel to giphyBox
      giphyBox.append(giphyReel);
      giphyBox.append(rating);

      $("#giphy-display").append(giphyBox);
      //^show giphyBox, instead of giphyReel
    }
  });
}

//function to display giphy
function renderButtons() {
  //deletes giphys before adding new ones
  $("#giphy-view").empty();
  //loop through giphy array
  for (let i = 0; i < giphy.length; i++) {
    //generate buttons for each giphy in array
    var newGiph = $("<button>");

    newGiph.addClass("giphy");
    newGiph.addClass("btn btn-outline-success");
    newGiph.attr("data-name", giphy[i]);
    newGiph.text(giphy[i]);

    $("#giphy-view").append(newGiph);
  }
}

//functions for event of add giphy getting clicked
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

//add click event listeners to all elements with a class of "giphy"
$(document).on("click", ".giphy", displayGiphy);

//call the renderButtons to display initial buttons
renderButtons();
