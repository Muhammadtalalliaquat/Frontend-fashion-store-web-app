// "use client";

// import { FaSpinner } from "react-icons/fa";
import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";


export default function FashionStoreLoader({ product, order, cart, dashboard }) {
  let message = "Loading Store...";

  if (product) {
    message = "Loading Products...";
  } else if (order) {
    message = "Please wait, check your order status...";
  } else if (cart) {
    message = "Loading your cart..";
  } else if (dashboard) {
    message = "Loading Dashboard..";
  }

  return (
    <Backdrop
      open={true}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(255,255,255,0.9)",
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <CircularProgress color="primary" size={50} thickness={4} />
        <Typography variant="h6" color="text.primary" fontWeight="600">
          {message}
        </Typography>
      </Box>
    </Backdrop>
    // <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    //   <div className="flex flex-col items-center gap-4">
    //     <FaSpinner className="animate-spin text-4xl text-blue-500" />
    //     <p className="text-lg font-semibold text-gray-700">{message}</p>
    //   </div>
    // </div>
  );
}
  
