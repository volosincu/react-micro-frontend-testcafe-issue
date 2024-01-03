# react-micro-frontend-example

Investigate issue with React host-remote micro-frontend pattern with Webpack Module Federation and axios-hooks in context of testcafe tests

## How to use

Run the following commands in the root directory.

```bash
npm run start:host
npm run start:remote
npm run start:api
```

Navigate to:

- `http://localhost:3000` for the host app
- `http://localhost:4000` for the remote app
- `http://localhost:7272/feeds/active` for the data stub fetch

## Host App

Pulls `<App/>` and `<Button />` from the remote app and renders them. Example:

```js
const RemoteApp = React.lazy(() => import("Remote/App"));
```

## Remote App

Exposes the modules in a `moduleEntry.js` file at `http://localhost:4000/moduleEntry.js`

`name: 'Remote'`

Exposes:

- `<App />`
- `<Button />`

## Notes

To make this a peer-to-peer pattern you could also expose modules from the Host app and render them in Remote by modifying the host app's webpack config to also expose components and output a `moduleEntry.js` file.
