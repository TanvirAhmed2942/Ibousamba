// import { useState } from "react";
// import { Table, ConfigProvider, message } from "antd";
// import { FiEdit } from "react-icons/fi";
// import { MdDeleteOutline } from "react-icons/md";

// import EditDeleteCategoryModal from "./EditDeleteCategoryModal";
// import {
//   useCategoryQuery,
//   useDeleteCategoryMutation,
//   useUpdateCategoryMutation,
// } from "../../../../redux/apiSlices/categorySlice";
// import { imageUrl } from "../../../../redux/api/baseApi";

// const MainCategoryTable = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [modalMode, setModalMode] = useState("edit"); // "edit" or "delete"
//   const [currentRecord, setCurrentRecord] = useState(null);

//   const { data } = useCategoryQuery();
//   const [deleteCategory] = useDeleteCategoryMutation();
//   const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

//   const handleClose = () => {
//     setIsModalVisible(false);
//   };

//   const handleDeleteCategory = async () => {
//     try {
//       const response = await deleteCategory(currentRecord._id);
//       message.success(`Successfully deleted`);
//       console.log("Category Deletion Response:", response);
//       setIsModalVisible(false);
//     } catch (err) {
//       console.log("Category Deletion Error:", err);
//       message.error("Failed to delete category");
//     }
//   };

//   const handleEditCategory = async (
//     data,
//     imageBase64,
//     updatedName,
//     currentRecord
//   ) => {
//     console.log(data);

//     try {
//       // Create a new FormData object to send the data
//       const formData = new FormData();

//       // Append the category name to the FormData object
//       formData.append("name", updatedName);

//       // If there's a new image (base64), convert it to a file and append it to the FormData object
//       if (imageBase64) {
//         // Convert base64 to a file (assuming the image is in PNG format)
//         const byteCharacters = atob(imageBase64.split(",")[1]);
//         const byteNumbers = new Array(byteCharacters.length);
//         for (let i = 0; i < byteCharacters.length; i++) {
//           byteNumbers[i] = byteCharacters.charCodeAt(i);
//         }
//         const byteArray = new Uint8Array(byteNumbers);
//         const blob = new Blob([byteArray], { type: "image/png" });
//         const file = new File([blob], "image.png", { type: "image/png" });

//         formData.append("image", file);
//       }

//       // Log the FormData object content
//       formData.forEach((value, key) => {
//         console.log(`${key}: ${value}`);
//       });

//       console.log("Updating category with FormData:", {
//         id: currentRecord._id,
//         updatedName: updatedName,
//         hasImage: !!imageBase64,
//       });

//       // Send the FormData to the backend
//       const response = await updateCategory({
//         id: currentRecord._id,
//         data: formData, // Send FormData as the payload
//       }).unwrap();

//       message.success("Successfully updated category");
//       console.log("Category Update Response:", response);
//       setIsModalVisible(false);
//     } catch (err) {
//       console.log("Category Update Error:", err);
//       message.error("Failed to update category");
//     }
//   };
//   const columns = [
//     {
//       title: "#Sl",
//       key: "serial",
//       dataIndex: "serial",
//       render: (item, record, index) => <>{`#${index + 1}`}</>,
//     },
//     {
//       title: "Image",
//       dataIndex: "image",
//       key: "image",
//       render: (_, record) => (
//         <img
//           src={`${imageUrl}${record?.image}`}
//           alt="Category"
//           style={{ width: 50 }}
//         />
//       ),
//     },
//     { title: "Category", dataIndex: "name", key: "name" },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <div className="flex items-center gap-3">
//           <button
//             className="btn btn-sm btn-outline-primary"
//             onClick={() => openEditModal(record)}
//           >
//             <FiEdit size={20} />
//           </button>
//           <button
//             className="btn btn-sm btn-outline-primary"
//             onClick={() => openDeleteModal(record)}
//           >
//             <MdDeleteOutline size={25} className="text-red-600" />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const openEditModal = (record) => {
//     setModalMode("edit");
//     setCurrentRecord(record);
//     setIsModalVisible(true);
//   };

//   const openDeleteModal = (record) => {
//     setModalMode("delete");
//     setCurrentRecord(record);
//     setIsModalVisible(true);
//   };

