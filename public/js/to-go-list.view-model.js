toGoList.ViewModel = function ViewModel() {
  const self = this;

  self.map = {};
  self.filterQuery = ko.observable('');
  self.toGos = ko.observableArray();
  self.filterActive = ko.computed(() => self.filterQuery().length > 0, this);
  self.noFilterResult = ko.computed(() => self.filterQuery().length > 0 &&
    self.filteredToGos().length === 0, this);

  self.filteredToGos = ko.computed(() => {
    const query = self.filterQuery().toLowerCase();
    if (self.filterActive()) {
      return ko.utils.arrayFilter(self.toGos(), (toGo) => {
        const name = toGo.name.toLowerCase();
        const description = toGo.description.toLowerCase();
        return name.includes(query) || description.includes(query);
      });
    }
    return self.toGos();
  }, this);

  self.saveToGo = (toGo) => {
    self.toGos.push(toGo);
    toGoList.repository.save(self);
  };

  self.removeToGo = (toGo) => {
    toGo.marker.remove();
    toGo.marker = undefined;
    self.toGos.remove(toGo);
    toGoList.repository.save(self);
  };

  self.registerComponents = () => {
    ko.components.register('map-popup', toGoList.map.popup);
    ko.components.register('map-popup-create', toGoList.map.popupCreate);
  };

  self.setupSubscribers = () => {
    self.filteredToGos.subscribe((newValue) => {
      if (!self.filterActive()) {
        self.toGos().forEach((toGo) => {
          if (!toGo.marker) {
            toGoList.map.addToGoToMap(toGo, self.map);
          }
        });
      } else {
        self.toGos().forEach((toGo) => {
          if (newValue.indexOf(toGo) !== -1) {
            if (!toGo.marker) {
              toGoList.map.addToGoToMap(toGo, self.map);
            }
          } else if (toGo.marker) {
            toGo.marker.remove();
            toGo.marker = undefined;
          }
        });
      }
      toGoList.map.boundsFromMarkers();
    });
  };
};
