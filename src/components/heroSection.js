"use client";

import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
// import { getHeroProducts } from "../store/features/productSlice";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CategoryCarousel({ bannerData }) {
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getHeroProducts())
  //     .then((result) => {
  //       setProducts(result.payload.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Fetch Error:", err);
  //       setLoading(false);
  //     });
  // }, [dispatch]);

  useEffect(() => {
    if (bannerData) {
      // console.log("Banner data is here:", bannerData);
      setLoading(false);
    }
  }, [bannerData]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        py: { xs: 2, sm: 4 },
        background:
          "linear-gradient(135deg, #312e81 0%, #000000 50%, #1e1b4b 100%)",
        color: "white",
      }}
    >
      {/* Animated Gradient Circles */}
      <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        "&::before": {
          content: '""',
          position: "absolute",
          width: 280,
          height: 280,
          backgroundColor: "rgba(96,165,250,0.25)",
          borderRadius: "50%",
          top: -80,
          left: -80,
          animation: "pulse 6s infinite",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: 180,
          height: 180,
          backgroundColor: "rgba(168,85,247,0.25)",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "ping 5s infinite",
        },
        "@keyframes pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: 0.4 },
          "50%": { transform: "scale(1.2)", opacity: 0.2 },
        },
        "@keyframes ping": {
          "0%": { transform: "translate(-50%, -50%) scale(1)", opacity: 0.4 },
          "100%": {
            transform: "translate(-50%, -50%) scale(1.5)",
            opacity: 0,
          },
        },
      }}
      />

      {/* Swiper Section */}
      {!loading && bannerData?.length > 0 && (
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          <Swiper
            spaceBetween={40}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            {bannerData.map((item, index) => (
              <SwiperSlide key={index}>
                <Paper
                  elevation={8}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row", sm: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 5,
                    bgcolor: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 4,
                    p: { xs: 4, sm: 8 },
                  }}
                >
                  {/* Left Text Section */}
                  <Box
                    sx={{
                      flex: 1,
                      textAlign: { xs: "left", lg: "left" },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: "#fff",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        mb: 2,
                        fontSize: {
                          xs: "1.8rem",
                          sm: "2.2rem",
                          md: "2.8rem",
                          lg: "3.2rem",
                        },
                      }}
                    >
                      Discover Your Fashion{" "}
                      <Typography
                        component="span"
                        variant="h4"
                        sx={{
                          color: "#FACC15",
                          display: "block",
                          fontSize: {
                            xs: "1.4rem",
                            sm: "1.8rem",
                            md: "2.2rem",
                            lg: "2.5rem",
                          },
                        }}
                      >
                        With Style
                      </Typography>
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#fff",
                        mb: 1,
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                      }}
                    >
                      {item.category} Collection
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                        color: "#FACC15",
                        mb: 2,
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        maxWidth: 400,
                        color: "rgba(255,255,255,0.8)",
                        mb: 3,
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
                      }}
                    >
                      Discover fresh trends in {item.name.toLowerCase()} wear.
                      Handpicked fashion to elevate your wardrobe.
                    </Typography>

                    <Button
                      onClick={() => router.push(`/products`)}
                      variant="contained"
                      sx={{
                        bgcolor: "#FACC15",
                        color: "black",
                        fontWeight: 600,
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.9rem",
                          md: "1rem",
                          lg: "1.05rem",
                        },
                        px: { xs: 3, sm: 4, md: 5 },
                        py: { xs: 1, sm: 1.2, md: 1.5 },
                        borderRadius: 50,
                        boxShadow: 4,
                        textTransform: "none",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "#fde047",
                          transform: "translateY(-2px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      Shop Now
                    </Button>
                  </Box>

                  {/* Right Image Section */}
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: { xs: "center", lg: "flex-end" },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 250, sm: 320, lg: 400 },
                        height: { xs: 250, sm: 320, lg: 400 },
                        borderRadius: 4,
                        boxShadow: 6,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                        priority
                      />
                    </Box>
                  </Box>
                </Paper>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      )}
    </Box>
    // <section className="w-full bg-gradient-to-br from-indigo-800 via-black to-indigo-900 text-white py-8 px-4 md:px-12 lg:px-24 relative overflow-hidden">
    //   <div className="absolute top-0 left-0 w-full h-full z-0">
    //     <div className="absolute w-72 h-72 bg-blue-400 opacity-20 rounded-full -top-20 -left-20 animate-ping"></div>
    //     <div className="absolute w-48 h-48 bg-purple-500 opacity-20 rounded-full top-1/2 left-1/2 animate-pulse"></div>
    //   </div>

    //   {!loading && bannerData?.length > 0 && (
    //     <Swiper
    //       spaceBetween={40}
    //       slidesPerView={1}
    //       // navigation
    //       pagination={{ clickable: true }}
    //       modules={[Navigation, Pagination]}
    //       className="relative z-10"
    //     >
    //       {bannerData.map((item, index) => (
    //         <SwiperSlide key={index}>
    //           <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-2 sm:mt-2 bg-white/5 backdrop-blur-sm shadow-2xl rounded-xl p-8 sm:p-20">
    //             <div className="flex-1 text-center lg:text-left space-y-5">
    //               <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
    //                 Discover Your Fashion <br />
    //                 <span className="text-yellow-300 text-2xl sm:text-4xl">
    //                   With Style
    //                 </span>
    //               </h1>

    //               <h2 className="text-1xl sm:text-2xl font-bold text-white">
    //                 {item.category} Collection
    //               </h2>

    //               <h3 className="text-lg sm:text-xl font-semibold text-yellow-300">
    //                 {item.name}
    //               </h3>

    //               <p className="text-base sm:text-lg text-gray-200 max-w-md mx-auto lg:mx-0 leading-relaxed">
    //                 Discover fresh trends in {item.name.toLowerCase()} wear.{" "}
    //                 <br />
    //                 Handpicked fashion to elevate your wardrobe.
    //               </p>

    //               <button
    //                 onClick={() => router.push(`/products`)}
    //                 className="mt-4 inline-block bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md"
    //               >
    //                 Shop Now
    //               </button>
    //             </div>

    //             <div className="flex justify-center lg:justify-end mb-3 sm:mb-0">
    //               <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-2xl shadow-xl overflow-hidden">
    //                 {/* <Image
    //                   src={item.image}
    //                   alt={item.name}
    //                   width={400}
    //                   height={400}
    //                   priority
    //                   quality={100}
    //                   className="object-cover w-full h-full"
    //                 /> */}
    //                 <Image
    //                   key={item._id}
    //                   src={item.images[0]}
    //                   alt={item.name}
    //                   width={400}
    //                   height={400}
    //                   className="object-cover w-full h-full rounded-lg transition-all duration-300"
    //                   priority
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </SwiperSlide>
    //       ))}
    //     </Swiper>
    //   )}
    // </section>
  );
}
