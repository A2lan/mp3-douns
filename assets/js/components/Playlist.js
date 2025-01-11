import { setTrack } from "js/services/controls";

export default class Playlist extends HTMLElement {
  #tracks;
  #active;

  constructor() {
    super();
    this.#tracks = this.querySelectorAll(".track");
  }

  connectedCallback() {
    this.addEventListener("click", (e) => {
      const el = e.target.closest(".track");
      if (!el) return;
      const trackId = el.getAttribute("data-id");
      setTrack(trackId);
    });

    window.addEventListener("changetrack", () => {
      if (!this.#active) {
        this.#active = this.#tracks[app.store.activeTrack.id];
      }

      this.#active.style.color = "white";
      this.#active = this.#tracks[app.store.activeTrack.id];
      this.#active.style.color = "#be185d";
    });
  }
}

customElements.define("wc-playlist", Playlist);
