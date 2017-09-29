toGoList.map.popup = {
  viewModel: function viewModel(params) {
    this.remove = function remove() {
      toGoList.viewModel.removeToGo(this.toGo);
    };

    this.toGo = params;
    this.name = params.name;
    this.description = params.description;
  },

  template: { element: 'map-popup' },
};
