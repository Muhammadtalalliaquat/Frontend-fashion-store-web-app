
import Navbar from "../../compoments/navbar";
import Link from "next/link";

export default function ReturnPolicyPage() {
    const returnsContent = {
      title: "Return & Exchange Policy",
      intro: `At Fashion store, we want you to be fully satisfied with your purchase. If for any reason you're not happy, you can return or exchange your items within 14 days of receiving them.`,

      sections: [
        {
          heading: "Return Conditions",
          type: "list",
          items: [
            "Items must be unused, unwashed, and in original condition.",
            "Must include original tags and packaging.",
            "Returns must be initiated within 14 days of delivery.",
            "Final-sale or discounted items are not eligible for return.",
          ],
        },
        {
          heading: "How to Initiate a Return",
          type: "ordered",
          items: [
            `Email us at support@fashionista.com with your order number and reason for return.`,
            `We'll respond within 24–48 hours with instructions and a return shipping label if eligible.`,
            "Package the item securely and send it back.",
          ],
        },
        {
          heading: "Refunds",
          type: "paragraph",
          content:
            "Once your return is received and inspected, we’ll notify you of the approval or rejection. If approved, a refund will be issued to your original payment method within 7 business days.",
        },
        {
          heading: "Need Help?",
          type: "paragraph",
          content:
            "For questions or concerns, feel free to reach out at support@fashionista.com.",
        },
      ],
    };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-300 pb-3">
          {returnsContent.title}
        </h1>

        <p className="text-gray-700 mb-4">{returnsContent.intro}</p>

        {returnsContent.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              {section.heading}
            </h2>

            {section.type === "list" && (
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {section.type === "ordered" && (
              <ol className="list-decimal list-inside text-gray-600 space-y-1">
                {section.items.map((item, i) => (
                  <li key={i}>
                    {item.includes("support@fashionista.com") ? (
                      <>
                        Email us at{" "}
                        <Link
                          href="mailto:support@fashionista.com"
                          className="text-blue-600 underline"
                        >
                          support@fashionista.com
                        </Link>{" "}
                        with your order number and reason for return.
                      </>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ol>
            )}

            {section.type === "paragraph" && (
              <p className="text-gray-700">
                {section.content.includes("support@fashionista.com") ? (
                  <>
                    For questions or concerns, feel free to reach out at{" "}
                    <Link href="/contact" className="text-blue-600 underline">
                      contact us
                    </Link>
                    .
                  </>
                ) : (
                  section.content
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
