//Hook up the tweet display

$(document).ready(function () {

    $(".countdown").countdown({
        date: "6 May 2025 00:00:00",
        format: "on"
    },

        function () {
            // callback function
        });

}); 