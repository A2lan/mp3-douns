const store = {
  data: [],
  activeTrack: null,
  paused: true,
  replay: false,
};

const proxiedStore = new Proxy(store, {
  set(target, property, value) {
    target[property] = value;
    if (property == "activeTrack") {
      window.dispatchEvent(new Event("changetrack"));
    }

    if (property == "paused") {
      window.dispatchEvent(new Event("pausechange"));
    }

    return true;
  },
});

export default proxiedStore;
