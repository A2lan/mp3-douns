import {
  getLyrics,
  setNextTrack,
  setPrevTrack,
  setTrack,
  togglePause,
  toggleReplay,
} from "js/services/controls";

export default class Controls extends HTMLElement {
  #playBtn;
  #nextBtn;
  #prevBtn;
  #progressBar;
  #replayBtn;
  #progressBarContainer;
  #openLyrics;
  #modal;
  #status = true;
  #lyricsOpen = false;
  #title;

  constructor() {
    super();
    this.#playBtn = this.querySelector("#play-btn");
    this.#nextBtn = this.querySelector("#next");
    this.#prevBtn = this.querySelector("#previous");
    this.#progressBar = this.querySelector("#progress-bar");
    this.#progressBarContainer = this.querySelector(".progress");
    this.#replayBtn = this.querySelector("#replay-btn");
    this.#openLyrics = this.querySelector("#open-lyrics");
    this.#modal = document.querySelector("wc-modal");
    this.#title = this.querySelector(".controls__title");
  }

  renderPlayBtn(status) {
    if (status) {
      this.#playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play" > <polygon points="6 3 20 12 6 21 6 3" /> </svg>`;
    } else {
      this.#playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>`;
    }
  }

  connectedCallback() {
    this.#playBtn.addEventListener("click", () => {
      if (!app.store.activeTrack) {
        setTrack(0);
        return;
      }

      togglePause();
    });

    window.addEventListener("pausechange", () => {
      if (this.#status !== app.store.paused) {
        this.#status = app.store.paused;
        this.renderPlayBtn(app.store.paused);
      }
    });

    this.#nextBtn.addEventListener("click", () => {
      setNextTrack();
    });

    this.#prevBtn.addEventListener("click", () => {
      setPrevTrack();
    });

    this.#progressBarContainer.addEventListener("click", (e) => {
      console.log("pa");
      this.seek(e);
    });

    this.#replayBtn.addEventListener("click", () => {
      toggleReplay();
      if (app.store.replay) {
        this.#replayBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#be185d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat-1"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/><path d="M11 10h1v4"/></svg>`;
      } else {
        this.#replayBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat" > <path d="m17 2 4 4-4 4" /> <path d="M3 11v-1a4 4 0 0 1 4-4h14" /> <path d="m7 22-4-4 4-4" /> <path d="M21 13v1a4 4 0 0 1-4 4H3" /> </svg>`;
      }
    });

    this.#openLyrics.addEventListener("click", async () => {
      if (app.store.activeTrack) {
        this.#lyricsOpen = !this.#lyricsOpen;
        this.#modal.setAttribute("isOpen", this.#lyricsOpen);
        this.#openLyrics.classList.toggle("btn-active");
      }
    });

    window.addEventListener("changetrack", () => {
      this.#title.innerText = app.store.activeTrack.titre;
    });
  }

  seek(e) {
    const rect = this.#progressBarContainer.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const percent = Math.min(Math.max(offsetX / width, 0), 1);
    const seekTime = percent * app.store.activeTrack.controls.duration();
    app.store.activeTrack.controls.seek(seekTime);
    this.#progressBar.style.width = `${percent * 100}%`;
  }
}

customElements.define("wc-controls", Controls);
