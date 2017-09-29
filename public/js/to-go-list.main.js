document.addEventListener('DOMContentLoaded', () => {
  const viewModel = toGoList.viewModel;
  viewModel.registerComponents();
  viewModel.setupSubscribers();
  viewModel.map = toGoList.map.initMap();
  ko.applyBindings(toGoList.viewModel);
  toGoList.repository.load();
});
