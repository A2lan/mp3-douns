import loadData from "./services/getData";
import proxiedStore from "./services/store";
import Playlist from "./components/Playlist";
import Controls from "./components/Controls";
import Modal from "./components/Modal";

window.app = {};
app.store = proxiedStore;

window.addEventListener("DOMContentLoaded", async () => {
  loadData();
});
