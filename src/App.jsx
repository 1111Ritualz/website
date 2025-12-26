import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AumatrixSection from './components/AumatrixSection';
import ProductGrid from './components/ProductGrid';
import CollectionList from './components/CollectionList';
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
import { products } from './data';

function App() {
  // Filter products for different sections
  const newEnergies = products.filter(p => p.category === 'New Energies').slice(0, 4);
  const mysticMix = products.filter(p => p.category === 'Mystic Mix');

  return (
    <Router>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <AumatrixSection />
              <ProductGrid title="New Energies" products={newEnergies} />
              <ProductGrid title="Mystic Mix Bracelets" products={mysticMix} />
              <CollectionList />
              <div className="section-padding container text-center">
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>ZODIAC MIXEL BRACELET 2026</h2>
                <p>Premium quality gemstones. Loved by soulstars.</p>
                <button className="btn" style={{ marginTop: '2rem' }}>Shop Zodiac Collection</button>
              </div>
              <Founder />
              <Testimonials />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          {/* Add other routes as needed */}
          <Route path="*" element={<div className="container section-padding text-center"><h2>Page Not Found</h2></div>} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
