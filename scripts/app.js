import { gradeToCredit } from "./utils.js";
import { updateDisplayedText } from "./languages.js";

// 讓整個網站的ENTER KEY都無法使用
window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

// 防止FORM內部的BUTTON交出表單
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

document.querySelector("#language-select").addEventListener("change", (e) => {
  updateDisplayedText(e.target.value);
});

// 排序演算法
const sortBtnDesc = document.querySelector(".sort-descending");
const sortBtnAsc = document.querySelector(".sort-ascending");
sortBtnDesc.addEventListener("click", () => {
  handleSorting("desc");
});
sortBtnAsc.addEventListener("click", () => {
  handleSorting("asc");
});

function handleSorting(order) {
  const gradeInputs = document.querySelectorAll(".subject-entry");
  if (gradeInputs.length === 0) {
    // alert("請先輸入成績");
    return;
  }
  const gradeItems = Array.from(document.querySelectorAll(".subject-entry"));
  const sortItems = gradeItems.filter((item) => {
    return item.querySelector(".letter-grade").value !== "";
  });
  const unsortItems = gradeItems.filter((item) => {
    return item.querySelector(".letter-grade").value === "";
  });
  sortItems.sort((a, b) => {
    const aGrade = gradeToCredit(a.querySelector(".letter-grade").value);
    const bGrade = gradeToCredit(b.querySelector(".letter-grade").value);
    if (order === "desc") {
      return bGrade - aGrade;
    } else {
      return aGrade - bGrade;
    }
  });

  const formContainer = document.querySelector(".subject-container");
  formContainer.innerHTML = "";
  sortItems.forEach((item) => formContainer.appendChild(item));
  unsortItems.forEach((item) => formContainer.appendChild(item));
}

function updateContainerHeight() {
  // 找到一個實際顯示的 subject-entry，而不是模板
  const visibleEntry = document.querySelector(
    ".subject-entry:not(.subject-entry-template)"
  );
  if (!visibleEntry) return;

  // 計算實際高度（包含 margin）
  const style = window.getComputedStyle(visibleEntry);
  const height =
    visibleEntry.offsetHeight +
    parseFloat(style.marginTop) +
    parseFloat(style.marginBottom);

  // 設定 CSS 變數為 3 倍高度
  document.documentElement.style.setProperty("--entry-height", `${height}px`);
}

// 在 DOM 載入後執行
document.addEventListener("DOMContentLoaded", updateContainerHeight);
// 在視窗大小改變時重新計算
window.addEventListener("resize", updateContainerHeight);
