import App from 'app';
import React from 'react'
import ReactDOM from 'react-dom/client'

import bridge from "@vkontakte/vk-bridge";

import 'index.css'

// import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const elem = window.parent.document.write('1111111111111111111111')
// .querySelector<HTMLElement>('.vkAppHeader')!
// if (elem?.style)
//   elem.style.display = 'none !important'

bridge.send("VKWebAppInit");

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals();
