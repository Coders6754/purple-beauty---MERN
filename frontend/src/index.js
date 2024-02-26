import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Utils/Auth";
import { store } from "./store";
import { Provider } from "react-redux";
import ThemeContextProvider from './Utils/ThemeContext/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeContextProvider>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </ThemeContextProvider>
);
reportWebVitals();