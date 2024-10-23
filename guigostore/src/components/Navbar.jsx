import React from 'react';
import PropTypes from 'prop-types'; // Importando PropTypes
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirecionar após logout
import { auth } from '../firebaseConfig'; // Importando auth do firebase
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const user = auth.currentUser; // Obtendo o usuário atual
  const navigate = useNavigate(); // Hook do React Router para redirecionar

  // Função de logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Logout bem-sucedido"); // Pode ser removido depois de testar
      navigate('/login'); // Redirecionar para a página de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error); // Exibe o erro no console para debug
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">Minha Loja</Link>
      </div>
      <div className="navbar-categories">
        <button className="categories-button">Todas as categorias</button>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="O que você está procurando?" />
        <button className="search-button">🔍</button>
      </div>
      <nav className="navbar-links">
        <Link to="/">Do Brasil</Link>
        <Link to="/">Choice</Link>
        <Link to="/">Mais</Link>
        <Link to="/cart">Carrinho ({cartCount})</Link>
        {user ? (
          <>
            <Link to="/profile">Perfil</Link>
            <button onClick={handleLogout}>Sair</button> {/* Chamando handleLogout */}
          </>
        ) : (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/register">Registrar</Link>
          </>
        )}
      </nav>
    </header>
  );
};

// Definindo o tipo esperado para a prop cartCount
Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired, // Validação para garantir que cartCount seja um número
};

export default Navbar;
