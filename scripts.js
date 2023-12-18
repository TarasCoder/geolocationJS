const getPositionBtn = document.getElementById("getPosition");
const map = document.getElementById("map");

function resetMap() {
  map.innerHTML = "";
}

const findMyState = (callback) => {
  const status = document.getElementById("status");
  let coords = {};
  const success = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    coords = { latitude, longitude };
    callback(coords);
  };
  const error = () => {
    status.innerText = "Permission not grounded";
  };
  navigator.geolocation.getCurrentPosition(success, error);
};

getPositionBtn.addEventListener("click", () => {
  findMyState((getCoords) => {
    init(getCoords);
  });
});

function init({ latitude, longitude }) {
  resetMap();
  const map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([longitude, latitude]),
      zoom: 11,
    }),
  });
}

// Instruction:
// https://youtu.be/VK9F8BWrOgY?si=x4bxi5VLy6J2OL6v
// https://www.youtube.com/watch?v=DqzJ6pwSwWk
// https://openlayers.org/
