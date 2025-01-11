function loadData() {
  const data = document.getElementById("data");
  window.app.store.data = JSON.parse(data.innerText);
}

export default loadData;
