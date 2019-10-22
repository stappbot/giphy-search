var giphy = [
  "Italian Greyhound",
  "Gardening",
  "Art",
  "Bicycle",
  "Massage",
  "Jellyfish",
  "Seinfeld"
];

function displayGiphy() {
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

    //create div to hold giphy
    $("#giphy-view").append("<div><strong>" + giph + "</strong></div>");
    //retrieve rating data
    let data = response.data;
    for (let i = 0; i < data.length; i++) {
      //make new div to display rating and giphy
      var giphyReel = $("<div>");
      giphyReel.addClass("showIt");
      giphyReel.attr("data-name", data[i]);
      giphyReel.image(data[i]);

      $("#giphy-display").append(giphyReel);
      //for each one, append to giphy-view (image and source attribute)
    }
    //

    //create element to have rating displayed and display it
    $("#giphy-view").append("<div>" + rating + "</div>");
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
