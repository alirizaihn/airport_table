import logo from "./logo.svg";
import "./App.css";
import React, { Suspense, lazy } from "react";
import Toast from "./components/toast/Toast";
import {BrowserRouter } from "react-router-dom"
const Dashboard = lazy(() => import("./views/Dashboard"));

function App() {
  
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
        <Dashboard />
        </BrowserRouter>
      </Suspense>
      <Toast />
    </div>
  );
}

export default App;
