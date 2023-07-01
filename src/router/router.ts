import getPage from "./getPage";
import renderPage from "./renderPage";

document.addEventListener("DOMContentLoaded", () => {
  renderPage(getPage());
});