//   return (
//     <div>
//       <ConfigProvider
//         theme={{
//           components: {
//             Table: {
//               headerBg: "#575858",
//               headerSplitColor: "none",
//               headerColor: "white",
//               borderColor: "#A3A3A3",
//               colorBgContainer: "#3a3a3a",
//               rowHoverBg: "#4a4a4a",
//               colorText: "white",
//             },
//           },
//         }}
//       >
//         <div className="custom-table">
//           <Table
//             columns={columns}
//             dataSource={data?.data}
//             pagination={{
//               defaultPageSize: 5,
//               position: ["bottomRight"],
//               size: "default",
//               total: data?.data?.length || 0,
//             }}
//           />
//         </div>
//       </ConfigProvider>

//       {/* Modal for Edit and Delete */}
//       <EditDeleteCategoryModal
//         visible={isModalVisible}
//         onCancel={handleClose}
//         onDelete={handleDeleteCategory}
//         mode={modalMode}
//         record={currentRecord}
//         onCategoryChange={handleEditCategory}
//       />
//     </div>
//   );
// };

// export default MainCategoryTable;

import { useState } from "react";
import { Table, ConfigProvider, message } from "antd";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

import EditDeleteCategoryModal from "./EditDeleteCategoryModal";
import {
  useCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../../redux/apiSlices/categorySlice";
import { imageUrl } from "../../../../redux/api/baseApi";

const MainCategoryTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("edit"); // "edit" or "delete"
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data } = useCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const handleClose = () => {
    setIsModalVisible(false);
    setCurrentRecord(null); // Clear the current record when closing
  };

  const handleDeleteCategory = async () => {
    if (!currentRecord || !currentRecord._id) {
      message.error("Invalid category selected");
      return;
    }

    try {
      const response = await deleteCategory(currentRecord._id);
      message.success(`Successfully deleted`);
      console.log("Category Deletion Response:", response);
      setIsModalVisible(false);
      setCurrentRecord(null); // Clear the current record after deletion
    } catch (err) {
      console.log("Category Deletion Error:", err);
      message.error("Failed to delete category");
    }
  };

  const handleEditCategory = async (file, updatedName, record) => {
    // Use the provided record parameter instead of currentRecord state
    // This ensures we're working with the correct record data
    if (!record || !record._id) {
      message.error("Invalid category selected");
      return;
    }

    try {
      // Create a new FormData object to send the data
      const formData = new FormData();

      // Append the category name to the FormData object
      formData.append("name", updatedName); // Ensure updatedName is valid

      // If there's a new file (image), append it to the FormData object
      if (file) {
        formData.append("image", file); // Append the image file directly
      }

      // Log the FormData object content
      console.log("Form data contents:");
      formData.forEach((value, key) => {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      });

      console.log("Updating category with FormData:", {
        id: record._id,
        updatedName: updatedName,
        hasImage: !!file,
      });

      // Send the FormData to the backend
      const response = await updateCategory({
        id: record._id,
        data: formData, // Send FormData as the payload
      }).unwrap();

      message.success("Successfully updated category");
      console.log("Category Update Response:", response);
      setIsModalVisible(false);
      setCurrentRecord(null); // Clear the current record after update
    } catch (err) {
      console.log("Category Update Error:", err);
      message.error(
        "Failed to update category: " + (err.message || "Unknown error")
      );
    }
  };

  const columns = [
    {
      title: "#Sl",
      key: "serial",
      dataIndex: "serial",
      render: (item, record, index) => <>{`#${index + 1}`}</>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          src={`${imageUrl}${record?.image}`}
          alt="Category"
          style={{ width: 50 }}
        />
      ),
    },
    { title: "Category", dataIndex: "name", key: "name" },
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
    setCurrentRecord({ ...record }); // Make a copy of the record to prevent mutations
    setIsModalVisible(true);
  };

  const openDeleteModal = (record) => {
    setModalMode("delete");
    setCurrentRecord({ ...record }); // Make a copy of the record to prevent mutations
    setIsModalVisible(true);
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
          <Table
            columns={columns}
            dataSource={data?.data}
            rowKey="_id" // Ensure each row has a unique key
            pagination={{
              defaultPageSize: 5,
              position: ["bottomRight"],
              size: "default",
              total: data?.data?.length || 0,
            }}
          />
        </div>
      </ConfigProvider>

      {/* Modal for Edit and Delete */}
      <EditDeleteCategoryModal
        visible={isModalVisible}
        onCancel={handleClose}
        onDelete={handleDeleteCategory}
        mode={modalMode}
        record={currentRecord}
        onCategoryChange={handleEditCategory}
      />
    </div>
  );
};

export default MainCategoryTable;
