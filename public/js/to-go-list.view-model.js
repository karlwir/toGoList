toGoList.viewModel = {
  map: {},
  toGos: ko.observableArray(),

  saveToGo: (toGo) => {
    const toGos = toGoList.viewModel.toGos;
    toGos.push(toGo);
    toGoList.repository.save();
  },

  removeToGo: (toGo) => {
    const toGos = toGoList.viewModel.toGos;
    toGo.marker.remove();
    toGos.remove(toGo);
    toGoList.repository.save();
  },

  registerComponents: () => {
    ko.components.register('map-popup', toGoList.map.popup);
    ko.components.register('map-popup-create', toGoList.map.popupCreate);
  },

  setupSubscribers: () => {
    toGoList.viewModel.toGos.subscribe((newValue) => {
      const map = toGoList.viewModel.map;
      newValue.forEach((toGo) => {
        if (!toGo.marker) {
          toGoList.map.addToGoMarker(toGo, map);
        }
      });
    });
  },
};
