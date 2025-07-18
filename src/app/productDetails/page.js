import ProductDetails from "../../components/productComp";
import { Suspense } from "react";

export default function ProductInfo() {
  return (
    <>
      <Suspense>
        <ProductDetails />
      </Suspense>
    </>
  );
}
