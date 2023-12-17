import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import File from "./Components/File";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file" element={<File />} />
      </Routes>
    </>
  );
}

export default App;
