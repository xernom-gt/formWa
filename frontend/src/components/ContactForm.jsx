import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    keperluan: 'Freelance',
    pesan: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(', ');
          throw new Error(errorMessages || data.message || 'Terjadi kesalahan saat mengirim form');
        }
        throw new Error(data.message || 'Terjadi kesalahan saat mengirim form');
      }

      setStatus({ loading: false, error: null, success: true });
      
      window.open(data.link_wa, '_blank');
      
      setFormData({
        nama: '',
        email: '',
        keperluan: 'Freelance',
        pesan: ''
      });
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: false });
    }
  };

  return (
    <div className="form-card">
      {status.error && (
        <div className="alert alert-error">
          {status.error}
        </div>
      )}
      
      {status.success && (
        <div className="alert alert-success">
          Pesan berhasil disiapkan! Mengarahkan ke WhatsApp...
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="nama">Nama Lengkap</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan nama Anda"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan alamat email Anda"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="keperluan">Keperluan</label>
          <select
            id="keperluan"
            name="keperluan"
            value={formData.keperluan}
            onChange={handleChange}
            required
          >
            <option value="Freelance">Project Freelance</option>
            <option value="Kerja Sama">Kerja Sama Bisnis</option>
            <option value="Konsultasi">Konsultasi IT</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="pesan">Pesan</label>
          <textarea
            id="pesan"
            name="pesan"
            value={formData.pesan}
            onChange={handleChange}
            placeholder="Tuliskan pesan Anda di sini..."
            rows="5"
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={status.loading}
        >
          {status.loading ? (
            <span className="loader-text">Memproses...</span>
          ) : (
            <span className="btn-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-wa">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Kirim via WhatsApp
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
