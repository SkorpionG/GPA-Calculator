import { runOpeningAnimation } from "./utils.js";
import { toggleLabelStatus, loadLanguagePreference } from "./languages.js";

// Select the toggle checkbox
const toggleCheckbox = document.getElementById("animation-toggle");
const toggleLabel = document.querySelector(".toggle-label");
const toggleLabelStatusText = document.getElementById(toggleLabelStatus.id);
const toggleSwitch = document.querySelector(".switch");

function displayToggleStatus() {
  const languagePreference = loadLanguagePreference();

  toggleLabelStatusText[toggleLabelStatus.target] = toggleCheckbox.checked
    ? toggleLabelStatus.hideStatusText[languagePreference]
    : toggleLabelStatus.showStatusText[languagePreference];
}

// Function to handle toggle changes
const handleToggle = () => {
  displayToggleStatus();
  if (toggleCheckbox.checked) {
    // Toggle is ON
    localStorage.setItem("showOpeningAnimation", "true");
  } else {
    // Toggle is OFF
    localStorage.removeItem("showOpeningAnimation");
  }
};

// Event listener for toggle changes
toggleCheckbox.addEventListener("change", handleToggle);

toggleSwitch.addEventListener("mouseover", () => {
  displayToggleStatus();
  const timeLine = new TimelineMax();
  timeLine.fromTo(
    toggleLabel,
    0.3,
    { opacity: 0 },
    { opacity: 1, ease: Power2.easeInOut }
  );
});

toggleSwitch.addEventListener("mouseout", () => {
  displayToggleStatus();
  const timeLine = new TimelineMax();
  timeLine.fromTo(
    toggleLabel,
    0.3,
    { opacity: 1 },
    { opacity: 0, ease: Power2.easeInOut }
  );
});

// Initialize toggle state based on localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const showAnimation = localStorage.getItem("showOpeningAnimation");
  const visited = localStorage.getItem("visited");
  if (!visited || showAnimation === "true") {
    toggleCheckbox.checked = true;
    runOpeningAnimation();
  } else {
    toggleCheckbox.checked = false;
    document.querySelector(".animation-wrapper").remove();
  }
});
