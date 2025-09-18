import Navbar from "../../components/navbar";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";


export default function shippingInfoPage() {
  // const shippingContent = {
  //   title: "Shipping Information",
  //   intro:
  //     "We strive to deliver your order as quickly and efficiently as possible. Below are our standard shipping policies and timelines.",

  //   sections: [
  //     {
  //       heading: "Shipping Methods & Timeframes",
  //       type: "list",
  //       items: [
  //         "Standard Shipping: 3–7 business days",
  //         "Express Shipping: 1–3 business days",
  //         "Free shipping on orders over $50",
  //       ],
  //     },
  //     {
  //       heading: "Order Processing",
  //       type: "paragraph",
  //       content:
  //         "Orders are processed within 1–2 business days. You will receive an email confirmation with tracking once your order ships.",
  //     },
  //     {
  //       heading: "International Shipping",
  //       type: "paragraph",
  //       content:
  //         "We currently only ship within Karachi,Pakistan. For international orders, stay tuned—we're expanding soon!",
  //     },
  //   ],
  // };


  const shippingContent = {
    title: "Shipping Information",
    intro:
      "We strive to deliver your order as quickly and efficiently as possible. Below are our standard shipping policies and timelines.",

    sections: [
      {
        heading: "Shipping Methods & Timeframes",
        type: "list",
        items: [
          "Standard Shipping: 3–7 business days",
          "Express Shipping: 1–3 business days",
          "Free shipping on orders over $50",
        ],
      },
      {
        heading: "Order Processing",
        type: "paragraph",
        content:
          "Orders are processed within 1–2 business days. You will receive an email confirmation with tracking once your order ships.",
      },
      {
        heading: "International Shipping",
        type: "paragraph",
        content:
          "We currently only ship within Karachi, Pakistan. For international orders, stay tuned—we're expanding soon!",
      },
    ],
  };

  return (
    <>
      <Navbar />

      <Box sx={{ maxWidth: "800px", mx: "auto", px: 3, py: 6, mt: 6 }}>
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ borderBottom: "1px solid", borderColor: "grey.300", pb: 1 }}
        >
          {shippingContent.title}
        </Typography>

        {/* Intro */}
        <Typography variant="body1" color="text.secondary" mb={3}>
          {shippingContent.intro}
        </Typography>

        {/* Sections */}
        {shippingContent.sections.map((section, index) => (
          <Box key={index} mb={4}>
            <Typography
              variant="h6"
              fontWeight="600"
              color="text.primary"
              gutterBottom
              sx={{
                borderBottom: "1px solid",
                borderColor: "grey.200",
                pb: 0.5,
              }}
            >
              {section.heading}
            </Typography>

            {section.type === "list" && (
              <List dense>
                {section.items.map((item, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ color: "text.secondary" }}
                    />
                  </ListItem>
                ))}
              </List>
            )}

            {section.type === "paragraph" && (
              <Typography variant="body2" color="text.secondary">
                {section.content}
              </Typography>
            )}

            {index < shippingContent.sections.length - 1 && (
              <Divider sx={{ mt: 3 }} />
            )}
          </Box>
        ))}
      </Box>

      {/* <div className="max-w-4xl mx-auto px-4 py-12 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-300 pb-2">
          {shippingContent.title}
        </h1>

        <p className="text-gray-700 mb-4">{shippingContent.intro}</p>

        {shippingContent.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2 border-b border-gray-200 pb-1">
              {section.heading}
            </h2>

            {section.type === "list" && (
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {section.type === "paragraph" && (
              <p className="text-gray-700">{section.content}</p>
            )}
          </div>
        ))}
      </div> */}
    </>
  );
}
