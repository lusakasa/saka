export function applyTheme(themeName) {
  const html = document.querySelector("html");
  html.setAttribute("data-theme", themeName);
}
