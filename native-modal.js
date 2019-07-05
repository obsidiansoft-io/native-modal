import { LitElement, css, html } from 'lit-element';
import 'fa-icons';

const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};
class nativeModal extends LitElement {
  static get properties() {
    return {
      active: { type: Boolean },
      style: { type: String },
      device: { type: String },
      title: { type: String },
      hideHeader: { type: Boolean },
      alwaysFullScreen: { type: Boolean }
    };
  }
  static get styles() {
    return css`
      :host {
        will-change: transform;
        transform: translate3d(0, 0, 0);
        transition-property: visibility, transform;
        transition-duration: 0.2s;
        height: 110vh;
      }
      :host([active]) {
        visibility: visible;
        transform: translate3d(0, -100%, 0);
      }
      /**IOS STYLES**/
      .hide-ios {
        visibility: hidden;
        will-change: transform;

        transform: translate3d(0, 100%, 0);
        transition-property: visibility, transform;
        transition-duration: 0.2s;
      }
      .show-ios {
        transition-property: transform;
        transition-duration: 0.2s;
        transform: translate3d(0, 0, 0);
      }
      .ios-cancel {
        color: rgb(0, 122, 255);
        font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
          Roboto;
        font-size: 18;
      }
      /**Android styles**/
      .hide-android {
        visibility: hidden;
        will-change: transform;

        transform: translate3d(150%, 0, 0);
        transition-property: visibility, transform;
        transition-duration: 0.3s;
      }
      .show-android {
        transition-property: transform;
        transition-duration: 0.3s;
        transform: translate3d(0, 0, 0);
      }
      .hide {
        visibility: hidden;
        display: none;
      }
      .show {
        visibility: visible;
        display: inline;
      }
      /**Modal styles**/
      .modal {
        display: inline;
        position: fixed; /* Stay in place */
        z-index: 9999; /* Sit on top */
        left: 0;
        top: 0;
        width: 100vw; /* Full width */
        height: 100vh; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: #fff;
      }
      .full-screen {
        width: 100vw; /* Full width */
        height: 100vh; /* Full height */
      }
      .modal-body {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        width: 100%;
        padding: 1.3em 0;
      }
      .modal-content {
        background-color: #fefefe;
        width: 100%;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        width: 80%; /* Could be more or less, depending on screen size */
      }
      .modal-footer {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        padding: 1rem;
        border-top: 1px solid #e9ecef;
      }
      .modal-header {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        align-content: right;
        justify-content: right;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid #e9ecef;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
      }
      .title-layer {
        z-index: -1;
        position: absolute;
        top: 0px;
        left: 0;
        width: 100vw;
        text-align: center;
        font-family: sans-serif;
        font-weight: bold;
      }
      @media (min-width: 1281px) {
        .modal {
          display: block;
          position: fixed;
          max-width: 800px;
          left: 30%;
          top: 10%;
          text-align: center;
          max-height: 50vh;
        }
        .modal.full-screen {
          max-width: 110vw;
          max-height: 100vh;
          left: 0;
          top: 0;
        }
        .cover {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          position: absolute; /* Stay in place */
          z-index: 1; /* Sit on top */
          left: 0;
          top: 0;
          overflow: none;
        }
      }
      @media (min-width: 768px) {
        .modal {
          width: 100%;
          height: 100%;
          background: #fff;
        }
      }
      @media (min-width: 320px) and (max-width: 480px) {
        .modal {
          width: 100vw;
          height: 100vh;
        }
      }
      @media (min-width: 320px) {
        .modal {
          background: #fff;
        }
      }
    `;
  }
  constructor() {
    super();
    this.device = isIos() ? 'ios' : 'other';
    this.active = false;
    this.hideHeader = false;
    this.alwaysFullScreen = false;
  }
  firstUpdated() {
    addEventListener('toggleNativeModal', e => {
      this.toggleVisible();
      console.log(e);
    });
  }
  toggleVisible() {
    this.active = !this.active;
    this.update();
  }
  render() {
    return this.device === 'ios'
      ? html`
          <span style="${this.style}" @click="${this.toggleVisible}">
            <slot name="btn-action"></slot>
          </span>
          <div
            class="modal ${!this.active ? 'hide-ios' : 'show-ios'} ${this
              .alwaysFullScreen
              ? 'full-screen'
              : ''}"
          >
            ${!this.hideHeader
              ? html`
                  <div class="modal-header">
                    <div class="action-btns">
                      <span @click="${this.toggleVisible}" class="ios-cancel"
                        >Cancel</span
                      >
                    </div>
                  </div>
                `
              : null}
            <slot name="content"></slot>
          </div>
        `
      : html`
          <span style="${this.style}" @click="${this.toggleVisible}">
            <slot name="btn-action"></slot>
          </span>
          <div class="cover ${!this.active ? 'hide' : 'show'}"></div>
          <div
            class="modal ${!this.active
              ? 'hide-android'
              : 'show-android'} ${this.alwaysFullScreen ? 'full-screen' : ''}"
          >
            ${!this.hideHeader
              ? html`
                  <div class="modal-header">
                    <div class="close">
                      <fa-icon
                        class="fas fa-chevron-left"
                        @click="${this.toggleVisible}"
                      ></fa-icon>
                    </div>
                    <div class="title-layer">
                      <h3>${this.title || ''}</h3>
                    </div>
                  </div>
                `
              : null}
            <slot name="content"></slot>
          </div>
        `;
  }
}
window.customElements.define('native-modal', nativeModal);
