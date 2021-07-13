import { LitElement, html, css } from "lit";
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
    return {};
  }

  constructor() {
    super();
  }

  render() {
    console.log(firebase.auth());
    return html`
      <ul class="flex">
        ${firebase.auth().currentUser
          ? html` <li class="mr-6">
                <a class="text-blue-500 hover:text-blue-800" href="/login"
                  >Login</a
                >
              </li>
              <li class="mr-6">
                <a class="text-blue-500 hover:text-blue-800" href="/register"
                  >Register</a
                >
              </li>`
          : html`<li class="mr-6">
              <a class="text-blue-500 hover:text-blue-800" href="/logout"
                >Logout</a
              >
            </li>`}
      </ul>
    `;
  }
}

customElements.define("auth-nav", AuthNav);
