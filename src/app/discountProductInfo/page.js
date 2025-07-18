import DiscountProductComp from "../../components/discuntedProductComp";
import { Suspense } from "react";

export default function DiscountProductInfo() {
  return (
    <>
      <Suspense>
        <DiscountProductComp />
      </Suspense>
    </>
  );
}
