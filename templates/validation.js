function checkInputs(input, nextInput, help) {
    let in2 = $(nextInput);
    let in1 = $(input);
    let hp = $(help);
    in2.on("focus", function () {
        if (in1.val() === "") {
            in2.addClass("has-warning");
            hp.text("Please fill the previous field");
            hp.css('display', 'block');
            hp.css('color', 'red');

        }
        in2.on("blur", function () {
            in2.removeClass("has-warning");
            hp.css("display", "none");
        })
    });
}


function autofocus(input, nextInput) {
    $(input).keyup(function (event) {
        if (event.keyCode === 13) {
            $(nextInput).focus();
            $(nextInput).val("");
            $("#list-result").empty();
            $("#map").empty();
        }

    })
}


$(document).ready(function () {
    autofocus("#s_region", "#s_locality");
    autofocus("#s_locality", "#s_street");
    checkInputs("#s_region", "#s_locality", '#help-locality');
    checkInputs("#s_locality", "#s_street", '#help-street');
});


