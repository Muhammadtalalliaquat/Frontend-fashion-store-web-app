"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { getAllChartOrders } from "../store/features/orderSlice";
import { getAllMultiplesChartOrders } from "../store/features/multipleorderSlice";
import { getDiscountChartOfferOrder } from "../store/features/discountOrderSlice";

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
              console.log("product data here is:", item.name);
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
    <div className="w-full bg-blue-50 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-6xl mx-auto rounded-2xl p-4 sm:p-6 md:p-8">
        <h2 className="text-center text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">
          Most Ordered Product Chart
        </h2>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px] sm:min-w-full">
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
              // width={490}
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
            Product Categories
          </span>
        </div>
      </div>
    </div>
  );
}
