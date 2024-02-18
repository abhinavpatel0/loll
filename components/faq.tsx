'use client'
import { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "Authors",
      answer: "So far all the content is by one author, but that can be fixed",
    },
    {
      id: 2,
      question: "About content",
      answer: "All content is written without the purpose of earning or advertising anything, so it's just personal notes",
    },
    {
      id: 3,
      question: "Main theme",
      answer: "I think more about content than SEO, but sometimes it drags",
    },
     {
      id: 4,
      question: "What I write for",
      answer: "As Toretto says, family is most important 🐺",
    },
  ];

  const [selectedFaq, setSelectedFaq] = useState(null);

  const handleFaqClick = (faq) => {
    setSelectedFaq(selectedFaq === faq.id ? null : faq.id);
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => {
      return {
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }
    })
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions (not)</h2>
          <p className="mb-8">Explanatory FAQ brigade</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg px-6 py-4 cursor-pointer transition duration-300 ${
                selectedFaq === faq.id
                  ? "border-l-4 border-green-400"
                  : "border-l-4 border-transparent"
              }`}
              onClick={() => handleFaqClick(faq)}
            >
              <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
              <p className={`mb-4 ${selectedFaq === faq.id ? "block" : "hidden"}`}>{faq.answer}</p>
              <div className="text-green-400 dark:text-green-400 flex items-center justify-end">
                <svg
                  className={`h-5 w-5 mr-2 ${selectedFaq === faq.id ? "transform rotate-180" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 14l6-6H4z" />
                </svg>
                <span className="font-medium">Read {selectedFaq === faq.id ? "less" : "more"}</span>
              </div>
            </div>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}></script>
      </div>
    </div>
  );
};

export default FAQ;