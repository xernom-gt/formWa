import React from 'react';
import './App.css';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Hubungi Kami</h1>
        <p>Silakan isi form di bawah ini untuk menghubungi kami via WhatsApp.</p>
      </header>
      <main>
        <ContactForm />
      </main>
    </div>
  );
}

export default App;
