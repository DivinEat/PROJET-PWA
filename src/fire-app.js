import { LitElement, html, css } from "lit";
import page from "page";
import Base from "./Base.js";


import {
  subscribeList,
  subscribeDoc,
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
      docs: {
        type: Array,
        state: true,
      },
      doc: {
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
    this.docs = [];
    this.doc = {};

    document.addEventListener("page-changed", ({ detail }) => {
      this.page = detail.name;
    });
  }

  firstUpdated() {
    this.page = document.$route.name;
  }

  handleCreateDoc({ detail }) {
    const id = pushData("/docs", detail);
    page(`/${id}`);
  }

  handleCreateMessage({ detail }) {
    const id = document.$route.params.docId;
    appendData(`/messages/${id}`, detail);
  }

  handleUpdateDoc({ detail }) {
    const id = document.$route.params.docId;
    setData(`/docs/${id}`, detail);
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
        subscribeList("/docs", (docs) => {
          this.docs = docs;
        });
        return this.getListPage();
      case "doc":
        this.doc = null;
        subscribeDoc(
          `/doc/${document.$route.params.docId}`,
          (doc) => {
            console.log("doc");
            console.log(doc);
            this.doc = doc;
          }
        );
        return this.getDocPage();
      case "register":
        return this.getRegisterPage();
      case "login":
        return this.getLoginPage();
      default:
        subscribeList("/docs", (docs) => {
          this.docs = docs;
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
      .docs="${this.docs}"
      @create-doc=${this.handleCreateDoc}
    ></fire-list>`;
  }

  getDocPage() {
    return html` <fire-doc
      .doc="${this.doc}"
      @create-message=${this.handleUpdateDoc}
    ></fire-doc>`;
  }

  displayReturn() {
    return this.page === "doc";
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
