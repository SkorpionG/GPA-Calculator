import { loadLanguagePreference, updateDisplayedText } from "../languages.js";

class SiteHeader extends HTMLElement {
    connectedCallback() {
        const filename = window.location.pathname.split("/").pop() || "index.html";

        this.innerHTML = `
            <header>
                <nav>
                    <ul>
                        <li>
                            <a id="home-link" href="./index.html"${filename === "index.html" ? ' class="active"' : ""}>Home</a>
                        </li>
                        <li>
                            <a id="grade-analysis-link" href="./grade-calculator.html"${filename === "grade-calculator.html" ? ' class="active"' : ""}>Grade Analysis</a>
                        </li>
                        <li>
                            <a id="about-link" href="./about.html"${filename === "about.html" ? ' class="active"' : ""}>About</a>
                        </li>
                        <li class="language-selector">
                            <select id="language-select" title="Change Language">
                                <option value="zh-tw">繁體中文</option>
                                <option value="en">English</option>
                            </select>
                        </li>
                    </ul>
                </nav>
            </header>
        `;

        const savedLang = loadLanguagePreference();
        const langSelect = this.querySelector("#language-select");
        if (langSelect) {
            langSelect.value = savedLang;
            langSelect.addEventListener("change", (e) => {
                updateDisplayedText(e.target.value);
            });
        }

        updateDisplayedText(savedLang);
    }
}

customElements.define("site-header", SiteHeader);
