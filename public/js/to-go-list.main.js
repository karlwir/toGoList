document.addEventListener('DOMContentLoaded', () => {
  const viewModel = new toGoList.ViewModel();
  viewModel.registerComponents();
  viewModel.map = toGoList.map.initMap(viewModel);
  viewModel.setupSubscribers();
  ko.applyBindings(viewModel);
  toGoList.repository.load(viewModel);
});
