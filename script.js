const classOptions = document.querySelector("#class-options");
classes.forEach((className) => {
  const classOption = document.createElement("option");
  classOption.value = className.value;
  classOption.textContent = className.option;
  classOptions.appendChild(classOption);
});

function runOpeningAnimation() {
  let hero = document.querySelector(".hero");
  let slider = document.querySelector(".slider");
  let animation = document.querySelector("section.animation-wrapper");

  const timeLine = new TimelineMax();

  const animationTimeline = [1, 1.2, 1, 0.5];

  // parameter1 是要控制的對象
  // parameter2 是duration
  // parameter3 是控制對象的原始狀態
  // parameter4 是控制對象的動畫結束後的狀態
  // parameter5
  timeLine
    .fromTo(
      hero,
      animationTimeline[0],
      { height: "0%" },
      { height: "100%", ease: Power2.easeInOut }
    )
    .fromTo(
      hero,
      animationTimeline[1],
      { width: "80%" },
      { width: "100%", ease: Power2.easeInOut }
    )
    .fromTo(
      slider,
      animationTimeline[2],
      { x: "-100%" },
      { x: "0%", ease: Power2.easeInOut },
      "-=1.2" // Start the animation early when the slider animation begin
    )
    .fromTo(
      animation,
      animationTimeline[3],
      { opacity: 1 },
      { opacity: 0, ease: Power2.easeInOut }
    );

  setTimeout(() => {
    animation.remove();
  }, animationTimeline.reduce((a, b) => a + b) * 1000);

  if (!localStorage.getItem("visited")) {
    localStorage.setItem("visited", true);
  }
  localStorage.setItem("showOpeningAnimation", "true");
}
