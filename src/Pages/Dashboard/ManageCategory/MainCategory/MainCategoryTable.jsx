// import React, { useState } from "react";
import { Table, ConfigProvider, Modal, Input, Button } from "antd";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline, MdOutlineDeleteForever } from "react-icons/md";

import EditDeleteCategoryModal from "./EditDeleteCategoryModal";
import { useState } from "react";

const MainCategoryTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("edit"); // "edit" or "delete"
  const [currentRecord, setCurrentRecord] = useState(null);
  const [categoryName, setCategoryName] = useState("");

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
        <div className="flex items-center gap-3">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => openEditModal(record)}
          >
            <FiEdit size={20} />
          </button>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => openDeleteModal(record)}
          >
            <MdDeleteOutline size={25} className="text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  const openEditModal = (record) => {
    setModalMode("edit");
    setCurrentRecord(record);
    setCategoryName(record.category);
    setIsModalVisible(true);
  };

  const openDeleteModal = (record) => {
    setModalMode("delete");
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (modalMode === "edit") {
      // Handle the category name update here
      console.log("Updated category:", categoryName);
    } else {
      // Handle the category deletion here
      console.log("Deleted category:", currentRecord.category);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

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

      {/* Modal for Edit and Delete */}
      <EditDeleteCategoryModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        mode={modalMode}
        record={currentRecord}
        categoryName={categoryName}
        onCategoryChange={(name) => setCategoryName(name)}
      />
    </div>
  );
};

export default MainCategoryTable;

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
