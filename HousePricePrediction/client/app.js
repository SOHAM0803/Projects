function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value);  // Return selected value
        }
    }
    return -1;
}

function getBhkValue() {
    var uiBhk = document.getElementsByName("uiBHK");  // Corrected name from "uiBhk" to "uiBHK"
    for (var i = 0; i < uiBhk.length; i++) {
        if (uiBhk[i].checked) {
            return parseInt(uiBhk[i].value);  // Return selected value
        }
    }
    return -1;
}

function onClickedEstimatePrice() {  // Corrected function name to match HTML
    console.log("Estimate price button clicked");

    var sqft = document.getElementById("uiSqft");
    var bhk = getBhkValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    //var url = "http://127.0.0.1:5000/predict_home_price"; // Change URL if needed
    var url = "/api/predict_home_price";
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    }, function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakhs </h2>";
        console.log(status);
    });
}

function onPageLoad() {
    console.log("document loaded");
    //var url = "http://127.0.0.1:5000/get_location_names";
    var url = "/api/get_location_names";
    $.get(url, function(data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;
