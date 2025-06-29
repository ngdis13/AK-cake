import { useState } from 'react';

import './scss/app.scss';

import Header from './components/Header.js';
import Home from './pages/Home.js';
import Cart from './pages/Cart.js';
import NotFound from './pages/NotFound.tsx';
import FullCakes from './pages/FullCakes.tsx';

import MainLayout from './layout/MainLayout.tsx';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cake/:id" element={<FullCakes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
