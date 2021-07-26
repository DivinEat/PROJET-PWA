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
            networkState: {
                type: Boolean,
            },
        };
    }

    constructor() {
        super();
        this.networkState = true;
    }

    turnNetwork(e) {
        e.preventDefault();
        this.networkState ?
            firebase.firestore().disableNetwork()
                .then(() => {
                    this.networkState = false;
                })
            :
            firebase.firestore().enableNetwork()
                .then(() => {
                    this.networkState = true;
                });

        const connectedRef = firebase.database().ref(".info/connected");
        connectedRef.on("value", (snap) => {
            if (snap.val() === true) {
                console.log("connected");
            } else {
                console.log("not connected");
            }
        });
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
                ${this.networkState
                        ? html`
                            <li class="mr-6">
                                <button @click="${this.turnNetwork}">Network Off</button>
                            </li>`
                        : html`
                            <li class="mr-6">
                                <button @click="${this.turnNetwork}">Network On</button>
                            </li>`
                }

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