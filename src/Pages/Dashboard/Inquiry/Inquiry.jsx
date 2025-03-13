import React, { useState } from "react";
import { Table, ConfigProvider } from "antd";
import { IoEye } from "react-icons/io5";
import InquiryDetailsModal from "./InquiryDetailsModal";

function Inquiry() {
  return (
    <div className="px-3">
      <p className="text-sm text-samba py-4">Latest Inquiry List:</p>
      <InquiryTable />
    </div>
  );
}

export default Inquiry;

const InquiryTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const showModal = (record) => {
    setSelectedInquiry(record);
    setIsModalOpen(true);
  };

  const columns = [
    { title: "Serial", dataIndex: "serial", key: "serial" },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "User Email", dataIndex: "userEmail", key: "userEmail" },
    {
      title: "Inquiry Topics",
      dataIndex: "inquiryTopics",
      key: "inquiryTopics",
    },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Your Inquiry", dataIndex: "yourInquiry", key: "yourInquiry" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <a
          href="#"
          className="hover:text-[#a11d26]"
          onClick={(e) => {
            e.preventDefault();
            showModal(record);
          }}
        >
          <IoEye size={24} />
        </a>
      ),
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#575858",
              headerSplitColor: "none",
              headerColor: "white",
              borderColor: "#A3A3A3",
              colorBgContainer: "#3a3a3a",
              rowHoverBg: "#4a4a4a",
              colorText: "white",
            },
          },
        }}
      >
        <div className="custom-table">
          <Table columns={columns} dataSource={rawData} pagination />
        </div>
      </ConfigProvider>
      <InquiryDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        inquiryData={selectedInquiry}
      />
    </div>
  );
};

const rawData = [
  {
    key: "1",
    serial: "001",
    fullName: "John Doe",
    userEmail: "john.doe@example.com",
    inquiryTopics: "Product Information",
    phoneNumber: "123-456-7890",
    yourInquiry: "Can you provide details about the latest product?",
  },
  {
    key: "2",
    serial: "002",
    fullName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    inquiryTopics: "Pricing",
    phoneNumber: "987-654-3210",
    yourInquiry: "What are the bulk purchase discounts?",
  },
  {
    key: "3",
    serial: "003",
    fullName: "Alice Johnson",
    userEmail: "alice.johnson@example.com",
    inquiryTopics: "Shipping",
    phoneNumber: "456-789-1234",
    yourInquiry: "How long does shipping take?",
  },
  {
    key: "4",
    serial: "004",
    fullName: "Bob Brown",
    userEmail: "bob.brown@example.com",
    inquiryTopics: "Returns",
    phoneNumber: "321-654-9870",
    yourInquiry: "What is your return policy?",
  },
  {
    key: "5",
    serial: "005",
    fullName: "Charlie White",
    userEmail: "charlie.white@example.com",
    inquiryTopics: "Product Availability",
    phoneNumber: "159-753-4862",
    yourInquiry: "Is this product in stock?",
  },
];
