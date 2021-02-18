// Declare map and set initial paramss
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 3
});

//add titlelayer defaults
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_Key
}).addTo(myMap);

//Give reference to chosen json URL (M1.0+ Earthquakes)
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson"

//create color options
//link to color scalers https://stackoverflow.com/questions/22893789/d3-color-scale-linear-with-multiple-colors
//colorscale = d3.scaleLinear()
    //.domain([-1, 0, 1])
    //.range(["red", "white", "green"])

//set up d3
d3.json(url, function(output) {
    //create forloop
    for (var axis = 0; axis < output.features.length; axis++) {
        //set colors for circle plots
        var color = "";
        if (base > 90) {
            color = "red"
        }
        else if (depth > 75) {
            color = "orange";
        }
        else if (depth > 50) {
            color = "yellow";
        }
        else if (depth > 25) {
            color = "blue";
        }
        else if (depth > 10) {
            color = "purple";
        }
        else {
            color = "white";
        }
    
    }
})