import {
  loadClassOptions,
  CourseManager,
  appendSubjectEntry,
  updateGPA,
} from "./utils.js";
import { classes } from "./data.js";
import { loadLanguagePreference, updateDisplayedText } from "./languages.js";

loadClassOptions(classes);

const courses = CourseManager.courses;

if (courses.length > 0) {
  courses.forEach((course) => {
    appendSubjectEntry({
      id: course.id,
      classType: course.classType,
      classNumber: course.classNumber,
      classCredit: course.classCredit,
      letterGrade: course.letterGrade,
      showPopupAnimation: false,
    });
  });
}

updateGPA();

const formsToAdd = Math.max(0, 3 - courses.length);

for (let i = 0; i < formsToAdd; i++) {
  appendSubjectEntry({ showPopupAnimation: false });
}

const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", () => {
  appendSubjectEntry();
});

const savedLanguageCode = loadLanguagePreference();
updateDisplayedText(savedLanguageCode);
document.querySelector("#language-select").value = savedLanguageCode;
