toGoList.map = {
  showPopupCreate: (map, e) => {
    map.panTo(e.lngLat);
    const popup = new mapboxgl.Popup()
      .setLngLat(e.lngLat);

    this.content = window.document.createElement('div');
    this.params = {
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
      popup,
    };
    this.content.setAttribute('data-bind', 'component: { name: "map-popup-create", params: params }');
    ko.applyBindingsToNode(this.content);

    popup.setDOMContent(this.content)
      .addTo(map);
  },

  addToGoMarker: (toGo, map) => {
    this.content = window.document.createElement('div');
    this.params = toGo;
    this.content.setAttribute('data-bind', 'component: { name: "map-popup", params: params }');
    ko.applyBindingsToNode(this.content);
    this.popup = new mapboxgl.Popup()
      .setDOMContent(this.content);

    const marker = new mapboxgl.Marker()
      .setLngLat([toGo.lng, toGo.lat])
      .setPopup(this.popup)
      .addTo(map);

    toGo.marker = marker;
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
