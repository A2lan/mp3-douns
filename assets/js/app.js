import loadData from "./services/getData";
import proxiedStore from "./services/store";
import Playlist from "./components/Playlist";
import Controls from "./components/Controls";

window.app = {};
app.store = proxiedStore;

window.addEventListener("DOMContentLoaded", () => {
  loadData();
});
