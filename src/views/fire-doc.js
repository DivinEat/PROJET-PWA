import {html} from "lit";
import Base from "../Base.js";
import 'pell/dist/pell.css';
import { init } from 'pell'
import { position } from 'https://cdn.skypack.dev/caret-pos';
import {subscribeDoc} from "../firebase";

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
        this.caret = { pos: 0 };
        let timeout = null;
    }

    firstUpdated() {
        this.editor = init({
            element: this.querySelector('#editor'),
            onChange: html => {
                this.handleForm(html);
            },
        });

        subscribeDoc(
            `/docs/${document.$route.params.docId}`,
            (doc) => {
                this.doc = doc;

                this.editor.content.innerHTML = this.doc ? this.doc.content : null;
                position(this.editor.content, this.caret.pos);
            }
        );

    }

    handleForm(html) {
        const brElements = this.editor.content.querySelectorAll("div > br");
        const newLine = brElements > 0;

        brElements.forEach(function(br) {
            br.parentNode.appendChild(document.createTextNode("\u200c"));
            br.remove();
        });

        this.doc.content = html;
        this.caret.pos = newLine ? position(this.editor.content).pos : position(this.editor.content).pos++;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.dispatchEvent(
            new CustomEvent("create-doc", {
                detail: this.doc,
            })
        ), 300);
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
