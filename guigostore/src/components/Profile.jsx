import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './Profile.css'; // Certifique-se de importar o CSS

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const user = auth.currentUser; // Obtendo o usuário atual
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid); // Substitua 'users' pelo nome da sua coleção
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('Nenhum documento encontrado!');
        }
      }
    };

    fetchUserData();
  }, [user, db]);

  return (
    <div className="profile-container">
      <h1>Perfil do Usuário</h1>
      {user ? (
        <div className="user-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Nome Completo:</strong> {userData?.full_name || 'Não disponível'}</p>
          <p><strong>CPF:</strong> {userData?.cpf || 'Não disponível'}</p>
          <p><strong>Cidade:</strong> {userData?.city || 'Não disponível'}</p>
          <p><strong>Estado:</strong> {userData?.state || 'Não disponível'}</p>
          <p><strong>CEP:</strong> {userData?.cep || 'Não disponível'}</p>
          <p><strong>Gênero:</strong> {userData?.gender || 'Não disponível'}</p>
          <p><strong>Celular:</strong> {userData?.phone || 'Não disponível'}</p>
          <p><strong>Data de Nascimento:</strong> {userData?.birthdate || 'Não disponível'}</p>
        </div>
      ) : (
        <p>Nenhum usuário logado.</p>
      )}
    </div>
  );
};

export default Profile;
