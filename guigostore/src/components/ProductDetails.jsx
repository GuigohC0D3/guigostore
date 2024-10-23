import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductDetails.css'

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Carregando...</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ width: '200px' }} />
      <p>{product.description}</p>
      <p>{product.price} USD</p>
      <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
    </div>
  );
};

// Validação de PropTypes
ProductDetails.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default ProductDetails;
