import React from 'react';
import PropTypes from 'prop-types'; // Importando a biblioteca PropTypes
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, removeFromCart }) => {
  const navigate = useNavigate(); // Inicializando useNavigate

  const getTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h1 className='name-cart'>Seu Carrinho</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {cart.map((product, index) => (
            <div key={index} className="cart-item">
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>Preço: R$ {product.price.toFixed(2)} x {product.quantity}</p>
              <button onClick={() => removeFromCart(product.id)}>Remover</button>
            </div>
          ))}
          <h2>Total: R$ {getTotal()}</h2>
          <button className="continue-shopping" onClick={() => navigate('/')}>
            Continuar Comprando
          </button>
        </>
      )}
    </div>
  );
};

// Adicionando validação de props
Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;
