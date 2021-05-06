var rawgKey = "?key=ab34eb6425c34266b46d782f5d28a27e"
var gbKey = "?api_key=4991f7401be8b9b6a9f4364ca3a8a5fb859169db"

function randomGame() {
var rID = Math.floor(Math.random()*400000)
console.log(rID);
$.getJSON(
    "https://api.rawg.io/api/games/" + rID + rawgKey + "&platforms=1", 
    function(data) {
        console.log(data);
        console.log("https://api.rawg.io/api/games?key=ab34eb6425c34266b46d782f5d28a27e&search47123")
        var image = data.background_image;
            console.log(image)
        var name = data.name;

       /*  $('.gameArt').attr('src', image);
        $('.gameTitle').append(name); */
    });
};

function pullGB() {
    $.ajax ({
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        url: 'http://www.giantbomb.com/api/reviews/?format=jsonp&api_key=4991f7401be8b9b6a9f4364ca3a8a5fb859169db&filter=name:gears5',
        complete: function() {
            console.log('done');
        },
        success: function(data) {
            console.log(data);
        }
    });
    // $.getJSON("https://www.giantbomb.com/api/games/" + gbKey + "&filter=name:doom", function(data) {
    //     console.log(JSON.parse(data));
    // });
}

randomGame();
pullGB();