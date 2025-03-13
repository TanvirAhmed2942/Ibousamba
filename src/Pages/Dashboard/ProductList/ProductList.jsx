import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input } from "antd";
import { FiEdit, FiPlusCircle } from "react-icons/fi";

import AddProductModal from "./AddProductModal";
import { SearchOutlined } from "@ant-design/icons";

import { MdDeleteOutline } from "react-icons/md";
import DeleteModal from "./DeleteModal";

function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(rawData); // State to hold the product list
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const showEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const showAddModal = () => {
    setSelectedProduct(null); // Clear any selected product to ensure we're adding
    setIsModalOpen(true);
  };

  const addOrUpdateProduct = (product) => {
    if (selectedProduct) {
      // Update existing product
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.key === product.key ? product : p))
      );
    } else {
      // Add new product
      setProducts((prevProducts) => [...prevProducts, product]);
    }
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const showDetailsModal = (product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  const deleteProduct = (key) => {
    // Find and remove the product by key
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.key !== key)
    );
    setIsDeleteModalOpen(false); // Close the delete modal after deletion
  };

  const showDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const searchableFields = columns(showEditModal, showDeleteModal).map(
    (col) => col.dataIndex
  );

  const filteredData = products.filter((item) =>
    searchableFields.some((field) => {
      if (!item[field]) return false;
      const fieldValue = item[field].toString().toLowerCase();
      const query = searchTerm.toLowerCase();
      if (field === "serial") {
        return fieldValue.includes(query.replace("#", ""));
      }
      return fieldValue.includes(query);
    })
  );

  const dataSource = filteredData.map((item) => ({
    ...item,
    serial: `#${item.serial}`,
  }));

  return (
    <div className="px-3 py-4">
      <div className="text-white flex justify-between mb-4">
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorBgBase: "#1f1f1f",
                colorBgContainer: "#1f1f1f",
                colorBgBaseHover: "#1f1f1f",
                activeBg: "black",
                colorBorder: "transparent",
                colorPrimaryBorder: "transparent",
                boxShadow: "none",
              },
              // Button: {
              //   defaultHoverBorderColor: "#a01d25",
              // },
            },
          }}
        >
          <Input
            placeholder="Search here..."
            className="w-1/3 bg-[#1f1f1f] border-none rounded-lg outline-none text-sm text-slate-300"
            prefix={<SearchOutlined className="text-[#5e5e5e] text-lg pl-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </ConfigProvider>
        <button
          className="h-12 w-48 flex items-center text-sm justify-center gap-4 px-5 text-samba bg-sambaSD rounded-lg"
          onClick={showAddModal}
        >
          <FiPlusCircle size={22} />
          Add Product
        </button>
      </div>
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
        <div className="custom-table">
          <Table
            dataSource={dataSource}
            columns={columns(showEditModal, showDeleteModal)}
            pagination={{
              // onChange: cancel,
              defaultPageSize: 5,
              position: ["bottomRight"],
              size: "default",
              total: 50,
            }}
          />
        </div>
        <AddProductModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          addProduct={addOrUpdateProduct}
          editProduct={addOrUpdateProduct}
          editingProduct={selectedProduct}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => deleteProduct(selectedProduct?.key)}
        />
      </ConfigProvider>
    </div>
  );
}

export default ProductList;

const rawData = [
  {
    key: "6",
    serial: "006",
    productName: "Gelato 33",
    productPrice: "$38.99",
    productModel: "GEL-33-HYB",
    productCapacity: "3.5g",
    productPower: "THC 19%",
    productStatus: "Available",
    productImg:
      "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/1820B/production/_106472889_hi051939557.jpg",
  },
  {
    key: "5",
    serial: "005",
    productName: "Sour Diesel",
    productPrice: "$44.99",
    productModel: "SD-OR-SAT",
    productCapacity: "3.5g",
    productPower: "THC 22%",
    productStatus: "Available",
    productImg:
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Macro_cannabis_bud.jpg",
  },
  {
    key: "2",
    serial: "002",
    productName: "Purple Haze",
    productPrice: "$39.99",
    productModel: "PH-COLO-SAT",
    productCapacity: "3.5g",
    productPower: "THC 21%",
    productStatus: "Low Stock",
    productImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tCHsL3YYsC9qQSZhrqRBfecifG1lVu8x9g&s",
  },
];

const columns = (showEditModal, showDeleteModal) => [
  {
    title: "Sl#",
    dataIndex: "serial",
    key: "serial",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
    render: (_, record) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar
            shape="square"
            size="default"
            src={record.productImg}
            alt={record.productName}
            onError={(e) => {
              console.error("Image failed to load:", record.productImg);
              e.target.src = "https://via.placeholder.com/50";
            }}
          />
          <span>{record.productName}</span>
        </div>
      );
    },
  },
  {
    title: "Price",
    dataIndex: "productPrice",
    key: "productPrice",
  },
  {
    title: "Model",
    dataIndex: "productModel",
    key: "productModel",
  },
  {
    title: "Capacity",
    dataIndex: "productCapacity",
    key: "productCapacity",
  },
  {
    title: "Power",
    dataIndex: "productPower",
    key: "productPower",
  },
  {
    title: "Status",
    dataIndex: "productStatus",
    key: "productStatus",
    render: (_, record) => {
      let statusColor =
        record.productStatus === "Available"
          ? "text-green-600"
          : record.productStatus === "Out of Stock"
          ? "text-red-600"
          : "text-[#f4e1b9]"; // "Low Stock" appears yellow

      return (
        <span className={`${statusColor} text-sm font-semibold`}>
          {record.productStatus}
        </span>
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <div className="flex items-center gap-4">
        <button onClick={() => showEditModal(record)}>
          <FiEdit size={24} />
        </button>
        <button onClick={() => showDeleteModal(record)}>
          <MdDeleteOutline size={25} className="text-red-600" />
        </button>
      </div>
    ),
  },
];
