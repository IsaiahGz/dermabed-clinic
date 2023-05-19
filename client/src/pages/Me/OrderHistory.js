import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_HISTORY_BY_EMAIL } from "../../utils/queries";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  const { loading, data, error } = useQuery(QUERY_HISTORY_BY_EMAIL, {
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error! {error.message}</p>;
  }
  console.log(data);
  return (
    <div className="container mx-auto px-4 mt-5">
      <h1 className="text-4xl font-semibold mb-4">Order History</h1>
      {data.getMyPurchaseHistory.map((history) => {
        return (
          <div className="bg-white rounded shadow p-4 mt-4">
            <div className="flex flex-col">
              <p className="text-gray-600 mb-2">Order ID: {history._id}</p>
            </div>
            <div className="my-4">
              <h3 className="text-xl font-bold mb-2">Products:</h3>
              {history.productsQuantity.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between items-center mb-2"
                >
                  <div className="flex items-center">
                    <Link to={`/shop/${item.product._id}`}>
                      <p className="text-lg font-semibold text-blue-400">
                        {item.product.name}
                      </p>
                    </Link>
                    <p className="text-gray-600 text-sm ml-2">
                      x {item.quantity}
                    </p>
                  </div>
                  <p className="text-gray-600">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Total:</p>
              <p className="text-xl font-bold">
                ${history.amountTotal.toFixed(2)}
              </p>
            </div>
          </div>
        );
      })}
      {data.getMyPurchaseHistory.length === 0 && (
        <p className="text-lg">You haven't placed any orders yet.</p>
      )}
    </div>
  );
}
