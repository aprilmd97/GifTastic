var things = ["bubblegum", "rainbow", "headphones", "hot sauce", "pink floyd", "used tissue"];

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < things.length; i++) {
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("items-btn");
        // Adding a data-attribute
        a.attr("data-name", things[i]);
        // Providing the initial button text
        a.text(things[i]);

        $("#buttons-view").append(a);
    }
};

function userFavorites() {

    var a = $("<button>");
    a.addClass("items-btn");
    a.attr("data-name", $("#stuff-input").val().trim());
    a.text($("#stuff-input").val().trim());
    $("#user-favorites").append(a);
}

function displayStuff() {
    var thing = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=INCPliF1LtfPS9V0rq35hjMWLly25bVs&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        console.log(response.data[0].embed_url);
        for (var i = 0; i < 10; i++) {

            var imageURLStill = response.data[i].images.original_still.url;
            var imageURL = response.data[i].images.original.url;
            var rate = response.data[i].rating;
            var title = response.data[i].title;

            var images = $("<img>");
            var ratings = $("<p>");
            var imageTitle = $("<p>");
            var downloadLink = $("<a>");


            ratings.text("Rating: " + rate);
            imageTitle.text("Title: " + title);
            downloadLink.html("<button>");
            downloadLink.text("download gif");

            images.attr("src", imageURLStill);
            images.attr("alt", 'image');
            images.attr("width", 250);
            images.attr("height", 250);
            images.addClass('image');
            images.attr("data-still", imageURLStill);
            images.attr("data-animate", imageURL);
            downloadLink.attr("href", imageURL);
            downloadLink.html("<button href='imageURL'>Download Gif</button>");
            downloadLink.attr("download", "giphy.gif");

            theStuff();
            $("#stuff-view").prepend(images);
          

            function theStuff() {
                $("#stuff-view").prepend(ratings);
                $("#stuff-view").prepend(downloadLink);
                $("#stuff-view").prepend(imageTitle);

            }

        }

        $(document).on("click", "img", function () {
            $(this).toggle(3000);
            theStuff().remove();
        });

    });
};


$(document).on("mouseleave", "img", function () {
    $(this).attr("src", $(this).attr("data-still"));
});


$(document).on("mouseover", "img", function () {
    $(this).attr("src", $(this).attr("data-animate"));
});





displayStuff();


$("#add-stuff").on("click", function (event) {
    event.preventDefault();

    var thing = $("#stuff-input").val().trim();
    things.push(thing);

    renderButtons();
    userFavorites();
});

$(document).on("click", ".items-btn", displayStuff);

renderButtons();
