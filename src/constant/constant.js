const DEV_URL = `http://localhost:5000/`
// const PROD_URL = `https://back-end-fashion-web-app-server-production.up.railway.app/`

export const BASIC_URL = DEV_URL
// export const BASIC_URL = PROD_URL

export const ApiRoutes = {
  login: BASIC_URL + `user/login`,
  register: BASIC_URL + `user/register`,
  verifyEmail: BASIC_URL + `user/verifyemail`,
  forgotPassword: BASIC_URL + `user/requestPasswordReset`,
  forgotPasswordSent: BASIC_URL + `user/resetPassword`,
  accountUpdate: BASIC_URL + `user/updateAccount`,

  getProduct: BASIC_URL + `admin`,
  getAllProducts: BASIC_URL + `admin/allProducts`,
  addProduct: BASIC_URL + `admin/addProdcuts`,
  editProduct: BASIC_URL + `admin/edit`,
  deleteProduct: BASIC_URL + `admin/delete`,

  getCart: BASIC_URL + `cart/getCart`,
  addCart: BASIC_URL + `cart/addCart`,
  updateCart: BASIC_URL + `cart/update`,
  deleteCart: BASIC_URL + `cart/remove`,

  getReview: BASIC_URL + `review/productReviews`,
  addReviews: BASIC_URL + `review/addReview`,
  deleteReviews: BASIC_URL + `review/deleteReview`,
  // updateCart: BASIC_URL + `cart/update`,

  addOrder: BASIC_URL + `order/placeOrder`,
  getOrders: BASIC_URL + `order/allOrders`,
  updateOrder: BASIC_URL + `order/updateOrder`,

  addDiscounts: BASIC_URL + `sale-discounts/addDiscount`,
  getDiscount: BASIC_URL + `sale-discounts`,
  updateDiscount: BASIC_URL + `sale-discounts/updateDiscountOffer`,
  deleteDiscountOrder: BASIC_URL + `sale-discounts/deleteDiscountOffer`,

  placedDiscountsOrder: BASIC_URL + `saleDiscountsOrder/placeSaleDiscountOrder`,
  getDiscountOrder: BASIC_URL + `saleDiscountsOrder/getSalesOrders`,
  updateDiscountOrder: BASIC_URL + `saleDiscountsOrder/updateDiscountOrder`,
};
