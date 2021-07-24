import { LitElement, html, css } from "lit";

import Base from "../Base.js";

import {} from "../firebase.js";

class FireDoc extends Base {
  static get properties() {
    return {
      message: {
        type: String,
        state: true,
      },
      messages: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.message = "";
    this.messages = [];
  }

  firstUpdated() {}

  handleForm(e) {
    e.preventDefault();

    console.log(e);

    console.log(this.message);

    // if (!this.message) return;
    // this.dispatchEvent(
    //   new CustomEvent("create-message", {
    //     detail: {
    //       message: this.message,
    //     },
    //   })
    // );

    // this.message = "";
  }

  render() {
    return html`
      <main>
        <ul>
          ${this.messages.map(
            (message) => html`<li><span>${message.val().message}</span></li>`
          )}
        </ul>

        <form @submit="${this.handleForm}">
          <tinymce-editor
            api-key="9s7bb5gzs4o95vlvmekvp2acp19hf9p0zfcp4441fkft2tiw"
          >
          </tinymce-editor>
          <button
            aria-label="Add"
            class="ml-4 rounded-lg text-uppercase bg-blue-400 h-full text-center px-3 uppercase text-white font-bold flex justify-center items-center"
            type="submit"
          >
            Save
          </button>
        </form>
      </main>

      <footer class="h-16 bg-gray-300 fixed bottom-0 inset-x-0">
        <form
          @submit="${this.handleForm}"
          id="addTodo"
          class="w-full h-full flex justify-between items-center px-4 py-3"
        >
          <label class="flex-1" aria-label="Add todo input">
            <input
              autocomplete="off"
              .value="${this.message}"
              @input="${(e) => (this.message = e.target.value)}"
              class="py-3 px-4 rounded-sm w-full h-full"
              type="text"
              placeholder="Enter a new message ..."
              name="message"
            />
          </label>
          <button
            aria-label="Add"
            class="ml-4 rounded-lg text-uppercase bg-blue-400 h-full text-center px-3 uppercase text-white font-bold flex justify-center items-center"
            type="submit"
          >
            Add
          </button>
        </form>
      </footer>
    `;
  }
}

customElements.define("fire-doc", FireDoc);
