// app/api/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// ¡Obtén el hash de la contraseña desde tus variables de entorno!
const SECRET_PASSWORD_HASH = process.env.KEY_PASS_HASH;

export async function POST(req) {
  const { password } = await req.json();

  if (!SECRET_PASSWORD_HASH) {
    console.error('Error: KEY_PASS_HASH no está configurado en .env.local. Revisa el Paso 1.');
    return new NextResponse('Error de configuración del servidor. Contraseña hash no definida.', { status: 500 });
  }

  // Compara la contraseña que el usuario escribió con el hash que guardamos
  const isMatch = await bcrypt.compare(password, SECRET_PASSWORD_HASH);

  if (isMatch) {
    // Si la contraseña es correcta, crea una respuesta y agrega la cookie
    const response = NextResponse.json({ message: 'Autenticación exitosa' }, { status: 200 });
    response.cookies.set('authenticated', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax',
    });
    return response;
  } else {
    // Si la contraseña es incorrecta
    return new NextResponse('Contraseña incorrecta', { status: 401 });
  }
}