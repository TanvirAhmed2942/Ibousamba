// import React, { useState } from "react";
// import { Button, Collapse, ConfigProvider } from "antd";
// import AddFaqModal from "./AddFaqModal";
// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;
// function Faq() {
//   const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal visibility
//   const [faqs, setFaqs] = useState([
//     {
//       question: "What is a dog?",
//       answer: "A dog is a domesticated animal, known for loyalty.",
//     },
//     {
//       question: "What is React?",
//       answer: "React is a JavaScript library for building user interfaces.",
//     },
//     {
//       question: "What is Ant Design?",
//       answer: "Ant Design is a design system and React UI framework.",
//     },
//   ]); // Default FAQs state

// const handleAddFaq = (faq) => {
//     setFaqs((prevFaqs) => [...prevFaqs, faq]); // Add new FAQ to the list
//     setIsModalOpen(false); // Close the modal after saving
//   };
//   return (
//     <>
//       <ConfigProvider
//         theme={{
//           components: {
//             Button: {
//               defaultHoverBorderColor: "none",
//               defaultActiveBg: "#3a3936",
//               defaultActiveColor: "#d99e1e",
//               defaultHoverBg: "#3a3936",
//               defaultHoverColor: "#d99e1e ",
//             },
//           },
//         }}
//       >
//         <div className="w-full flex justify-end my-5">
//           <Button
//             onClick={() => setIsModalOpen(true)}
//             className="text-samba text-sm h-9 rounded-lg border-none bg-sambaSD px-5"
//           >
//             Add Faq
//           </Button>
//         </div>
//         <div className="flex flex-col gap-2 ">
//           <Collapse
//             className="bg-[#1b1b1b] "
//             expandIconPosition="end"
//             items={[
//               {
//                 key: "1",
//                 label: <p>"This is default size panel header"</p>,
//                 children: <p className="text-black">{text}</p>,
//               },
//             ]}
//           />

//           <Collapse
//             className="bg-[#1b1b1b] "
//             expandIconPosition="end"
//             items={[
//               {
//                 key: "2",
//                 label: <p>"This is default size panel header"</p>,
//                 children: <p className="text-black">{text}</p>,
//               },
//             ]}
//           />

//           <Collapse
//             className="bg-[#1b1b1b] "
//             expandIconPosition="end"
//             items={[
//               {
//                 key: "3",
//                 label: <p>"This is default size panel header"</p>,
//                 children: <p className="text-black">{text}</p>,
//               },
//             ]}
//           />
//           <AddFaqModal
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)} // Close the modal when canceled
//             onSave={handleAddFaq} // Pass handleAddFaq function to save new FAQ
//           />
//         </div>
//       </ConfigProvider>
//     </>
//   );
// }

// export default Faq;

import React, { useState } from "react";
import { Button, Collapse, ConfigProvider } from "antd";
import AddFaqModal from "./AddFaqModal";

function Faq() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal visibility
  const [faqs, setFaqs] = useState([
    {
      key: "1",
      question: "What is a dog?",
      answer: "A dog is a domesticated animal, known for loyalty.",
    },
    {
      key: "2",
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      key: "3",
      question: "What is Ant Design?",
      answer: "Ant Design is a design system and React UI framework.",
    },
  ]); // Default FAQs state with keys

  const handleAddFaq = (faq) => {
    // Add new FAQ to the list with a unique key
    const newFaq = {
      ...faq,
      key: String(faqs.length + 1),
    };
    setFaqs((prevFaqs) => [...prevFaqs, newFaq]);
    setIsModalOpen(false); // Close the modal after saving
  };

  // Create items array for Collapse component from faqs state
  const generateCollapseItems = () => {
    return faqs.map((faq) => ({
      key: faq.key,
      label: <p>{faq.question}</p>,
      children: <p className="text-black">{faq.answer}</p>,
    }));
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBorderColor: "none",
              defaultActiveBg: "#3a3936",
              defaultActiveColor: "#d99e1e",
              defaultHoverBg: "#3a3936",
              defaultHoverColor: "#d99e1e ",
            },
          },
        }}
      >
        <div className="w-full flex justify-end my-5">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="text-samba text-sm h-9 rounded-lg border-none bg-sambaSD px-5"
          >
            Add Faq
          </Button>
        </div>
        <div className="flex flex-col gap-2 ">
          <Collapse
            className="bg-[#1b1b1b]"
            expandIconPosition="end"
            items={generateCollapseItems()}
          />
          <AddFaqModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddFaq}
          />
        </div>
      </ConfigProvider>
    </>
  );
}

export default Faq;
