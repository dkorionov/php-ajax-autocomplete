// clear inputs after restart page
$("#s_locality").val("");
$("#s_street").val("");
$("#s_address").val("");
$(".spinner-border").hide();

function autocompl(input, search, url, ans = null) {
    $(input).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: url,
                dataType: "json",
                type: "POST",
                data: {
                    answer: function () {
                        if (ans != null)
                            return $(ans).val();
                        else
                            return "";
                    },
                    query: request.term,
                    search: search,
                },
                success: function (data) {
                    if(input === "#s_street")
                        data.unshift("Все місто");
                    if (data.length < 1) {
                        $(input).next().text("no results");
                        $(input).next().css("display", "block");
                    }
                    else {
                        response(data);
                    }
                }
            })
        },
        minLength: 3,
        select: returnAnswer
    });

    function returnAnswer(event, ui) {
        $(input).val(ui.item.label);
        $(input).next().css("display", "none");
        $("#list-result").empty();
        $("#map").empty();
    }
}




$(document).ready(function () {
    autocompl("#s_region", 1, "index.php");
    autocompl("#s_locality", 2, "index.php", "#s_region");
    autocompl("#s_street", 3, "index.php", "#s_locality");

});




