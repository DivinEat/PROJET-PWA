import { LitElement } from 'https://cdn.skypack.dev/lit';

export default class Base extends LitElement {
  constructor() {
    super();
    this.$route = window.$route;
  }

  static get properties() {
    return {
      $route: {
        type: Object,
        state: true
      }
    }
  }

  createRenderRoot() {
    return this;
  }
}
