toGoList.repository = {
  load: () => {
    const toGos = (localStorage.getItem('toGoList')) ?
      JSON.parse(localStorage.getItem('toGoList')) : [];

    toGoList.viewModel.toGos(toGos);
  },

  save: () => {
    const toGos = toGoList.viewModel.toGos();
    const toGosNoMarkers = toGos.map((toGo) => {
      const toGoCopy = Object.assign({}, toGo);
      toGoCopy.marker = undefined;
      return toGoCopy;
    });
    const json = JSON.stringify(toGosNoMarkers);

    localStorage.setItem('toGoList', json);
  },
};
