"use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Container,
} from "@mui/material";
// import FashionStoreLoader from "@/compoments/storeLOader";

export default function GetStarted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "grey.100",
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          {/* Left Side - Text */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h2"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                sx={{
                  fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
                  lineHeight: 1.2,
                }}
              >
                Elevate Your Style with{" "}
                <Typography
                  component="span"
                  variant="inherit"
                  sx={{ color: "primary.main" }}
                >
                  Trendy Fashion
                </Typography>
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.125rem", mb: 4 , textAlign: "center"}}
              >
                Discover the latest fashion trends and shop for high-quality
                products. Upgrade your wardrobe today!
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: { xs: "center", md: "flex-center" },
                  width: "100%",
                }}
              >
                <Button
                  component={Link}
                  href="/shop"
                  variant="contained"
                  size="large"
                  sx={{
                    px: { xs: 2, sm: 4 },
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: 3,
                    fontWeight: 600,
                  }}
                >
                  Shop Now
                </Button>

                <Button
                  component={Link}
                  href="/login"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: { xs: 2, sm: 4 },
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    bgcolor: "grey.200",
                    color: "text.primary",
                    "&:hover": {
                      bgcolor: "grey.300",
                    },
                  }}
                >
                  Join Us
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Glassmorphic Image Card */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                maxWidth: 600,
                mx: "auto",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              {/* Glassmorphic overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(255,255,255,0.3)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.3)",
                  zIndex: 1,
                }}
              />
              <Card
                elevation={8}
                sx={{
                  borderRadius: 4,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image="/product_image.jpg"
                  alt="Fashion Model"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 4,
                  }}
                />
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    // <div
    //   className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
    //   style={{ backgroundImage: 'url("/product-photos.jpg")' }}
    // >
    //   <motion.div
    //     initial={{ opacity: 0, y: 30 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.8 }}
    //     className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-6xl p-6 sm:p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-10"
    //   >
    //     {/* LEFT SECTION */}
    //     <div className="flex flex-col justify-center text-center md:text-left space-y-6">
    //       <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-100 leading-tight">
    //         Discover Your <span className="text-blue-500">Signature Style</span>
    //       </h1>
    //       <p className="text-base sm:text-lg md:text-xl text-gray-200">
    //         Explore premium collections curated for modern fashion. Elevate your
    //         wardrobe today.
    //       </p>

    //       <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
    //         <Link
    //           href="/shop"
    //           className="w-full sm:w-auto sm:px-5 sm:py-3 px-3 py-2 text-base bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition duration-300 text-center"
    //         >
    //           Shop Now
    //         </Link>
    //         <Link
    //           href="/login"
    //           className="w-full sm:w-auto sm:px-5 sm:py-3 px-3 py-2 text-base border border-white text-white font-semibold rounded-xl shadow hover:bg-white hover:text-black transition duration-300 text-center"
    //         >
    //           Join Us
    //         </Link>
    //       </div>
    //     </div>

    //     {/* RIGHT SECTION */}
    //     <motion.div
    //       initial={{ opacity: 0, scale: 0.9 }}
    //       animate={{ opacity: 1, scale: 1 }}
    //       transition={{ duration: 0.9 }}
    //       className="hidden md:flex justify-center items-center"
    //     >
    //       <Image
    //         src="/fashion-store-logo.jpg"
    //         alt="Fashion Model"
    //         width={400}
    //         height={400}
    //         className="rounded-xl w-full max-w-xs sm:max-w-md object-cover"
    //         priority
    //       />
    //     </motion.div>
    //   </motion.div>
    // </div>
  );
}
