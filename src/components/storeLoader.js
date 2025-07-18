import { FaSpinner } from "react-icons/fa";

export default function FashionStoreLoader({ product, order , cart}) {
  let message = "Loading Styles...";

  if (product) {
    message = "Loading Products...";
  } else if (order) {
    message = "Please wait, check your order status...";
  } else if (cart) {
    message = "Loading your cart..";
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-4">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <p className="text-lg font-semibold text-gray-700">{message}</p>
      </div>
    </div>
  );
}
  
