## How to create and configure a project using vite

1. npm create vite@latest
2. npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev
3. create a new file named ".eslintrc.json" and inside this file put the f.f
   {
   "extends": "react-app"
   }
4. Config vite.config.js
   import eslint from "vite-plugin-eslint"
   And add to the plugin key eslint() as the second value.
   plugins: [react(), eslint()]

   Now, the project is created and eslint set-up is completed

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
