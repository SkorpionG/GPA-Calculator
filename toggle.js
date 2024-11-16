// Select the toggle checkbox
const toggleCheckbox = document.getElementById("animationToggle");
const toggleLabel = document.querySelector(".toggle-label");
const toggleLabelText = document.querySelector(".toggle-label span");
const toggleSwitch = document.querySelector(".switch");

// Function to handle toggle changes
const handleToggle = () => {
  toggleLabelText.innerText = toggleCheckbox.checked ? "Hide" : "Show";
  if (toggleCheckbox.checked) {
    // Toggle is ON
    localStorage.setItem("showOpeningAnimation", "true");
    console.log("Toggle is ON: showOpeningAnimation set to true");
  } else {
    // Toggle is OFF
    localStorage.removeItem("showOpeningAnimation");
    console.log("Toggle is OFF: showOpeningAnimation removed");
  }
};

// Event listener for toggle changes
toggleCheckbox.addEventListener("change", handleToggle);

toggleSwitch.addEventListener("mouseover", function () {
  toggleLabelText.innerText = toggleCheckbox.checked ? "Hide" : "Show";
  const timeLine = new TimelineMax();
  timeLine.fromTo(
    toggleLabel,
    0.3,
    { opacity: 0 },
    { opacity: 1, ease: Power2.easeInOut }
  );
});

toggleSwitch.addEventListener("mouseout", function () {
  toggleLabelText.innerText = toggleCheckbox.checked ? "Hide" : "Show";
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
