import page from "page";
import { initFirebase, disconnectUser } from "./firebase";

initFirebase();

page("/", (ctx) => {
  ctx.name = "list";
  document.$route = ctx;
  document.dispatchEvent(new CustomEvent("page-changed", { detail: ctx }));
  import("./views/fire-list.js");
});

page("/register", (ctx) => {
  ctx.name = "register";
  document.$route = ctx;
  document.dispatchEvent(new CustomEvent("page-changed", { detail: ctx }));
  import("./views/fire-register.js");
});

page("/login", (ctx) => {
  ctx.name = "login";
  document.$route = ctx;
  document.dispatchEvent(new CustomEvent("page-changed", { detail: ctx }));
  import("./views/fire-login.js");
});

page("/logout", (ctx) => {
  ctx.name = "logout";
  document.$route = ctx;
  document.dispatchEvent(new CustomEvent("page-changed", { detail: ctx }));
  disconnectUser();
});

page("/:roomId", (ctx) => {
  ctx.name = "room";
  document.$route = ctx;
  document.dispatchEvent(new CustomEvent("page-changed", { detail: ctx }));
  import("./views/fire-room.js");
});

page();
