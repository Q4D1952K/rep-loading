import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./components/App"
import ConfigProvider from "./providers/ConfigProvider"
import LocaleProvider from "./providers/LocaleProvider"

const root = document.getElementById("root")

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <LocaleProvider>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </LocaleProvider>
  </React.StrictMode>
)
