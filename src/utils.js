import {
  handleCreditUpdate,
  handleEntryChange,
  handleGradeUpdate,
  handleEntryDelete,
} from "./event-handler.js";

export function loadClassOptions(classes) {
  const classOptions = document.querySelector("#class-options");

  // Loading class options from data.js into class-options datalist.
  classes.forEach((className) => {
    const classOption = document.createElement("option");
    classOption.value = className.value;
    classOption.textContent = className.option;
    classOptions.appendChild(classOption);
  });
}

export function runOpeningAnimation() {
  const hero = document.querySelector(".hero");
  const slider = document.querySelector(".slider");
  const animation = document.querySelector("section.animation-wrapper");

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

export function initSubjectEntry(subjectEntry) {
  const course = CourseManager.addCourse(
    subjectEntry.querySelector(".class-type").value,
    subjectEntry.querySelector(".class-number").value,
    subjectEntry.querySelector(".class-credit").value,
    subjectEntry.querySelector(".letter-grade").value
  );
  subjectEntry.setAttribute("course-id", course.id);
}

export function appendSubjectEntry({
  showPopupAnimation = true,
  id = "",
  classType = "",
  classNumber = "",
  classCredit = "",
  letterGrade = "",
} = {}) {
  const newSubjectEntry = createSubjectEntry();
  const classTypeInput = newSubjectEntry.querySelector(".class-type");
  const classNumberInput = newSubjectEntry.querySelector(".class-number");
  const classCreditInput = newSubjectEntry.querySelector(".class-credit");
  const letterGradeInput = newSubjectEntry.querySelector(".letter-grade");

  newSubjectEntry.setAttribute("course-id", id);
  classTypeInput.value = classType;
  classNumberInput.value = classNumber;
  classCreditInput.value = classCredit;
  letterGradeInput.value = letterGrade;
  updateGradeColor(letterGradeInput);

  classTypeInput.addEventListener("change", (e) => {
    handleEntryChange(e, "classType");
  });
  classNumberInput.addEventListener("change", (e) => {
    handleEntryChange(e, "classNumber");
  });

  classCreditInput.addEventListener("change", (e) => {
    handleCreditUpdate();
    handleEntryChange(e, "classCredit");
  });
  letterGradeInput.addEventListener("change", (e) => {
    handleGradeUpdate(e);
    handleEntryChange(e, "letterGrade");
  });
  newSubjectEntry
    .querySelector(".delete-button")
    .addEventListener("click", handleEntryDelete);

  document.querySelector(".subject-container").appendChild(newSubjectEntry);

  updateGPA();
  if (!showPopupAnimation) {
    return;
  }

  newSubjectEntry.style.animation = "scale-up 0.5s ease forwards";

  // Remove the pop up animation
  newSubjectEntry.addEventListener("animationend", () => {
    newSubjectEntry.style.animation = "";
  });
  // setTimeout(() => {
  //   // Remove the pop up animation
  //   newSubjectEntry.style.animation = "";
  // }, 500);
}

export function updateGradeColor(target) {
  const classList = target.classList;
  const value = target.value;
  classList.remove("A", "B", "C", "D", "F");
  if (value.includes("A")) {
    classList.add("A");
  } else if (value.includes("B")) {
    classList.add("B");
  } else if (value.includes("C")) {
    classList.add("C");
  } else if (value.includes("D")) {
    classList.add("D");
  } else if (value.includes("F")) {
    classList.add("F");
  }
}

export function createSubjectEntry() {
  // 建立主要的 div 容器
  const subjectGrade = document.createElement("div");
  subjectGrade.className = "subject-entry";

  // 建立課程類型輸入框
  const classType = document.createElement("input");
  classType.type = "text";
  classType.placeholder = "Class Category";
  classType.className = "class-type";
  classType.setAttribute("list", "class-options");

  // 建立課程編號輸入框
  const classNumber = document.createElement("input");
  classNumber.type = "number";
  classNumber.placeholder = "Class Number";
  classNumber.className = "class-number";

  // 建立學分數輸入框
  const classCredit = document.createElement("input");
  classCredit.type = "number";
  classCredit.placeholder = "Credit";
  classCredit.min = "0";
  classCredit.max = "6";
  classCredit.className = "class-credit";

  // 建立成績選擇下拉選單
  const letterGrade = document.createElement("select");
  letterGrade.title = "Letter Grade";
  letterGrade.name = "letter-grade";
  letterGrade.className = "letter-grade";

  // 建立成績選項
  const grades = [
    "",
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
  ];
  grades.forEach((grade, index) => {
    const option = document.createElement("option");
    option.value = grade;
    option.textContent = grade;
    if (index === 0) {
      option.selected = true;
      option.disabled = true;
    }
    letterGrade.appendChild(option);
  });

  // 建立刪除按鈕
  const deleteButton = document.createElement("button");
  deleteButton.title = "Delete";
  deleteButton.className = "delete-button";
  deleteButton.type = "button";

  const trashIcon = document.createElement("i");
  trashIcon.className = "fas fa-trash";
  deleteButton.appendChild(trashIcon);

  // 組合所有元素
  subjectGrade.appendChild(classType);
  subjectGrade.appendChild(classNumber);
  subjectGrade.appendChild(classCredit);
  subjectGrade.appendChild(letterGrade);
  subjectGrade.appendChild(deleteButton);

  return subjectGrade;
}

export class Course {
  constructor(classType, classNumber, classCredit, letterGrade) {
    this.id = Date.now() + Math.random().toString(16).slice(2);
    this.classType = classType;
    this.classNumber = classNumber;
    this.classCredit = classCredit;
    this.letterGrade = letterGrade;
  }
}

export class GradeUtils {
  static gradeToPoints(grade) {
    const gradeMap = {
      "A+": 4.3,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      "D-": 0.7,
      F: 0.0,
    };
    return gradeMap[grade] || 0;
  }

  static calculateGPA(courses) {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const points = this.gradeToPoints(course.letterGrade);
      totalPoints += points * course.classCredit;
      totalCredits += Number(course.classCredit);
    });

    return totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  }
}

