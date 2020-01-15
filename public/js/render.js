mapboxgl.accessToken =
  "pk.eyJ1IjoibGVzbGllZGluaCIsImEiOiJjazVlNGZ0b3oyMDV4M25wbjRrMGx6ajVkIn0.etNCEs55ibjy4433yBdFwQ";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 18,
  center: [106.66858, 10.76104]
});

// Fetch stores from API

async function fetchStores() {
  const res = await fetch("/api/v1/stores");
  const dataJSON = await res.json();

  const formattedStores = dataJSON.data.map(store => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: "car"
      }
    };
  });

  loadMap(formattedStores);
}

// Load map with stores

function loadMap(stores) {
  map.on("load", function() {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores
        }
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 2.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top"
      }
    });
  });
}

fetchStores();
