import { LitElement, html, css } from "lit";

import Base from "../Base.js";

import {} from "../firebase.js";

class FireDoc extends Base {
  static get properties() {
    return {
      doc: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.doc = {};
  }

  handleForm(e) {
    e.preventDefault();

    const content = document.getElementById('content').value;
    this.doc.content = content;

    this.dispatchEvent(
        new CustomEvent("create-doc", {
          detail: this.doc,
        })
    );
  }

  render() {
    return html`
      <main>
        <form @submit="${this.handleForm}" id="doc-form">
          <tinymce-editor api-key="9s7bb5gzs4o95vlvmekvp2acp19hf9p0zfcp4441fkft2tiw" 
                          setup="setupEditor" height="500">${this.doc.content}
          </tinymce-editor>
          
          <footer class="h-16 bg-gray-300 fixed bottom-0 inset-x-0">
            <button
                aria-label="Add"
                class="ml-4 rounded-lg text-uppercase bg-blue-400 h-full text-center px-3 uppercase text-white font-bold flex justify-center items-center"
                type="submit"
            >
              Save
            </button>
          </footer>
        </form>
      </main>
    `;
  }
}

customElements.define("fire-doc", FireDoc);
