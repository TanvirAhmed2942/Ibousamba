import React, { useState } from "react";
import { ConfigProvider, Button, Select, Table } from "antd";
import { IoEye } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import AddSubCategoryModal from "./AddSubCategoryModal";
import { MdArrowDropDownCircle, MdOutlineArrowDropDown } from "react-icons/md";
import SubCategoryTable from "./SubCategoryTable";

const { Option } = Select; // Extract Option from Select

const SubCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const showModal = (record = null) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const columns = [
    { title: "Serial", dataIndex: "serial", key: "serial" },
    {
      title: "Image",
      dataIndex: "categoryImg",
      key: "categoryImg",
      render: (img) => <img src={img} alt="Category" style={{ width: 50 }} />,
    },
    { title: "Category", dataIndex: "category", key: "category" },
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

  const rawData = [
    {
      key: "1",
      serial: "001",
      categoryImg: "https://via.placeholder.com/50",
      category: "Heavy Machineries",
    },
    {
      key: "2",
      serial: "002",
      categoryImg: "https://via.placeholder.com/50",
      category: "Light Accessories",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: "#d99e1e",
            defaultColor: "black",
            defaultBorderColor: "#d99e1e",
            defaultHoverBg: "#d99e1e",
            defaultHoverColor: "black",
            defaultHoverBorderColor: "#d99e1e",
            defaultActiveBg: "#d99e1e",
            defaultActiveColor: "black",
            defaultActiveBorderColor: "#d99e1e",
          },
        },
      }}
    >
      <div className="px-3">
        {/* Select Category Dropdown */}
        <div className="mb-4 flex items-start justify-between ">
          <div className="w-1/2 flex gap-4 items-center">
            <p className="text-[24px]">Select Category</p>
            <Select
              className="flex items-center gap-2  w-40 border rounded-md"
              s
              suffixIcon={
                <MdOutlineArrowDropDown size={25} className="text-white" />
              }
              placeholder="Category"
              options={[
                {
                  value: "1",
                  label: "Jack",
                },
                {
                  value: "2",
                  label: "Lucy",
                },
                {
                  value: "3",
                  label: "Tom",
                },
              ]}
            />
          </div>
          <Button
            className="h-10 rounded-lg font-semibold mb-4"
            onClick={() => showModal()}
          >
            <FaPlus /> Add Sub Category
          </Button>
        </div>

        {/* Table */}
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
          <SubCategoryTable />
        </ConfigProvider>

        {/* Modal Component */}
        <AddSubCategoryModal
          isModalOpen={isModalOpen}
          handleClose={handleClose}
          record={selectedRecord}
        />
      </div>
    </ConfigProvider>
  );
};

export default SubCategory;
