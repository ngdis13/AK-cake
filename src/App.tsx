import './scss/app.scss';

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout.tsx';

import Home from './pages/Home.js';

const Cart = React.lazy(() => import('./pages/Cart.js'));
const NotFound = React.lazy(() => import('./pages/NotFound.tsx'));
const FullCakes = React.lazy(() => import('./pages/FullCakes.tsx'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/cake/:id"
          element={
            <Suspense fallback={<div>Идет загрузка</div>}>
              <FullCakes />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идет загрузка</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
