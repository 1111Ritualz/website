import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Founder from './components/Founder';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Verify from './components/Verify';
import ForgotPassword from './components/ForgotPassword';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import Account from './components/Account';
import Narrative from './components/Narrative';
import Countdown from './components/Countdown';
import { products } from './data';

function App() {
  const [isLaunched, setIsLaunched] = React.useState(
    new Date() >= new Date("2026-03-22T13:00:00Z")
  );

  const newEnergies = products.filter(p => p.category === 'Aura Cleansing');

  return (
    <Router>
      <div className="app">
        {!isLaunched && <Countdown onComplete={() => setIsLaunched(true)} />}
        <Navbar />

        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Narrative />
              <ProductGrid id="new-energies" title="New Energies" products={newEnergies} />
              <Founder />
              {/* <Testimonials /> */}
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path="/readings" element={<Readings />} /> */}
          <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          <Route path="*" element={<div className="container section-padding text-center"><h2>Page Not Found</h2></div>} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
