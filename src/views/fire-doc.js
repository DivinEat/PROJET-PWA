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
            message: {
                type: String,
                state: true
            },
            messages: {
                type: Array
            },
        };
    }

    constructor() {
        super();
        this.doc = {};
        this.editor = null;
        this.caret = { pos: 0 };
        let timeout = null;
        this.message = '';
        this.messages = [];
    }

    firstUpdated() {
        this.editor = init({
            element: this.querySelector('#editor'),
            onChange: html => {
                this.saveDoc(html);
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

    saveDoc(html) {
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

    handleForm(e) {
        e.preventDefault();
        if (!this.message) return;
        this.dispatchEvent(new CustomEvent('create-message', {
            detail: {
                message: this.message,
                createdAt: Date.now()
            }
        }))

        this.message = '';
    }

    render() {
        return html`
            <main>
                <div id="editor" class="pell"></div>
                
                <h1 class="text-center m-5">Messages</h1>
                <ul>
                    ${this.messages.map(message => html`<li><span>${message.val().message}</span></li>`)}
                </ul>
            </main>
            <footer class="h-16 bg-gray-300 fixed bottom-0 inset-x-0">
                <form @submit="${this.handleForm}" id="addTodo" class="w-full h-full flex justify-between items-center px-4 py-3">
                    <label class="flex-1" aria-label="Add todo input">
                        <input
                                autocomplete="off"
                                .value="${this.message}"
                                @input="${e => this.message = e.target.value}"
                                class="py-3 px-4 rounded-sm w-full h-full"
                                type="text"
                                placeholder="Enter a new message ..."
                                name="message">
                    </label>
                    <button
                            aria-label="Add"
                            class="ml-4 rounded-lg text-uppercase bg-blue-400 h-full text-center px-3 uppercase text-white font-bold flex justify-center items-center"
                            type="submit">Add</button>
                </form>
            </footer>
        `;
    }
}

customElements.define("fire-doc", FireDoc);
