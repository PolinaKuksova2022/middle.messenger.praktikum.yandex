import { Modal } from "../component/modal";

let show = false;
const app = document.getElementById("app");

export function toggleModal() {
  show = !show;
  if (show) {
    let article = document.createElement("article");
    article.className = "modal";
    article.id = "modalData";
    article.innerHTML = Modal();
    app.append(article);
  } else {
    const modalData = document.getElementById("modalData");
    app.removeChild(modalData);
  }
}
