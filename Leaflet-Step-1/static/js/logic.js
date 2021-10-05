// store geoJSON
const earth = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';


//get request
d3.json('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json').then(function(response){
    const tectonicplates = L.geoJSON(response,{  
        style: function(feature){
            return{
                color: "#B7DF5F",
                weight: 3
            }
        }
    })

    d3.json(earth).then((data) => {
        var earthQuakes = L.geoJSON(data,{
            onEachFeature: function(feature,layer){
                layer.bindPopup("<h1>Earthquake: " + feature.properties.place + "</h1> <hr> Time: " + new Date (feature.properties.time) + "<hr> Magnitude: " + feature.properties.mag + "<hr> Significance: " + feature.properties.sig, {maxWidth: 400});
            },
            pointToLayer: addCircleMarker
            });
        function addCircleMarker (feature, latlng){
            let options={
                radius: feature.properties.mag * 3,
                stroke:false,
                fillColor: mapColor(feature.properties.sig),
                fillOpacity: 0.75,
            }
            return L.circleMarker( latlng, options );
        }
        createMap(earthQuakes, tectonicplates);    
    })
})


//Create Map Function
function createMap(earthQuakes, tectonicplates) {
    const dark= L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/dark-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: API_KEY
        });

    const light= L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: API_KEY
        });

    const sattelite= L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/satellite-v9',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: API_KEY
        });

    const baseMaps = {
        Light: light,
        Dark: dark,
        Sattelite: sattelite
        };

    const overlayMaps = {
        "Earthquakes" : earthQuakes,
         "tectonicplates": tectonicplates
        };

    let myMap = L.map('map', {
        center: [0, 0],
        zoom: 3,
        layers: [dark, earthQuakes,tectonicplates]
        });

    
    L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);
    
    //Add legend
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += "<h5>earthquakes magnitude</h5>";
    grade = [1, 2, 3, 4, 5];
    for (var i = 0; i < grade.length; i++) {
        div.innerHTML +=
            '<i style="background:' + mapColor(grade[i] + 1) + '"></i> ' + 
    + grade[i] + (grade[i + 1] ? ' - ' + grade[i + 1] + '<br><br>' : ' + ');
    }
    return div;
};

legend.addTo(myMap);

}

// Define function for Market Color
function mapColor(mag) {
  switch (true) {
    case mag > 5:
      return "#ea2c2c";
    case mag > 4:
      return "#eaa92c";
    case mag > 3:
      return "#d5ea2c";
    case mag > 2:
      return "#92ea2c";
    case mag > 1:
      return "#2ceabf";
    default:
      return "#2c99ea";
  }
};