import { Auth } from "../pages/Auth";
import { Registration } from "../pages/Registration";
import { Profile } from "../pages/Profile";
import { Chats } from "../pages/Chats";
import { Main } from "../pages/Main";
import { Error404 } from "../pages/Error404";
import { Error500 } from "../pages/Error500";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#main");

  function getPage() {
    switch (window.location.pathname) {
      case "/auth":
        return Auth();
      case "/registration":
        return Registration();
      case "/profile":
        return Profile();
      case "/chat":
        return Chats();
      case "/internal-server-error":
        return Error500();
      case "/":
        return Main();
      default:
        return Error404();
    }
  }
  root.innerHTML = getPage();
});
