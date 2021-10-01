// Create a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Add a tile layer.
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);

//// Store our API endpoint as Url.
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// perform the Get request
d3.json (url).then(function (data){
// Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3> Location ${feature.properties.place} <br>Magnitude:${feature.properties.mag}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }
  
});

function Raduis(depth) {
  return Math.sqrt(depth / 3.1415);
}

//create a marker color based on magnitude
function markerSize(magnitude){
  if (magnitude > 10 ) {
    return '#8B0000'
  }

  if (magnitude > 9 ) {
    return '#8B22222'
  }

  if (magnitude > 8 ) {
    return '#FF0000'
  }

  if (magnitude > 7 ) {
    return '#DAA520'
  }

  if (magnitude > 6 ) {
    return '#FFD700'
  }

  if (magnitude > 5 ) {
    return '#FFFF00'
  }

  if (magnitude > 4 ) {
    return '#3CB371'
  }

  if (magnitude > 3 ) {
    return '#98FB98'
  }

  if (magnitude > 2 ) {
    return '#B0E0E6'
  }

  if (magnitude > 1 ) {
    return '#FFFFFF'
  }
};