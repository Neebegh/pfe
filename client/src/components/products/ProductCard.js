import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success(`${product.name} ajouté au panier !`);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover mb-3"
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.price}€</p>
      <button 
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProductCard;