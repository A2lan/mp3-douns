import { Howl } from "howler";
import { HowlTrack, Track } from "./type";
import { getPlayIcon } from "./toggleIcon";

// Define the globals states
let activeTrack: HowlTrack | undefined = undefined;
let replay: boolean = false;
let pause: boolean = false;

// Get the data from the DOM
const playlist = document.querySelector(".playlist")!;
const progressBar = document.getElementById("progress-bar");
const listItem = playlist.querySelectorAll(".track") as NodeListOf<HTMLElement>;

const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next");
const previousBtn = document.getElementById("previous");
const data: Track[] = JSON.parse(playlist.getAttribute("data-playlist")!);

const createHowl = (id: number) => {
  const track = data[id];
  activeTrack = {
    ...track,
    id: id,
    howl: new Howl({
      src: track.src,
      onpause: pauseHandler,
      onplay: () => {
        playHandler();
        requestAnimationFrame(updateProgressBar);
      },
      onend: () => {
        getNextSong();
        progressBar.style.width = "0%";
      },
    }),
  };

  return activeTrack;
};

playlist.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const closest = target.closest(".track");
  if (!closest) return;

  const songId = Number(closest.getAttribute("data-id"));
  // changeIcon(songId);

  if (activeTrack) {
    activeTrack.howl.stop();
  }

  const howl = createHowl(songId);
  activeTrack = howl;

  play();
});

const play = () => {
  activeTrack?.howl.play();
};

const pauseHandler = () => {
  pause = true;
  toggleIcon();
};

const playHandler = () => {
  pause = false;
  toggleIcon();
};

const toggleIcon = () => {
  if (pause) {
    playBtn.innerHTML = getPlayIcon("play");
  } else {
    playBtn.innerHTML = getPlayIcon("pause");
  }
};

playBtn.addEventListener("click", () => {
  if (!activeTrack) {
    // changeIcon(0);
    activeTrack = createHowl(0);
    play();
    return;
  }

  if (!pause) {
    activeTrack.howl.pause();
    console.log(pause);
  } else {
    activeTrack.howl.play();
    console.log(pause);
  }
});

const getNextSong = () => {
  const nextId = activeTrack.id + 1;
  if (nextId >= data.length) {
    activeTrack.howl.stop();
    activeTrack = createHowl(0);
    play();
    return;
  }
  activeTrack.howl.stop();
  activeTrack = createHowl(nextId);
  play();
};

const getPreviousSong = () => {
  const nextId = activeTrack.id - 1;
  if (nextId <= 0) {
    activeTrack.howl.stop();
    activeTrack = createHowl(data.length - 1);
    play();
    return;
  }
  activeTrack.howl.stop();
  activeTrack = createHowl(nextId);
  play();
};

nextBtn.addEventListener("click", () => {
  getNextSong();
});

previousBtn.addEventListener("click", () => {
  getPreviousSong();
});

function updateProgressBar() {
  const progress =
    (activeTrack.howl.seek() / activeTrack.howl.duration()) * 100;
  progressBar.style.width = `${progress}%`;

  if (activeTrack.howl.playing()) {
    requestAnimationFrame(updateProgressBar);
  }
}

// const changeIcon = (id: number) => {
//   if (activeTrack) {
//     listItem[activeTrack.id].style.backgroundColor = "green";
//     console.log(listItem[activeTrack.id]);
//   }

//   listItem[id].style.backgroundColor = "red";
//   console.log(listItem[id]);
// };
