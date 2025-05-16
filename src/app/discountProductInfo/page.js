
import DiscountProductComp from "../../compoments/discuntedProductComp";
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
