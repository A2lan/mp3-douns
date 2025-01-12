import { getLyrics } from "js/services/controls";

export default class Modal extends HTMLElement {
  #container;

  static get observedAttributes() {
    return ["isopen"];
  }

  constructor() {
    super();
    this.#container = this.querySelector(".container");
    this.classList.add("modal");
  }

  connectedCallback() {
    window.addEventListener("changetrack", async () => {
      if (this.getAttribute("isopen") === "true") {
        this.setLyrics();
      }
    });
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === "isopen") {
      if (newValue === "true") {
        await this.setLyrics();
        this.classList.add("active");
      } else {
        this.classList.remove("active");
      }
    }
  }

  async setLyrics() {
    const lyrics = await getLyrics(app.store.activeTrack.lyrics);
    this.#container.innerHTML = lyrics;
  }
}

customElements.define("wc-modal", Modal);
