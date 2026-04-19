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
import Shop from './components/Shop';
import ProductPage from './components/ProductPage';
import BottleExperience from './components/BottleExperience';
import RitualSection from './components/RitualSection';
import OceanVisionSection from './components/OceanVisionSection';
import FAQSection from './components/FAQSection';
import StartRitual from './components/StartRitual';
import RitualOfMaking from './components/RitualOfMaking';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import ReturnPolicy from './components/ReturnPolicy';
import DisclaimerPage from './components/DisclaimerPage';
import ShippingPolicy from './components/ShippingPolicy';
import SafetyInstructions from './components/SafetyInstructions';
import IngredientsPage from './components/IngredientsPage';
import FAQPage from './components/FAQPage';
import Blogs from './components/Blogs';
import RitualPage from './components/RitualPage';
import PaymentPage from './components/PaymentPage';
import OrdersPage from './components/OrdersPage';
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
              <RitualSection />
              <BottleExperience />
              {/* <ProductGrid id="new-energies" title="Essential Rituals" products={newEnergies} /> */}
              {/* <FAQSection /> */}
              <Founder />
              <RitualOfMaking />
              <StartRitual />
              {/* <Testimonials /> */}
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/ritual" element={<RitualPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/safety-instructions" element={<SafetyInstructions />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <OrdersPage />
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
