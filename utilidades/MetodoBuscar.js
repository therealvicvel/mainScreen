const MetodoBuscar = (listData, searchText) => {
  return listData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.marca.toLowerCase().includes(searchText.toLowerCase())
  );
};

export default MetodoBuscar;