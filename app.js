// Save the subject grade form to a variable with its original state and value.
const originalGradeForm = document.querySelector(".subject-grade");
// Make a deep copy of the original subject grade form. Now every new form created later will be copied from this object.
const gradeForm = originalGradeForm.cloneNode(true);

// 讓整個網站的ENTER KEY都無法使用
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

// 防止FORM內部的BUTTON交出表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

function onCreditUpdate(credit) {
  credit.addEventListener("change", (e) => {
    setGPA();
  });
}

let allCredits = document.querySelectorAll(".class-credit");
allCredits.forEach(onCreditUpdate);

function onSelectUpdate(select) {
  select.addEventListener("change", (e) => {
    changeColor(e.target); // e.target = select
    setGPA();
  });
}

// 選擇select內的OPTION之後,要改變相對應的顏色
let allSelects = document.querySelectorAll("select");
allSelects.forEach(onSelectUpdate);

let addButton = document.querySelector(".add-button");
addButton.addEventListener("click", () => {
  // const originalGradeForm = document.querySelector(".subject-grade");
  const newGradeForm = gradeForm.cloneNode(true);
  newGradeForm.querySelectorAll("input").forEach((input) => (input.value = ""));
  newGradeForm.querySelector(".letter-grade").className = "letter-grade";
  newGradeForm.querySelector(".letter-grade").value = "";

  onCreditUpdate(newGradeForm.querySelector(".class-credit"));
  onSelectUpdate(newGradeForm.querySelector(".letter-grade"));
  onDelete(newGradeForm.querySelector(".delete-button"));

  document.querySelector(".grade-inputs > form").appendChild(newGradeForm);
  newGradeForm.style.animation = "scale-up 0.5s ease forwards";
  setTimeout(() => {
    // Remove the pop up animation
    newGradeForm.style.animation = "";
  }, 500);

  setGPA();
});

function onDelete(trash) {
  trash.addEventListener("click", (e) => {
    e.preventDefault();
    if (JSON.stringify(e.target) === JSON.stringify(trash)) {
      // Because the transition effect is added to the parent element, we need to add the transitionend event to the parent element as well.
      // trash.parentElement.classList.add("remove");
      trash.parentElement.style.animation = "scale-down 0.5s ease forwards";
      // trash.parentElement.addEventListener("animationend", (e) => {
      //   e.target.remove();
      //   setGPA();
      // });
      setTimeout(() => {
        trash.parentElement.remove();
        setGPA();
      }, 600);
    } else {
      console.error("Not a delete button");
    }
  });
  // trash.parentElement.addEventListener("transitionend", (e) => {
  //   e.target.remove();
  //   setGPA();
  // });
}

let allTrashes = document.querySelectorAll(".delete-button");
allTrashes.forEach(onDelete);

function changeColor(target) {
  target.classList.remove("A", "B", "C", "D", "F");
  if (target.value.includes("A")) {
    target.classList.add("A");
  } else if (target.value.includes("B")) {
    target.classList.add("B");
  } else if (target.value.includes("C")) {
    target.classList.add("C");
  } else if (target.value.includes("D")) {
    target.classList.add("D");
  } else if (target.value.includes("F")) {
    target.classList.add("F");
  }
}

function gradeToCredit(grade) {
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

function setGPA() {
  let formLength = document.querySelectorAll(".subject-grade").length;
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");

  let totalWeight = 0;
  let totalCredits = 0;
  let gpa = 0;
  // let totalCredits = credits.reduce((a, b) => {
  //   return (a.value || 0) + (b.value || 0);
  // });

  for (let i = 0; i < formLength; i++) {
    let credit = credits[i].valueAsNumber;
    let grade = selects[i].value;
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

// 排序演算法
let sortBtnDesc = document.querySelector(".sort-descending");
let sortBtnAsc = document.querySelector(".sort-ascending");
sortBtnDesc.addEventListener("click", () => {
  handleSorting("desc");
});
sortBtnAsc.addEventListener("click", () => {
  handleSorting("asc");
});

function handleSorting(order) {
  let gradeItems = Array.from(document.querySelectorAll(".subject-grade"));
  let sortItems = gradeItems.filter((item) => {
    return item.querySelector(".letter-grade").value !== "";
  });
  let unsortItems = gradeItems.filter((item) => {
    return item.querySelector(".letter-grade").value === "";
  });
  sortItems.sort((a, b) => {
    let aGrade = gradeToCredit(a.querySelector(".letter-grade").value);
    let bGrade = gradeToCredit(b.querySelector(".letter-grade").value);
    if (order === "desc") {
      return bGrade - aGrade;
    } else if (order === "asc") {
      return aGrade - bGrade;
    }
  });

  let formContainer = document.querySelector(".grade-inputs > form");
  formContainer.innerHTML = "";
  sortItems.forEach((item) => formContainer.appendChild(item));
  unsortItems.forEach((item) => formContainer.appendChild(item));
}
