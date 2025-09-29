// Inicializar mapa centrado en Pachacutec Ventanilla
var map = L.map('map').setView([-11.860, -77.144], 15);

// Capas base
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri'
});

// Control de capas base
var baseMaps = {
  "OpenStreetMap": osm,
  "Satélite": esriSat
};

// --- Función para resaltar al pasar el mouse ---
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 3,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });
}

// --- Función para resetear estilo ---
function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

// --- Función onEachFeature ---
function onEachFeature(feature, layer) {
  let props = feature.properties;
  let content = '<b>Información:</b><br>';
  for (let key in props) {
    content += `${key}: ${props[key]}<br>`;
  }
  layer.bindPopup(content);

  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
  });
}

// --- Cargar Perímetro ---
fetch('Nueva%20carpeta/perimetro.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: { color: 'red', weight: 2, fillOpacity: 0 },
      onEachFeature: onEachFeature
    }).addTo(map);
  });

// --- Cargar Vías ---
fetch('Nueva%20carpeta/vias.geojson')
  .then(res => res.json())
