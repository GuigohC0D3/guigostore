import React from 'react';
import ProductList from './ProductList';
import './Home.css';

const Home = ({ addToCart }) => {
  return (
    <div className="home">
      <h1>Bem-vindo à Loja</h1>
      <h2 className="product-list-title">Nossos Produtos</h2>
      <ProductList addToCart={addToCart} />
    </div>
  );
};

export default Home;
