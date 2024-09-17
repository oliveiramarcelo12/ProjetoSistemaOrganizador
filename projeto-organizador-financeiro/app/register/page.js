'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './register.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

 // RegisterPage.js (frontend)
const handleRegister = async () => {
  if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
  }

  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome: name, email, password }),
  });

  if (response.ok) {
    router.push('/login');
  } else {
    setError('Erro ao registrar');
  }
};


  return (
    <div className="register-container">
      <h1 className="register-title">Registrar</h1>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        className="input-field"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="input-field"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="input-field"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        className="input-field"
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="register-button" onClick={handleRegister}>Registrar</button>
      <p className="login-text">
        Já tem uma conta? <a href="/login" className="login-link">Faça login</a>
      </p>
    </div>
  );
}