export class CourseManager {
  static #STORAGE_KEY = "courses";
  static courses = this.loadFromStorage();

  static addCourse(classType, classNumber, classCredit, letterGrade) {
    const course = new Course(classType, classNumber, classCredit, letterGrade);
    this.courses.push(course);
    this.saveToStorage();
    return course;
  }

  static updateCourse(id, property, value) {
    const course = this.courses.find((courseItem) => courseItem.id === id);
    if (course) {
      course[property] = value;
      this.saveToStorage();
    }
  }

  static deleteCourse(id) {
    this.courses = this.courses.filter((course) => course.id !== id);
    this.saveToStorage();
  }

  static loadFromStorage() {
    try {
      const savedCourses = localStorage.getItem(CourseManager.#STORAGE_KEY);
      if (savedCourses) {
        return JSON.parse(savedCourses);
      }
    } catch (error) {
      console.error("Error loading courses from storage:", error);
    }
    return [];
  }

  static saveToStorage() {
    try {
      localStorage.setItem(
        CourseManager.#STORAGE_KEY,
        JSON.stringify(this.courses)
      );
    } catch (error) {
      console.error("Error saving courses to storage:", error);
    }
  }
}

export function gradeToCredit(grade) {
  switch (grade.toUpperCase()) {
    case "A+":
      return 4.3;

    case "A":
      return 4.0;

    case "A-":
      return 3.7;

    case "B+":
      return 3.3;

    case "B":
      return 3.0;

    case "B-":
      return 2.7;

    case "C+":
      return 2.3;

    case "C":
      return 2.0;

    case "C-":
      return 1.7;

    case "D+":
      return 1.3;

    case "D":
      return 1.0;

    case "D-":
      return 0.7;

    case "F":
      return 0.0;

    default:
      return 0;
  }
}

export function updateGPA() {
  const formLength = document.querySelectorAll(".subject-entry").length;
  const classCredits = document.querySelectorAll(
    ".subject-entry .class-credit"
  );
  const selects = document.querySelectorAll(".subject-entry select");

  let totalWeight = 0;
  let totalCredits = 0;
  let gpa = 0;
  // let totalCredits = classCredits.reduce((a, b) => {
  //   return (a.value || 0) + (b.value || 0);
  // });

  for (let i = 0; i < formLength; i++) {
    const credit = classCredits[i].valueAsNumber;
    const grade = selects[i].value;
    if (!isNaN(credit) && grade) {
      totalCredits += credit;
      totalWeight += credit * gradeToCredit(grade);
    }
  }

  if (totalCredits > 0) {
    gpa = totalWeight / totalCredits;
  }
  document.querySelector("#result-gpa").innerText = gpa.toFixed(2);
}
