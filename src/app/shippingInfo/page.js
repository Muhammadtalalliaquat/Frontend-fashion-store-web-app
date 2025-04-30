
import Navbar from "../../compoments/navbar";

export default function shippingInfoPage(){
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
            "We currently only ship within Karachi,Pakistan. For international orders, stay tuned—we're expanding soon!",
        },
      ],
    };

    return (
      <>
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 py-12 mt-20">
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
        </div>
      </>
    );
}