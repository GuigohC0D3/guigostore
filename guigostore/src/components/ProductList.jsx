import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.title} />
          <a href={product.description}>Veja Mais</a>
          <p>{product.price} R$</p>
          <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
