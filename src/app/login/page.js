// app/login/page.js
'use client'; // ¡Importante! Marca este componente como un "Client Component"

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Obtiene la ruta original a la que el usuario quería ir (si existe)
  const redirectPath = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpia cualquier error anterior

    // Envía la contraseña a tu API Route para verificar
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      // Si la contraseña es correcta, redirige al usuario
      router.push(redirectPath);
    } else {
      // Si la contraseña es incorrecta, muestra un mensaje de error
      setError('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Acceso Restringido</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label htmlFor="password" style={{ fontSize: '1.1em', color: '#555' }}>Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '1em' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1em', transition: 'background-color 0.3s ease' }}>
          Acceder
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{error}</p>}
    </div>
  );
}