const themeStylesheet = document.querySelector("#theme-stylesheet");
const themeQuery = window.matchMedia("(prefers-color-scheme: light)");


isLightMode = () => {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return true;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: no-preference)").matches) {
        // console.log(" no-preference");
    }
}

setTheme = () => {
    if (isLightMode()) {
        themeStylesheet.href = "/equation-solver/css/theme/light.css"
        // console.log("light-theme set");
    } else if (!isLightMode()) {
        themeStylesheet.href = "/equation-solver/css/theme/dark.css"
        // console.log("dark-theme set");
    }
}

setTheme();
themeQuery.addEventListener("change", setTheme);