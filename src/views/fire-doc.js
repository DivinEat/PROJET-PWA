import {html} from "lit";
import Base from "../Base.js";
import 'pell/dist/pell.css';
import { init } from 'pell'

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
        this.editor = null;
    }

    firstUpdated() {
        let timeout;
        this.editor = init({
            element: this.querySelector('#editor'),
            onChange: html => {
                clearTimeout(timeout);
                timeout = setTimeout(this.handleForm(html), 300);
            },
        })

        this.editor.content.innerHTML = this.doc ? this.doc.content : null;

    }

    handleForm(html) {
        this.doc.content = html;

        this.dispatchEvent(
            new CustomEvent("create-doc", {
                detail: this.doc,
            })
        );
    }

    render() {
        return html`
            <main>
                <div id="editor" class="pell"></div>
            </main>
        `;
    }
}

customElements.define("fire-doc", FireDoc);
