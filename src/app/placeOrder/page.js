import PlaceOrderComp from "../../components/orderPlaceComp";
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
