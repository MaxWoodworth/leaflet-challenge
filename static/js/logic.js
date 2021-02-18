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
    console.log(output);
    //create forloop
    for (var axis = 0; axis < output.features.length; axis++) {
        //set colors for circle plots
        var color = "";
        if (depth > 90) {
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
        //Get variables from json
        var coordinates = output.features[axis].geometry.coordinates;
        var depth = output.features[axis].geometry.coordinates[2];
        var mag = output.features[axis].properties.mag;
        var location = output.features[axis].properties.place;

        //link to documentation where I refreshed on popups
        //https://leafletjs.com/examples/quick-start/
        if (coordinates) {
            L.circle([coordinates[1], coordinates [0]], {
                color: "light-blue",
                fillColor: color,
                fillOpacity: .5,
                radius: 50000
            }).bindPopup(`<h5>MAGNITUDE: ${mag}` + `<h5>LOCATION: ${location}`+ `<h5>DEPTH: ${depth}`).addTo(myMap);
        }
    }
    //Create Legend
    //helpful link https://leafletjs.com/examples/choropleth/
    var info = L.control({ position: 'bottomleft'})
    info.onAdd = function(label) {
        //create utility for DOM tree
        var div = L.DomUtil.create('div', 'info');
        //give legend params
        var params = ['Less than 10', '10 to 25', '25 to 50', '50 to 75', '75 to 90', 'Greater than 90'];
        //give legend a title
        var title = ['Kilometers of Depth per Eearthquake'];
        //give colors to match the colors of the circle plots, 'copy pasta from above
        var col = ["white","purple","blue","yellow","orange","red"];
        //https://www.w3schools.com/jsref/prop_html_innerhtml.asp
        //https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
        //helpful links^^
        for (var x = 0; x < params.length; x++) {
            div.innerHTML =
            title.push('<li style="background-color:' + col[x] + '   "></li>   ' + params[x]);      
        }
        div.innerHTML = '<ul>' + title.join('<br>') + '</ul>'
        return div;
    };
    info.addTo(myMap);
})