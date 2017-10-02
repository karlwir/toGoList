toGoList.map.popup = {
  viewModel: function viewModel(params) {
    const toGo = params.toGo;
    const rootViewModel = params.viewModel;
    this.remove = function remove() {
      rootViewModel.removeToGo(toGo);
    };
    this.name = toGo.name;
    this.description = toGo.description;
  },

  template: { element: 'map-popup' },
};
