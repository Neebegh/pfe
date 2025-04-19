import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import SizeRecommendation from '../size/SizeRecommendation';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    // Ici vous feriez un appel API pour récupérer le produit
    const fetchProduct = async () => {
      const mockProduct = {
        id: 1,
        name: "T-Shirt Slim Fit",
        brand: "Nike",
        price: "59 DT",
        description: "T-shirt en coton respirant...",
        sizes: ['S', 'M', 'L', 'XL'],
        image: "https://via.placeholder.com/400",
        reviews: [
          { rating: 4, comment: "Très confortable" },
          { rating: 5, comment: "Parfait !" }
        ]
      };
      setProduct(mockProduct);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Chargement...</div>;

  return (
    <div className="product-page">
      {/* ... (même contenu que précédemment) */}
    </div>
  );
};

export default ProductPage;