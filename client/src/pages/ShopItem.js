import { useQuery } from "@apollo/client";
import React, { useState, useContext } from "react";
import { QUERY_PRODUCT } from "../utils/queries";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../utils/cartProvider";

// Hard import images
import facialCleanser from "../assets/images/facialCleanser.png";
import retinolSerum from "../assets/images/retinalSerum.png";
import vitaminCSerum from "../assets/images/vitaminC.png";
import moisturizer from "../assets/images/hydratingFaceMoisturizer.png";
import faceScrub from "../assets/images/exfoliator.png";
import eyeCream from "../assets/images/eyeCream.png";
import faceMask from "../assets/images/brighteningMask.png";
import clayMask from "../assets/images/clayMask.png";
import sunscreen from "../assets/images/sunscreen.png";
import lipBalm from "../assets/images/lipBalm.png";

// Create map between imageUrl in product and hard import images
const imageMap = {
  "../assets/images/facialCleanser.png": facialCleanser,
  "../assets/images/retinolSerum.png": retinolSerum,
  "../assets/images/vitaminCSerum.png": vitaminCSerum,
  "../assets/images/faceMoisturizer.png": moisturizer,
  "../assets/images/faceScrub.png": faceScrub,
  "../assets/images/eyeCream.png": eyeCream,
  "../assets/images/faceMask.png": faceMask,
  "../assets/images/clayMask.png": clayMask,
  "../assets/images/sunscreen.png": sunscreen,
  "../assets/images/lipBalm.png": lipBalm,
};

const ShopItem = ({ match }) => {
  const { setItem } = useContext(CartContext);
  const { itemId } = useParams();
  const { data, loading } = useQuery(QUERY_PRODUCT, {
    variables: { id: itemId },
  });

  const [quantity, setQuantity] = useState(1);
  if (loading) return <div>Loading...</div>;
  const { name, price, description, imageUrl, inStock } = data.product;

  const handleAddToCart = () => {
    setItem(itemId, quantity);
  };
  return (
    <div className="container mx-auto px-4">
      <div className="bg-white shadow rounded-lg p-6">
        <Link
          className="p-2 rounded bg-blue-400 hover:bg-blue-500 text-white"
          to="/shop"
        >
          Back
        </Link>
        <img
          className="h-64 object-cover mb-6 mt-4"
          src={imageMap[imageUrl]}
          alt={name}
        />
        <h1 className="text-4xl font-semibold mb-2">{name}</h1>
        <p className="text-xl mb-6 text-gray-900">{price}</p>
        <p className="text-lg mb-6 text-gray-900">{description}</p>
        <p className="text-lg mb-6">{inStock ? "In Stock" : "Out of Stock"}</p>

        <label htmlFor="quantity" className="mr-2">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />

        <button
          className={`px-4 py-2 rounded text-white ${
            inStock ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500"
          }`}
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ShopItem;
