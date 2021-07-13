import { LitElement } from "https://cdn.skypack.dev/lit";

export default class Base extends LitElement {
  constructor() {
    super();
    this.$route = window.$route;
  }

  static get properties() {
    return {
      $route: {
        type: Object,
        state: true,
      },
    };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <ul class="flex">
        <li class="mr-6">
          <a class="text-blue-500 hover:text-blue-800" href="#">Active</a>
        </li>
        <li class="mr-6">
          <a class="text-blue-500 hover:text-blue-800" href="#">Link</a>
        </li>
        <li class="mr-6">
          <a class="text-blue-500 hover:text-blue-800" href="#">Link</a>
        </li>
      </ul>
    `;
  }
}
