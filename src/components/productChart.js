"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { getAllChartOrders } from "../store/features/orderSlice";
import { getAllMultiplesChartOrders } from "../store/features/multipleorderSlice";
import { getDiscountChartOfferOrder } from "../store/features/discountOrderSlice";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DiscountOrderChart() {
  const [seriesData, setSeriesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllOrderData = async () => {
      try {
        const [normal, multiple, discount] = await Promise.all([
          dispatch(getAllChartOrders()).unwrap(),
          dispatch(getAllMultiplesChartOrders()).unwrap(),
          dispatch(getDiscountChartOfferOrder()).unwrap(),
        ]);

        const orderCounts = {};

        const countProducts = (orders) => {
          orders.forEach((order) => {
            order.products.forEach((item) => {
              const name =
                item.name || item.productId?.name || "Unknown Product";
              const quantity = item.quantity || 1;
              const category =
                item.category ||
                item.productId?.category ||
                item.productId?.SalesCategory ||
                "Unknown";

              if (name) {
                const key = `${name.trim().toLowerCase()} (${category})`;
                if (!orderCounts[key]) {
                  orderCounts[key] = {
                    quantity: 0,
                    category,
                    label: name,
                  };
                }
                orderCounts[key].quantity += quantity;
              }
            });
          });
        };

        // Call for all types of orders
        countProducts(normal?.data || []);
        countProducts(multiple?.data || []);
        countProducts(discount?.data || []);

        // Labels & Quantity Extraction
        const labels = [];
        const data = [];

        Object.keys(orderCounts).forEach((key) => {
          const item = orderCounts[key];
          labels.push(`${item.label} (${item.category})`);
          data.push(item.quantity);
        });

        setCategories(labels);
        setSeriesData(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchAllOrderData();
  }, [dispatch]);

  const chartOptions = useMemo(
    () => ({
      chart: {
        id: "discount-order-chart",
        toolbar: { show: false },
      },
      xaxis: {
        categories,
        labels: {
          rotate: -45,
          style: { fontSize: "12px" },
        },
      },
      colors: ["#00BFFF", "#FF1493", "#FFA500", "#8A2BE2", "#3CB371"],
      dataLabels: { enabled: true },
    }),
    [categories]
  );

  return (
    <Box
      sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4, bgcolor: "background.default" }}
    >
      <Card
        sx={{
          width: {
            xs: "100%",
            sm: "90%",
            md: "80%",
            lg: "74%",
          },
          // maxWidth: "70%",
          // borderRadius: 3,
          // boxShadow: 4,
          mx: "auto",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            align="center"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            Most Ordered Product Chart
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ width: {
            xs: "100%",
            sm: "90%",
            md: "95%",
            lg: "85%",
          }, overflowX: "auto", mx: "auto" }}>
            <Box sx={{ minWidth: 600 }}>
              <Chart
                options={chartOptions}
                series={[
                  {
                    name: "Total Orders",
                    data: seriesData,
                  },
                ]}
                type="bar"
                height={350}
              />
            </Box>
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
            fontWeight={500}
            color="text.secondary"
          >
            Product Categories
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
