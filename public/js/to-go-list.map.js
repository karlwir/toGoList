toGoList.map = {
  showPopupCreate: (map, e) => {
    const popupContent = window.document.createElement('div');

    const popup = new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .addTo(map)
      .setDOMContent(popupContent);

    const params = {
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
      popup,
    };

    ko.applyBindingsToNode(popupContent, { component: { name: 'map-popup-create', params } });
  },

  addToGoToMap: (toGo, map) => {
    const popupContent = window.document.createElement('div');

    const popup = new mapboxgl.Popup()
      .setDOMContent(popupContent);

    const marker = new mapboxgl.Marker()
      .setLngLat([toGo.lng, toGo.lat])
      .setPopup(popup)
      .addTo(map);

    toGo.marker = marker;

    ko.applyBindingsToNode(popupContent, { component: { name: 'map-popup', params: toGo } });
  },

  initMap: () => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FybHdpciIsImEiOiJjajgxbXo0OWI3OHpvMnltbDU0a2VzdmNkIn0.vuE9EOmGnr5xL2HbeX8__w';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      minZoom: 2,
      center: [14.37760267371786, 58.798804208751136],
    });

    map.on('click', (e) => {
      const canvas = document.querySelector('.mapboxgl-canvas');
      if (e.originalEvent.target === canvas) {
        toGoList.map.showPopupCreate(map, e);
      }
    });

    return map;
  },
};
