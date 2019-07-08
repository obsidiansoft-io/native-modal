# native-modal

Native webcomponent modal  for the [Polymer 3](https://www.polymer-project.org/) with LitElement.

[![license](https://camo.githubusercontent.com/11ad3ffb000cd7668567587af947347c738b6472/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f657870726573732e7376673f7374796c653d666c61742d737175617265266d61784167653d33363030)](http://opensource.org/licenses/MIT)

<img src="https://github.com/obsidiansoft-io/native-modal/blob/master/docs/ios.png?raw=true" width="400"/>

## Installation

```bash
npm i @obsidiansoft/native-modal
```

## Properties

Property | Type | Description
------------ | ------------- | -------------
`title` | String | Header title for the modal
`alwaysFullScreen` (optional) | Boolean | Makes the modal occupy the entire screen in desktop
`style` | String | Styles, must follow the StylesInline standard
`device` | String | Type of devices (must be 'ios' or 'android')
`hideHeader` | Boolean | Hide title header

## Example

```html
  <native-modal title="native modal title"  alwaysFullScreen>
    <div slot="content">
      <button @click="${this.hanldeclic}">close modal</button>
    </div>
    <button slot="btn-action">open modal</button> 
  </native-modal>
```

## Usage with LitElement and slot tag

🚨 We don't advise the use with Polymer Element because it's deprecated.
note: use tag slot for render elemenets into modal, use slot="content" for add elements in the modal body and use slot="btn-action" for add open action in a element (this case is a button element)
```javascript
import { LitElement, html} from 'lit-element';
import '@obsidiansoft/native-modal';

class SomeClass extends LitElement {
 render() {
    return html`
      <native-modal title="native modal title"  alwaysFullScreen>
        <div slot="content">
          modal body here
        </div>
        <button slot="btn-action">open modal</button> 
      </native-modal>
    `;
  }
}

customElements.define('custom-component', SomeClass );
```
## Usage with CustomEvents 
add event 'toggleNativeModal' for open or close modal 
```javascript
import { LitElement, html} from 'lit-element';
import '@obsidiansoft/native-modal';

class SomeClass extends LitElement {
 hanldeclic(e) {
    let myEvent = new CustomEvent('toggleNativeModal', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myEvent);
  }
 render() {
    return html`
      <native-modal title="native modal title"  alwaysFullScreen>
        <div slot="content">
          <button @click="${this.hanldeclic}">close modal</button>
        </div>
        <button slot="btn-action">open modal</button> 
      </native-modal>
    `;
  }
}

customElements.define('custom-component', SomeClass );
```
## Supported Node Versions

We have test it with node >= 10. We will support on even Nodejs versions that are current or in maintenance.

## License

Unless otherwise noted, the fa-icon source files are distributed under the MIT license found in the LICENSE file.

## Sponsorship

Development of the fa-icons is currently sponsored by [ObsidianSoft](https://obsidiansoft.io/) and generously supported by contributions from individuals.

