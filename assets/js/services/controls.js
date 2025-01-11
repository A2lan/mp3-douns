import { Howl } from "howler";

export function setTrack(id) {
  const trackId = Number(id);
  const track = app.store.data[trackId];

  //Créer la track et les contrôles
  const activeTrack = {
    ...track,
    id: trackId,
    controls: new Howl({
      src: track.src,
      html5: true,
      onplay: updateProgressBar,
      onend: () => {
        if (app.store.replay) {
          replay();
        } else {
          setNextTrack();
        }
      },
    }),
  };

  if (app.store.activeTrack) {
    app.store.activeTrack.controls.stop();
  }

  app.store.activeTrack = activeTrack;
  setPlay();
}

export function setPause() {
  app.store.paused = true;
  app.store.activeTrack.controls.pause();
}

export function setPlay() {
  app.store.paused = false;
  app.store.activeTrack.controls.play();
  updateMediaSession();
}

export function togglePause() {
  if (app.store.paused) {
    setPlay();
  } else {
    setPause();
  }
}

export function toggleReplay() {
  app.store.replay = !app.store.replay;
}

export function setNextTrack() {
  const nextTrackId = app.store.activeTrack.id + 1;

  if (nextTrackId >= app.store.data.length) {
    setTrack(0);
  } else {
    setTrack(nextTrackId);
  }
}

export function setPrevTrack() {
  const prevTrackId = app.store.activeTrack.id - 1;
  const max = app.store.data.length - 1;

  if (prevTrackId < 0) {
    setTrack(max);
  } else {
    setTrack(prevTrackId);
  }
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progress =
    (app.store.activeTrack.controls.seek() /
      app.store.activeTrack.controls.duration()) *
    100;
  progressBar.style.width = `${progress}%`;

  if (app.store.activeTrack.controls.playing()) {
    requestAnimationFrame(updateProgressBar);
  }
}

function replay() {
  app.store.activeTrack.controls.seek(0);
  app.store.activeTrack.controls.play();
}

const updateMediaSession = () => {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: app.store.activeTrack.titre,
      artist: "Allan",
      album: "Dounia",
      artwork: [
        { src: "icon-192x192.png", sizes: "192x192", type: "image/png" },
      ],
    });

    navigator.mediaSession.setActionHandler("play", setPlay);
    navigator.mediaSession.setActionHandler("pause", setPause);
    navigator.mediaSession.setActionHandler("previoustrack", setPrevTrack);
    navigator.mediaSession.setActionHandler("nexttrack", setNextTrack);
  }
};
