var rawgKey = "?key=ab34eb6425c34266b46d782f5d28a27e";
var steamkey = "?key=DC78978E4183C8ACDC9229DD302B8145";

function randomGame() {
  var rID = Math.floor(Math.random() * 400000);
  var steamId = "";
  console.log(rID);
  $.getJSON("https://api.rawg.io/api/games/" + rID + rawgKey, function (data) {
    var image = data.background_image;
    console.log(data.background_image);
    var name = data.name;
    console.log(data.name);
    console.log(data);
    console.log(data.slug);
    $("#gameImage").attr("src", image);
    $("#gameTitle").text(name);
    var steamCheck = data.stores.filter((s) => s.store.id === 1);
    if (steamCheck == false) return randomGame();
    fetch("https://api.rawg.io/api/games/" + data.slug + "/stores" + rawgKey)
      .then((res) => res.json())
      .then((steamData) => {
        if (steamData.detail === "Not found.") return randomGame();
        console.log(steamData);
        var steamCheck = steamData.results.filter(
          (result) => result.store_id === 1
        );
        if (steamCheck.length < 1) return;
        console.log(steamCheck);
        steamId = steamCheck[0].id;
        console.log(steamId);

        $.getJSON(
          "https://api.allorigins.win/get?url=https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=" +
            steamId +
            "&count=3",
          function (newsResponse) {
            console.log(newsResponse);
          }
        );
      });
  }).fail(function (data) {
    if (data.status === 404) {
      return randomGame();
    }
    return image;
  });
}

$("#randomButton").on("click", function () {
  randomGame().done(function (data) {
    console.log("click", data.background_image);
    $("#gameImage").attr("src", data.background_image);
    $("#gameTitle").text(data.name);
    console.log(data);
  });
});

randomGame();
