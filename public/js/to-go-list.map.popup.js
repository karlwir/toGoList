toGoList.map.popup = {
  viewModel: function viewModel(params) {
    const toGo = params;
    this.remove = function remove() {
      toGoList.viewModel.removeToGo(toGo);
    };
    this.name = toGo.name;
    this.description = toGo.description;
  },

  template: { element: 'map-popup' },
};
