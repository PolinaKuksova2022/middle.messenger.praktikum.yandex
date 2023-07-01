import { Modal } from "../component/modal/modal";

let show = false;
const app = document.getElementById("app");

export function toggleModal() {
  show = !show;
  if (show) {
    let article = document.createElement("article");
    article.className = "modal";
    article.id = "modalData";
    const modal = new Modal( { title: "Загрузите файл", containerClass: "container container_big" });
    // article.innerHTML = modal;
    article.appendChild(modal.getContent()!);
    app!.append(article);
  } else {
    const modalData = document.getElementById("modalData");
    app!.removeChild(modalData!);
  }
}
