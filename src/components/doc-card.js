import {html, css} from "lit";

import Base from "../Base";

class DocCard extends Base {
    static get styles() {
        return css`
      :host {
        display: block;
      }
    `;
    }

    static get properties() {
        return {
            doc: Object,
        };
    }

    constructor() {
        super();
        this.doc = {};
    }

    removeDoc(e) {
        e.preventDefault();

        this.dispatchEvent(
            new CustomEvent("remove-doc", {detail: this.doc})
        );
    }


    render() {
        return html`
            <div>
                <a
                        class="no-underline flex items-center justify-between bg-blue-300 rounded-lg px-3 py-6 text-white"
                        href="/${this.doc.key}"
                >
                    <h1 class="text-lg font-medium">${this.doc.val().name}</h1>
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
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </a>
            </div>
        `;
    }
}

customElements.define("doc-card", DocCard);
