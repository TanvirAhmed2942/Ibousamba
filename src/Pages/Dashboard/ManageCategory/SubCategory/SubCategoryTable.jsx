import { useState } from "react";
import { Table, ConfigProvider, Alert } from "antd";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

import EditDeleteSubCategoryModal from "./EditDeleteSubCategoryModal";
import { useGetSubCategoriesQuery } from "../../../../redux/apiSlices/subCategorySlice";
import { imageUrl } from "../../../../redux/api/baseApi";

const SubCategoryTable = ({ categoryID }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("edit"); // "edit" or "delete"
  const [currentRecord, setCurrentRecord] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  // Fetch subcategories from API only if categoryID is valid
  const { data, isLoading, error } = useGetSubCategoriesQuery(categoryID, {
    skip: !categoryID, // Skip the query if categoryID is undefined
  });

  // console.log("Category ID Sent in URL:", categoryID);
  console.log("Subcategories Response:", data);

  // Transform API data for table
  const subCategoryData =
    data?.data?.map((item, index) => ({
      key: item._id,
      serial: String(index + 1).padStart(3, "0"),
      categoryImg: item.image || "https://via.placeholder.com/50", // Fallback Image
      category: item.name,
    })) || [];

  const columns = [
    {
      title: "#Sl",
      key: "serial",
      dataIndex: "serial",
      render: (item, record, index) => <>{`#${index + 1}`}</>,
    },
    {
      title: "Image",
      dataIndex: "categoryImg",
      key: "categoryImg",
      render: (_, record) => (
        <img
          src={`${imageUrl}${record?.categoryImg}`}
          alt="Category"
          style={{ width: 50 }}
        />
      ),
    },
    { title: "Sub-CAtegory", dataIndex: "category", key: "category" },
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
      console.log("Updated category:", categoryName);
    } else {
      console.log("Deleted category:", currentRecord.category);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {error && (
        <Alert
          message="Error fetching subcategories"
          description={error.message}
          type="error"
          showIcon
          className="mb-4"
        />
      )}

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
          <Table
            columns={columns}
            dataSource={subCategoryData}
            loading={isLoading}
            pagination={{
              defaultPageSize: 5,
              position: ["bottomRight"],
              size: "default",
              total: subCategoryData.length,
            }}
          />
        </div>
      </ConfigProvider>

      {/* Modal for Edit and Delete */}
      <EditDeleteSubCategoryModal
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

export default SubCategoryTable;
