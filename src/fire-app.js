import { LitElement, html, css } from "lit";
import page from "page";
import Base from "./Base.js";

import {
  subscribeList,
  pushData,
  setData,
  createUser,
  connectUser,
  disconnectUser,
  appendData,
} from "./firebase.js";

class FireApp extends Base {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        state: true,
      },
      rooms: {
        type: Array,
        state: true,
      },
      room: {
        type: Object,
        state: true,
      },
      messages: {
        type: Array,
        state: true,
      },
    };
  }

  constructor() {
    super();
    this.messages = [];
    this.rooms = [];
    this.room = {};

    document.addEventListener("page-changed", ({ detail }) => {
      this.page = detail.name;
    });
  }

  firstUpdated() {
    this.page = document.$route.name;
  }

  handleCreateRoom({ detail }) {
    console.log(detail);
    const id = pushData("/rooms", detail);
    setData(`/messages/${id}`, [{ message: "Plop is the new plop" }]);
    page(`/${id}`);
  }

  handleCreateMessage({ detail }) {
    console.log(detail);
    const id = document.$route.params.roomId;
    appendData(`/messages/${id}`, detail);
  }

  register({ detail }) {
    const { email, password } = detail;
    createUser(email, password);
  }

  login({ detail }) {
    const { email, password } = detail;
    connectUser(email, password);
  }

  displayPage() {
    switch (this.page) {
      case "list":
        subscribeList("/rooms", (rooms) => {
          this.rooms = rooms;
        });
        return this.getListPage();
      case "room":
        this.messages = [];
        subscribeList(
          `/messages/${document.$route.params.roomId}`,
          (message) => {
            this.messages = message;
          }
        );
        return this.getRoomPage();
      case "register":
        return this.getRegisterPage();
      case "login":
        return this.getLoginPage();
      default:
        subscribeList("/rooms", (rooms) => {
          this.rooms = rooms;
        });
        return this.getListPage();
    }
  }

  getRegisterPage() {
    return html`<fire-register @register="${this.register}"></fire-register>`;
  }

  getLoginPage() {
    return html`<fire-login @login="${this.login}"></fire-login>`;
  }

  getListPage() {
    return html` <fire-list
      .rooms="${this.rooms}"
      @create-room=${this.handleCreateRoom}
    ></fire-list>`;
  }

  getRoomPage() {
    return html` <fire-room
      .room="${this.room}"
      .messages="${this.messages}"
      @create-message=${this.handleCreateMessage}
    ></fire-room>`;
  }

  displayReturn() {
    return this.page === "room";
  }

  goBack() {
    page("/");
  }

  render() {
    return html`
      ${this.displayReturn()
        ? html`<button
            class="absolute h-12 left-2 top-0 z-10 text-white"
            @click="${this.goBack}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>`
        : null}
      ${this.displayPage()}
    `;
  }
}

customElements.define("fire-app", FireApp);
