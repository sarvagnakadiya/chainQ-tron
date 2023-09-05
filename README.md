# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```
chainq-tron-cw-vite - Copy
├─ .eslintrc.cjs
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ APIs
│  │  └─ apis.js
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ Arrow.png
│  │  ├─ covalent-logo.jpg
│  │  ├─ delete.png
│  │  ├─ favicon.png
│  │  ├─ hero.png
│  │  ├─ left-arrow.png
│  │  ├─ logo.png
│  │  ├─ react.svg
│  │  ├─ right-up.png
│  │  ├─ search.png
│  │  ├─ send.png
│  │  └─ user.jpg
│  ├─ components
│  │  ├─ ChatLog.jsx
│  │  ├─ ConnectWalletButton.jsx
│  │  ├─ CovalentAPIs.jsx
│  │  ├─ EmptyComponent.jsx
│  │  ├─ Home.jsx
│  │  ├─ MainDashboard.jsx
│  │  ├─ MessageHistory.jsx
│  │  ├─ Navbar.jsx
│  │  └─ Popup.jsx
│  ├─ ConnectWallet.css
│  ├─ ConnectWallet.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ styles
│  │  ├─ ConnectButtonCustom.css
│  │  ├─ CovalentAPIs.css
│  │  ├─ main.scss
│  │  └─ Popup.css
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```