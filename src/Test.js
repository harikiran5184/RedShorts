import React from 'react';
import CryptoJS from 'crypto-js';

// Encryption function
function encryptData(data, key) {
  const encrypted = CryptoJS.AES.encrypt(data, key).toString();
  return encrypted;
}

// Decryption function
function decryptData(encryptedData, key) {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
  return decrypted;
}

export default function Test() {
  const data = 'John Doe';
  const key = 'myCustomKey';

  // Encrypt the data
  const encrypted = encryptData(data, key);
  console.log('Encrypted data:', encrypted);

  // Decrypt the data
  const decrypted = decryptData(encrypted, key);
  console.log('Decrypted data:', decrypted);

  return (
    // Your component JSX
    <div>
      {/* Render your component */}
    </div>
  );
}
