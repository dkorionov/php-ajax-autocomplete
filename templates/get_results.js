$("#b_search").click(function () {
    if (!checkFields("#s_region", "#s_locality", "#s_street")) {
        alert("Please fill all the fields");
        return false;
    } else {
        sendForm("index.php", "#s_locality", "#s_street");
        return false;
    }

});

function checkFields(inpt1, inpt2, inpt3) {
    if ($(inpt1).val() === "" || $(inpt2).val() === "" || $(inpt3).val() === "") {
        return false;
    } else
        return true;
}


var result = [];

function sendForm(url, city, street) {
    let api_city = $(city).val();
    let api_street = $(street).val();
    $(".spinner-border").show();
    $.ajax({
        type: "POST",
        url: url,
        data: {
            city: api_city,
            street: api_street,
        },
        dataType: 'html',
        success: function (data) {
            //console.log(data);
            $(".spinner-border").hide();
            result = JSON.parse(data);
            result = result.slice(0,15);
            if(result.length < 1)
                return;
            $("#list-result").empty();
            makeResults();
            map = makeMap(result[0]["longitude"], result[0]["latitude"]);
        }
    })
}

function makeResults() {
    result.forEach(function (element) {
        $("#list-result").append(
            "<a class='list-group-item list-group-item-action' href='#'>" + element.fullAddressUa + "</a>");
    });
    $("a:first-child").focus();
    $("a:first-child").addClass("active");
}

function makeMap(longitude, latitude) {
    $("#map").empty();
    var baseMapLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    var map = new ol.Map({
        target: 'map',
        layers: [baseMapLayer],
        view: new ol.View({
            center: ol.proj.fromLonLat([Number(longitude), Number(latitude)]),
            zoom: 16
        })
    });
    result.forEach(function (element) {
        var marker = new ol.Feature({
            geometry: new ol.geom.Point(
                ol.proj.fromLonLat([Number(element['longitude']),Number( element['latitude'])])
            ),
        });

        marker.setStyle(new ol.style.Style({
            image: new ol.style.Icon(({
                color: '#ffcd46',
                crossOrigin: 'anonymous',
                src: 'templates/atm.png',

            }))
        }));

        var vectorSource = new ol.source.Vector({
            features: [marker]
        });
        var markerVectorLayer = new ol.layer.Vector({
            source: vectorSource,
        });
        map.addLayer(markerVectorLayer);
    })
}


$(document).ready(function () {
    $("#list-result").on("click", ".list-group-item", function () {
        let i = $(this).index();
        $(".active").removeClass("active");
        $(":hover").toggleClass("active");
        makeMap(result[i]['longitude'], result[i]['latitude']);
    });
});


