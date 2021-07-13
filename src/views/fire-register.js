import { LitElement, html, css } from "lit";
import Base from "../Base.js";

class FireRegister extends LitElement {
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
      <form @submit="${this.register}" class="px-4">
        <div>
          <input
            class="block w-full"
            type="email"
            .value="${this.email}"
            @input="${(e) => (this.email = e.target.value)}"
          />
        </div>
        <div class="mt-2">
          <input
            class="block w-full"
            type="password"
            .value="${this.password}"
            @input="${(e) => (this.password = e.target.value)}"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    `;
  }
}

customElements.define("fire-register", FireRegister);
