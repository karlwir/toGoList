toGoList.map.popupCreate = {
  viewModel: function viewModel(params) {
    this.save = function save() {
      const toGo = {
        name: this.name(),
        description: this.description(),
        lng: this.lng,
        lat: this.lat,
      };
      toGoList.viewModel.saveToGo(toGo);
      params.popup.remove();
    };

    this.lng = params.lng;
    this.lat = params.lat;
    this.close = params.close;
    this.name = ko.observable('');
    this.description = ko.observable('');

    this.validToGo = ko.computed(() => this.name().length > 0);
  },

  template: { element: 'map-popup-create' },
};
