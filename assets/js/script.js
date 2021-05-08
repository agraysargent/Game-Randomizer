var rawgKey = "?key=ab34eb6425c34266b46d782f5d28a27e";
var gbKey = "?api_key=4991f7401be8b9b6a9f4364ca3a8a5fb859169db";


function randomGame() {
  var rID = Math.floor(Math.random() * 400000);
  console.log(rID);
  return $.getJSON(
    "https://api.rawg.io/api/games/" + rID + rawgKey + "&platforms=1",
    function (data) {
      // console.log(data);
      console.log(
        "https://api.rawg.io/api/games?key=ab34eb6425c34266b46d782f5d28a27e&search47123"
      );
      var image = data.background_image;
      // console.log(image)
      var name = data.name;
      $("#gameImage").attr("src", image);
      $("#gameTitle").text(name);
      return image;
      /*  $('.gameArt').attr('src', image);
        $('.gameTitle').append(name); */
    }
  );
}

function authenticate() {
  //gapi.auth2.init()
  return gapi.auth2
    .getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
    .then(
      function () {
        console.log("Sign-in successful");
      },
      function (err) {
        console.error("Error signing in", err);
      }
    );
}
function loadClient() {
  gapi.client.setApiKey("AIzaSyBZYg4KOXt0Nd4Pyey_tk_9aBdzTta9GUc");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.search
    .list({
      part: ["snippet"],
      maxResults: 25,
      q: "dog",
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({
    client_id:
      "826151254753-7s18ra40jlv01mnkaf4lva8ejh10uoq6.apps.googleusercontent.com",
  });
});

// function pullGB() {
//   $.ajax({
//     type: "GET",
//     dataType: "jsonp",
//     crossDomain: true,
//     jsonp: "json_callback",
//     url:
//       "http://www.giantbomb.com/api/reviews/?format=jsonp&api_key=4991f7401be8b9b6a9f4364ca3a8a5fb859169db&filter=name:gears5",
//     complete: function () {
//       console.log("done");
//     },
//     success: function (data) {
//       console.log(data);
//     },
//   });
  // $.getJSON("https://www.giantbomb.com/api/games/" + gbKey + "&filter=name:doom", function(data) {
  //     console.log(JSON.parse(data));
  // });

$("#randomButton").on("click", function () {
  randomGame().done(function (data) {
    console.log("click", data.background_image);
    $("#gameImage").attr("src", data.background_image);
    $("#gameTitle").text(data.name);
    console.log(data);
  });
});
//added local storage event
$('.storage').on('click', function (event){
  event.preventDefault();
  localStorage.setItem('Adult?', true);
});
randomGame();
// pullGB();
authenticate();
loadClient(); 
execute();