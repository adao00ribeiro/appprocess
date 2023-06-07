import './../styles/globals.css'
import React, { useState } from 'react'
import { AuthProvider } from '../context/AuthContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function App({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider >
  )
}
