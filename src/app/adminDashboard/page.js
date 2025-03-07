"use client";

import Navbar from "../../compoments/navbar";
import ProductList from "../../compoments/ProductList";
import withAdminCheck from "../../HOC/withAuth";

function AdminDashboard() {
  return (
    <div>
      <Navbar />

      <ProductList />
    </div>
  );
}

export default withAdminCheck(AdminDashboard);
