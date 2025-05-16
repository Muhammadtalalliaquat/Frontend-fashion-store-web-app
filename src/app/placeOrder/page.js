import PlaceOrderComp from "../../compoments/orderPlaceComp";
import { Suspense } from "react";

export default function PlaceOrderForm() {
  return (
    <>
      <Suspense>
        <PlaceOrderComp />
      </Suspense>
    </>
  );
}
