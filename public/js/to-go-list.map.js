toGoList.map = {
  viewModel: {},

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
      viewModel: this.viewModel,
    };

    ko.applyBindingsToNode(popupContent, { component: { name: 'map-popup-create', params } });
  },

  addToGoToMap: (toGo, map) => {
    const popupContent = window.document.createElement('div');

    const popup = new mapboxgl.Popup()
      .setDOMContent(popupContent);

    const markerContent = window.document.createElement('div');
    const markerContentText = window.document.createElement('span');
    markerContentText.innerText = toGo.name;
    markerContent.appendChild(markerContentText);

    const marker = new mapboxgl.Marker(markerContent)
      .setLngLat([toGo.lng, toGo.lat])
      .setPopup(popup)
      .addTo(map);

    toGo.marker = marker;

    const params = {
      toGo,
      viewModel: this.viewModel,
    };

    ko.applyBindingsToNode(popupContent, { component: { name: 'map-popup', params } });
  },

  centerToGo: (toGo) => {
    const lnglat = new mapboxgl.LngLat(toGo.lng, toGo.lat);
    this.viewModel.map.panTo(lnglat);
    if (!toGo.marker.getPopup().isOpen()) {
      toGo.marker.togglePopup();
    }
  },

  centerMarkers: () => {
    const bounds = new mapboxgl.LngLatBounds();
    const toGos = this.viewModel.filteredToGos();

    toGos.forEach((toGo) => {
      const lnglat = new mapboxgl.LngLat(toGo.lng, toGo.lat);
      bounds.extend(lnglat);
    });

    if (toGos.length > 0) {
      this.viewModel.map.fitBounds(bounds, {
        padding: { top: 25, bottom: 25, left: 25, right: 25 },
        maxZoom: 12 },
      );
    }
    if (toGos.length === 1) {
      if (!toGos[0].marker.getPopup().isOpen()) {
        toGos[0].marker.togglePopup();
      }
    }
  },

  initMap: (viewModel) => {
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

    this.viewModel = viewModel;

    return map;
  },
};
