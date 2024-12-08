import {
  updateGPA,
  updateGradeColor,
  initSubjectEntry,
  CourseManager,
} from "./utils.js";

export function handleEntryChange(e, targetAttr) {
  const targetCourseId = e.target.parentElement.getAttribute("course-id");
  if (targetCourseId) {
    CourseManager.updateCourse(targetCourseId, targetAttr, e.target.value);
  } else {
    initSubjectEntry(e.target.parentElement);
  }
}

export function handleEntryDelete(e) {
  e.preventDefault();
  const currentTarget = e.target;
  // Because the transition effect is added to the parent element, we need to add the transitionend event to the parent element as well.
  CourseManager.deleteCourse(
    currentTarget.parentElement.getAttribute("course-id")
  );
  currentTarget.parentElement.classList.add("remove");
  currentTarget.parentElement.addEventListener("transitionend", () => {
    currentTarget.parentElement.remove();
    updateGPA();
  });
  // currentTarget.parentElement.style.animation = "scale-down 0.5s ease forwards";
  // currentTarget.parentElement.addEventListener("animationend", (e) => {
  //   currentTarget.parentElement.remove();
  //   updateGPA();
  // });
  // setTimeout(() => {
  //   currentTarget.parentElement.remove();
  //   updateGPA();
  // }, 600);
}

export function handleCreditUpdate() {
  updateGPA();
}

export function handleGradeUpdate(e) {
  // 選擇select內的OPTION之後,要改變相對應的顏色
  updateGradeColor(e.target); // e.target = select
  updateGPA();
}
