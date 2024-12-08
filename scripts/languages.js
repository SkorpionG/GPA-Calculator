const LANGUAGE_STORAGE_KEY = "preferredLanguage";
const DEFAULT_LANGUAGE = "zh-tw";

export const languageFontFamily = {
  en: '"Baloo 2", cursive',
  "zh-tw": "Arial, Helvetica, sans-serif",
};

export function updateFontFamily(languageCode) {
  const languageFont = languageFontFamily[languageCode];
  if (!languageFont) {
    console.warn(`未找到語言 ${languageCode} 的字型設定`);
    return;
  }
  document.body.style.fontFamily = languageFont;
}

export const languageOptions = [
  {
    lang: "en",
    text: "English",
  },
  {
    lang: "zh-tw",
    text: "繁體中文",
  },
];

export const displayText = {
  websiteTitle: {
    id: "website-title",
    target: "innerHTML",
    text: {
      en: "GPA Calculator - Grade Calculation Website",
      "zh-tw": "GPA 計算機 - 成績計算網站",
    },
  },
  homeLink: {
    id: "home-link",
    target: "innerHTML",
    text: {
      en: "Home",
      "zh-tw": "首頁",
    },
  },
  aboutLink: {
    id: "about-link",
    target: "innerHTML",
    text: {
      en: "About",
      "zh-tw": "關於",
    },
  },
  gradeAnalysisLink: {
    id: "grade-analysis-link",
    target: "innerHTML",
    text: {
      en: "Grade Analysis",
      "zh-tw": "成績分析",
    },
  },
  termsOfServiceLink: {
    id: "terms-of-service-link",
    target: "innerHTML",
    text: {
      en: "Terms of Service",
      "zh-tw": "服務條款",
    },
  },
  mainHeading: {
    id: "main-heading",
    target: "innerHTML",
    text: {
      en: "GPA Calculator",
      "zh-tw": "GPA 計算機",
    },
  },
  languageSelect: {
    id: "language-select",
    target: "title",
    text: {
      en: "Change Language",
      "zh-tw": "更改語言",
    },
  },
  sortButtonAscText: {
    id: "sort-button-asc-text",
    target: "innerHTML",
    text: {
      en: "Sort Ascending",
      "zh-tw": "升序排列",
    },
  },
  sortButtonDescText: {
    id: "sort-button-desc-text",
    target: "innerHTML",
    text: {
      en: "Sort Descending",
      "zh-tw": "降序排序",
    },
  },
  addButton: {
    id: "add-button",
    target: "title",
    text: {
      en: "Add Subject",
      "zh-tw": "新增科目",
    },
  },
  gpaText: {
    id: "gpa-text",
    target: "innerHTML",
    text: {
      en: "Your semester<br />GPA is</span>",
      "zh-tw": "您的學期<br />GPA 為</span>",
    },
  },
  toggleLabelText: {
    id: "toggle-label-text",
    target: "innerHTML",
    text: {
      en: "opening animation",
      "zh-tw": "開場動畫",
    },
  },
  animationToggle: {
    id: "animation-toggle",
    target: "title",
    text: {
      en: "Hide/Show Opening Animation",
      "zh-tw": "隱藏/顯示開場動畫",
    },
  },
};

export const toggleLabelStatus = {
  id: "toggle-label-status",
  target: "innerHTML",
  showStatusText: {
    en: "Show ",
    "zh-tw": "顯示",
  },
  hideStatusText: {
    en: "Hide ",
    "zh-tw": "隱藏",
  },
};

/**
 * 儲存使用者的語言偏好設定
 * @param {string} languageCode - 語言代碼 (例如: 'en', 'zh-tw')
 */
export function saveLanguagePreference(languageCode) {
  try {
    // 確認語言代碼有效
    if (!languageOptions.some((option) => option.lang === languageCode)) {
      throw new Error(`不支援的語言代碼: ${languageCode}`);
    }
    localStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
  } catch (error) {
    console.error("儲存語言偏好時發生錯誤:", error);
  }
}

/**
 * 讀取使用者的語言偏好設定
 * @returns {string} 語言代碼，如果沒有有效的設定則回傳預設語言
 */
export function loadLanguagePreference() {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    // 檢查儲存的語言是否有效
    if (
      savedLanguage &&
      languageOptions.some((option) => option.lang === savedLanguage)
    ) {
      return savedLanguage;
    }
  } catch (error) {
    console.error("讀取語言偏好時發生錯誤:", error);
  }
  return DEFAULT_LANGUAGE;
}

/**
 * 更新網站所有顯示文字的語言
 * @param {string} targetLang - 目標語言代碼 (en 或 zh-tw)
 */
export function updateDisplayedText(targetLang) {
  // 確認目標語言是否有效
  if (!languageOptions.some((option) => option.lang === targetLang)) {
    console.error(`不支援的語言: ${targetLang}`);
    return;
  }

  // 遍歷所有需要更新的文字
  Object.entries(displayText).forEach(([_, config]) => {
    const element = document.getElementById(config.id);
    if (!element) {
      console.warn(`找不到元素: ${config.id}`);
      return;
    }

    // 根據配置更新元素的目標屬性
    const targetText = config.text[targetLang];
    if (targetText) {
      element[config.target] = targetText;
    } else {
      console.warn(`找不到 ${targetLang} 的翻譯文字: ${config.id}`);
    }
  });

  updateFontFamily(targetLang);
  saveLanguagePreference(targetLang);
}
