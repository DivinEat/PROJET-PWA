import {html, css} from "lit";
import firebase from "firebase/app";

import Base from "../Base";
import "firebase/auth";

class AuthNav extends Base {
    static get styles() {
        return css`
      :host {
        display: block;
      }
    `;
    }

    static get properties() {
        return {
            user: {
                type: Object,
            },
        };
    }

    constructor() {
        super();
    }

    render() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }
        });

        return html`
            <ul class="flex">
                ${this.user
                    ? html`
                        <li class="mr-6">
                            <a href="/logout">Logout</a>
                        </li>`
                    : html`
                        <li class="mr-6">
                            <a href="/login">Login</a>
                        </li>
                        <li class="mr-6">
                            <a href="/register">Register</a>
                        </li>`
                }
            </ul>
        `;
    }
}

customElements.define("auth-nav", AuthNav);