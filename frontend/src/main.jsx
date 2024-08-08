import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./components/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketContextProvider } from "./socketClient/SocketContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        <Toaster
          toastOptions={{
            className: "",
          }}
        />
      </SocketContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
