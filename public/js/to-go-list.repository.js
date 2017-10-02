toGoList.repository = {
  load: (viewModel) => {
    const toGos = (localStorage.getItem('toGoList')) ?
      JSON.parse(localStorage.getItem('toGoList')) : [];

    viewModel.toGos(toGos);
  },

  save: (viewModel) => {
    const toGos = viewModel.toGos();
    const toGosNoMarkers = toGos.map((toGo) => {
      const toGoCopy = Object.assign({}, toGo);
      toGoCopy.marker = undefined;
      return toGoCopy;
    });
    const json = JSON.stringify(toGosNoMarkers);

    localStorage.setItem('toGoList', json);
  },
};
