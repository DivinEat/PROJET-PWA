import { LitElement, html, css } from 'lit';

import Base from '../Base.js';

import {  } from '../firebase.js';

class FireRoom extends Base {

  static get properties() {
    return {
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
    this.message = '';
    this.messages = [];
  }

  firstUpdated() {
    
  }

  handleForm(e) {
    e.preventDefault();
  }

  render() {
    return html`
      <main>
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

customElements.define('fire-room', FireRoom);
