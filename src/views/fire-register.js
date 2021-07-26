import {LitElement, html, css} from "lit";
import Base from "../Base.js";

class FireRegister extends Base {
    static get styles() {
        return css`
      :host {
        display: block;
      }
    `;
    }

    static get properties() {
        return {
            email: {
                type: String,
                state: true,
            },
            password: {
                type: String,
                state: true,
            },
        };
    }

    constructor() {
        super();
        this.email = "";
        this.password = "";
    }

    register(e) {
        e.preventDefault();
        this.dispatchEvent(
            new CustomEvent("register", {
                detail: {
                    email: this.email,
                    password: this.password,
                },
            })
        );
    }

    render() {
        return html`
            <div class="w-full max-w-xs" style="margin:auto; margin-top:5em;">
                <form @submit="${this.register}" class="px-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input .value="${this.email}"
                               @input="${(e) => (this.email = e.target.value)}"
                               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               id="username" type="text" placeholder="Username">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input .value="${this.password}"
                               @input="${(e) => (this.password = e.target.value)}"
                               class="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                               id="password" type="password" placeholder="******************">
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        `;
    }
}

customElements.define("fire-register", FireRegister);
