
import ProductDetails from "../../compoments/productComp";
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
