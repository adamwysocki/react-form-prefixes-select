# react-form-prefixes-select

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[ ![Codeship Status for adamwysocki/react-form-prefixes-select](https://app.codeship.com/projects/7e50f6c0-ce37-0135-45f5-6e332806be22/status?branch=master)](https://app.codeship.com/projects/262145)

A React select component that displays name prefixes (Mr, Mrs, Ms) for react forms and fires a callback when a new one is selected.

## Installation

```sh
yarn add react-form-prefixes-select

- or -

npm install react-form-prefixes-select
```

## Usage

1 . Require react-form-prefixes-select after installation

```js
import PrefixesSelect from "react-form-prefixes-select";
```

2 . Include react-form-prefixes-select component

```js
onPrefixSelect = (event, prefix) => {
    // event {SyntheticEvent<HTMLSelectElement>} - React HTML event
    // prefix {Object} - Object representing the prefix
    // prefix.label {string} - The display label of the selected prefix
    // prefix.code {string} - The two or three letter abbreviation of the prefix (unique to the collection)
}

<PrefixesSelect onChange={this.onPrefixSelect} />
```

## Parameters

| Parameter         | Type       | Description                                                                                                                          |
| :---------------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| onChange          | `function` | Callback with the selected prefix. Parameters are the HTML event and an object with the format { label: 'Mrs', code: 'MRS' }         |
| defaultOptionText | `string`   | The label to display for the default/unselected option. A user selecting this option will not fire the callback. (default: "Prefix") |
| hasDefaultOption  | `boolean`  | Toggle the default option on or off (default: true)                                                                                  |
| style             | `Object`   | Javascript object with camelCased CSS properties rather than a CSS string. Standard React styles                                     |
| className         | `string`   | A CSS class name. The presence of this attribute will override all default styles. So it's all or none                               |
| common            | `boolean`  | If present, the select will only contain the most common prefixes (Dr, Mr, Mrs, Miss). If not present, display all prefixes.         |

## Build

```js
yarn run build
npm run build
```

## Test

```js
yarn run test
npm run test
```

## Lint

```js
yarn run lint
npm run lint
```

## Flow

```js
yarn run flow
npm run flow
```

## License

MIT
