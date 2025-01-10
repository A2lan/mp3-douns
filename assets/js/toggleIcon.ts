export const getPlayIcon = (
  arg: "pause" | "play",
  size: "lg" | "sm" = "lg"
) => {
  if (arg === "play") {
    return `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="${size === "lg" ? 24 : 14}"
            height="${size === "lg" ? 24 : 14}"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-play"
          >
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>`;
  } else {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${
      size === "lg" ? 24 : 14
    }" height="${
      size === "lg" ? 24 : 14
    }" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>`;
  }
};
