import React from 'react';
import AdminPanel from './components/admin/panel';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
