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
var limit = 10;
var currentPage = 0;

var currentTopic = "";
var currentOffset = 0;

function displayGiphy(offset = 0, target = $(this)) {
  $("#giphy-display").empty();
  var giph = $(target).attr("data-name");
  $("#next-page").attr("data-name", giph);
  $("#prev-page").attr("data-name", giph);
  //   var queryURL =
  //     "https://api.giphy.com/v1/gifs/search?q=" +
  //     giph +
  //     "&apikey=3qa36TfqgfrKDr9roPZQrX8iflqGDn4a";
  $.ajax({
    url: "https://api.giphy.com/v1/gifs/search",
    method: "GET",
    data: {
      apikey: "3qa36TfqgfrKDr9roPZQrX8iflqGDn4a",
      q: giph,
      limit: 10,
      offset: parseInt(offset)
    }
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
        .attr("src", data[i].images.fixed_height_still.url)
        .attr("data-still", data[i].images.fixed_height_still.url)
        .attr("data-animate", data[i].images.fixed_height.url)
        .attr("data-state", "still");
      //.attr(data-)^^
      giphyReel.addClass("show");

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

//function for animating gif upon clicking
$(document).on("click", ".show", function() {
  var gif = $(this);
  console.log("This is: " + this);
  var state = gif.attr("data-state");

  if (state === "still") {
    gif.attr("src", gif.attr("data-animate"));
    gif.attr("data-state", "animate");
  } else {
    gif.attr("src", gif.attr("data-still"));
    gif.attr("data-state", "still");
  }
});

//next page button click event
$("#next-page").on("click", function(event) {
  currentPage++;
  currentOffset += 10;
  let target = event.target;
  displayGiphy(currentOffset, target);
});

//next page button click event
$("#prev-page").on("click", function() {
  if (currentPage > 0) {
    currentPage--;
    currentOffset -= 10;
    let target = event.target;
    displayGiphy(currentOffset, target);
  }
});

//add click event listeners to all elements with a class of "giphy"
$(document).on("click", ".giphy", displayGiphy);

//call the renderButtons to display initial buttons
renderButtons();
