import { LitElement, html, css } from "lit";

import page from "page";

import Base from "../Base";
import "../components/doc-card.js";

class FireList extends Base {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      docName: {
        type: Array,
        state: true,
      },
      docs: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.docName = "";
    this.docs = [];
  }

  createDoc(e) {
    e.preventDefault();
    if (!this.docName) return;
    this.dispatchEvent(
      new CustomEvent("create-doc", {
        detail: {
          name: this.docName,
          createdAt: Date.now(),
        },
      })
    );

    this.docName = "";
  }

  render() {
    return html`
      <section>
        <header class="px-4 py-4">
          <form @submit="${this.createDoc}" class="h-8 flex items-center">
            <label class="flex-1" aria-label="Add todo input">
              <input
                autocomplete="off"
                .value="${this.docName}"
                @input="${(e) => (this.docName = e.target.value)}"
                class="py-3 px-4 rounded-sm w-full h-full outline-none border-b-2"
                type="text"
                placeholder="Create a new google doc ..."
                name="Doc name"
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
        </header>
        <main class="mt-4 px-4">
          <ul class="space-y-4">
            ${this.docs.map(
              (doc) => html` <li><doc-card .doc="${doc}"></doc-card></li> `
            )}
          </ul>
        </main>
      </section>
    `;
  }
}

customElements.define("fire-list", FireList);
