// generate-hash.js
const bcrypt = require('bcryptjs');

// >>>>> ¡¡¡ASEGÚRATE DE CAMBIAR ESTO!!! <<<<<
// Reemplaza 'TU_CONTRASEÑA_SECRETA' con la contraseña real que quieres usar.
const password = '1K540wv22VJ*/a'; // <--- ¡CÁMBIALA AQUÍ!
const saltRounds = 10; // Un número estándar para seguridad

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
    } else {
        console.log('--- COPIA ESTE HASH PARA TU ARCHIVO .env.local ---');
        console.log(hash);
        console.log('--------------------------------------------------');
    }
});