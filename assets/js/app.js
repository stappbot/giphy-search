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
    "http://api.giphy.com/v1/gifs/search?q=italian+greyhound&apikey=3qa36TfqgfrKDr9roPZQrX8iflqGDn4a";

  $.ajax({
    URL: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    //create div to hold giphy
    $("#giphy-view").append("<div><strong>" + giphy + "</strong></div>");
    //retrieve rating data
    let rating = response.rating;
    // console.log(response.data);
    // console.log(response.rating);
    // console.log(response.data.rating);
    console.log(rating);
    //create element to have rating displayed and display it
    $("#giphy-view").append("<div>" + rating + "</div>");
  });
}

//function to display giphy
function renderButtons() {
  //deletes giphys before adding new ones
  $("#buttons-view").empty();
  //loop through giphy array
  for (let i = 0; i < giphy.length; i++) {
    //generate buttons for each giphy in array
    var newGiph = $("<button>");

    newGiph.addClass("giphy");
    newGiph.attr("data-name", giphy[i]);
    newGiph.text(giphy[i]);

    $("#buttons-view").append(newGiph);
  }
}
