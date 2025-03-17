// import React, { useState, useEffect } from "react";
// import { Modal, Form, Input, ConfigProvider, Select } from "antd";
// import UploadComponent from "./UploadComponent";
// import { MdOutlineArrowDropDown } from "react-icons/md";
// import { useCategoryQuery } from "../../../redux/apiSlices/categorySlice";
// import { useGetSubCategoriesQuery } from "../../../redux/apiSlices/subCategorySlice";

// function AddProductModal({
//   isModalOpen,
//   setIsModalOpen,
//   addProduct,
//   editProduct,
//   editingProduct,
// }) {
//   const [form] = Form.useForm();
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSCategory] = useState(null);
//   const [categoryID, setCategoryID] = useState(null); // Define the categoryID state
//   const [subCategoryID, setSCategoryID] = useState(null); // Define the categoryID state
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const { data: categoryData } = useCategoryQuery();
//   const { data: subCategoryData, isFetching: isSubCategoryLoading } =
//     useGetSubCategoriesQuery(categoryID, {
//       skip: !categoryID, // Only fetch subcategories if a category is selected
//     });

//   const handleCategoryChange = (value) => {
//     setSelectedCategory(value);
//     setCategoryID(value); // Set the selected category ID
//     console.log("Selected Category ID:", value); // Log the category ID
//     setSelectedSCategory(null); // Reset subcategory when category changes
//   };

//   const handleSubCategoryChange = (value) => {
//     setSelectedSCategory(value);
//     setSCategoryID(value); // Set the selected subcategory ID
//     console.log("Selected Sub Category ID:", value); // Log the subcategory ID
//   };

//   // Populate form fields when editing a product
//   useEffect(() => {
//     if (editingProduct) {
//       form.setFieldsValue(editingProduct);
//       setUploadedFiles(editingProduct.images || []);
//     } else {
//       form.resetFields();
//       setUploadedFiles([]);
//     }
//   }, [editingProduct, form]);

//   const onFinish = () => {
//     const formData = form.getFieldsValue(); // Get all form data
//     console.log("Form Data: ", formData); // Log form data

//     const updatedProduct = {
//       ...formData,
//       images: uploadedFiles,
//       key: editingProduct ? editingProduct.key : Date.now().toString(),
//     };

//     if (editingProduct) {
//       editProduct(updatedProduct); // Update existing product
//     } else {
//       addProduct(updatedProduct); // Add new product
//     }

//     form.resetFields();
//     setUploadedFiles([]);
//     setIsModalOpen(false);
//   };

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Modal: {
//             contentBg: "#292929",
//             headerBg: "#292929",
//             titleColor: "#ffffff",
//             titleFontSize: 24,
//           },
//           Form: { labelColor: "#efefef" },
//           Input: {
//             colorBgBase: "#1f1f1f",
//             colorBgContainer: "#1f1f1f",
//             colorBorder: "transparent",
//             boxShadow: "none",
//           },
//         },
//       }}
//     >
//       <Modal
//         title={editingProduct ? "Edit Product Details" : "Add Product Details"}
//         open={isModalOpen}
//         width={1000}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//         centered
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           className="flex flex-col"
//           style={{ padding: 5, marginBlockStart: 15 }}
//           onFinish={onFinish}
//         >
//           <div className="flex gap-4">
//             {/* Left Section */}
//             <div className="w-1/2">
//               <Form.Item
//                 label="Category"
//                 name="productCategory"
//                 rules={[{ required: true, message: "Category required!" }]}
//               >
//                 <Select
//                   className="bg-[#1f1f1f] border-none h-12 text-slate-300 flex items-center rounded-md"
//                   suffixIcon={
//                     <MdOutlineArrowDropDown size={25} className="text-white" />
//                   }
//                   placeholder="Select a Category"
//                   value={selectedCategory} // Bind selected value
//                   onChange={handleCategoryChange} // Handle change
//                 >
//                   {categoryData?.data?.map((category) => (
//                     <Select.Option key={category._id} value={category._id}>
//                       {category.name}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item
//                 label="Product Name"
//                 name="productName"
//                 rules={[{ required: true, message: "Product Name required!" }]}
//               >
//                 <Input
//                   placeholder="Enter product name"
//                   className="bg-[#1f1f1f] border-none h-12 text-slate-300"
//                 />
//               </Form.Item>
//               <Form.Item
//                 label="Capacity"
//                 name="productCapacity"
//                 rules={[
//                   { required: true, message: "Product Capacity required!" },
//                 ]}
//               >
//                 <Input
//                   placeholder="Enter product capacity"
//                   className="bg-[#1f1f1f] border-none h-12 text-slate-300"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Model"
//                 name="productModel"
//                 rules={[{ required: true, message: "Product Model required!" }]}
//               >
//                 <Input
//                   placeholder="Enter product model"
//                   className="bg-[#1f1f1f] border-none h-12 text-slate-300"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Type"
//                 name="productType"
//                 rules={[{ required: true, message: "Product Type required!" }]}
//               >
//                 <Input
//                   placeholder="Enter product type"
//                   className="bg-[#1f1f1f] border-none h-12 text-slate-300"
//                 />
//               </Form.Item>

//               <Form.Item label="Power" name="productPower">
//                 <Input
//                   placeholder="Enter product power"
//                   className="bg-[#1f1f1f] border-none h-12 text-slate-300"
//                 />
//               </Form.Item>
//             </div>

//             {/* Right Section */}
//             <div className="w-1/2">
//               <Form.Item
//                 label="Sub-category"
//                 name="productSubCategory"
//                 rules={[{ required: true, message: "Sub-category required!" }]}
//               >
//                 <Select
//                   className="bg-[#1f1f1f] border-none h-12 text-slate-300 flex items-center rounded-md"
//                   suffixIcon={
//                     <MdOutlineArrowDropDown size={25} className="text-white" />
//                   }
//                   placeholder="Select a Sub-category"
//                   value={selectedSubCategory} // Bind selected value
//                   onChange={handleSubCategoryChange} // Handle change
//                   disabled={isSubCategoryLoading || !categoryID} // Disable if no category selected or subcategories are loading
//                 >
//                   {subCategoryData?.data?.map((subCategory) => (
//                     <Select.Option
//                       key={subCategory._id}
//                       value={subCategory._id}
//                     >
//                       {subCategory.name}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item
//                 label="Product Price"
//                 name="productPrice"
//                 rules={[{ required: true, message: "Product Price required!" }]}
//               >
//                 <Input
//                   placeholder="Enter product price"
//                   className="bg-[#1f1f1f] border-none h-12 text-slate-300"
//                   onInput={(e) =>
//                     (e.target.value = e.target.value.replace(/[^0-9.]/g, ""))
//                   }
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Product Description"
//                 name="productDescription"
//                 rules={[
//                   { required: true, message: "Product Description required!" },
//                 ]}
//               >
//                 <Input.TextArea
//                   placeholder="Write product description"
//                   className="border-none text-slate-300"
//                   style={{
//                     resize: "none",
//                     height: "175px",
//                     overflowY: "scroll",
//                     scrollbarWidth: "none",
//                   }}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Product Gallery"
//                 name="productImage"
//                 rules={[
//                   {
//                     required: uploadedFiles.length === 0,
//                     message: "Product Image required!",
//                   },
//                 ]}
//               >
//                 <UploadComponent
//                   onFileUpload={setUploadedFiles}
//                   existingFiles={uploadedFiles}
//                 />
//               </Form.Item>
//             </div>
//           </div>

//           <Form.Item>
//             <button
//               type="submit"
//               className="w-full h-12 bg-samba hover:bg-samba/90 text-white text-[18px] font-medium rounded-lg"
//             >
//               {editingProduct ? "Update Product" : "Add Product"}
//             </button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ConfigProvider>
//   );
// }

// export default AddProductModal;

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, ConfigProvider, Select } from "antd";
import UploadComponent from "./UploadComponent";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useCategoryQuery } from "../../../redux/apiSlices/categorySlice";
import { useGetSubCategoriesQuery } from "../../../redux/apiSlices/subCategorySlice";

function AddProductModal({
  isModalOpen,
  setIsModalOpen,
  addProduct,
  editProduct,
  editingProduct,
}) {
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSCategory] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { data: categoryData } = useCategoryQuery();
  const { data: subCategoryData, isFetching: isSubCategoryLoading } =
    useGetSubCategoriesQuery(categoryID, { skip: !categoryID });

  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue(editingProduct);
      setUploadedFiles(editingProduct.images || []);
    } else {
      form.resetFields();
      setUploadedFiles([]);
    }
  }, [editingProduct, form]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCategoryID(value);
    setSelectedSCategory(null);
  };

  const handleSubCategoryChange = (value) => {
    setSelectedSCategory(value);
  };

  const onFinish = (values) => {
    const formData = new FormData();

    // Append all form fields
    for (let key in values) {
      formData.append(key, values[key]);
    }

    // Append images
    uploadedFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file.originFileObj || file);
    });

    // Log formData values
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Reset form
    form.resetFields();
    setUploadedFiles([]);
    setIsModalOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#292929",
            headerBg: "#292929",
            titleColor: "#ffffff",
            titleFontSize: 24,
          },
          Form: { labelColor: "#efefef" },
          Input: {
            colorBgBase: "#1f1f1f",
            colorBgContainer: "#1f1f1f",
            colorBorder: "transparent",
            boxShadow: "none",
          },
        },
      }}
    >
      <Modal
        title={editingProduct ? "Edit Product Details" : "Add Product Details"}
        open={isModalOpen}
        width={1000}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          style={{ padding: 5, marginBlockStart: 15 }}
          onFinish={onFinish}
        >
          <div className="flex gap-4">
            <div className="w-1/2">
              <Form.Item
                label="Category"
                name="productCategory"
                rules={[{ required: true, message: "Category required!" }]}
              >
                <Select
                  className="bg-[#1f1f1f] border-none h-12 text-slate-300 flex items-center rounded-md"
                  suffixIcon={
                    <MdOutlineArrowDropDown size={25} className="text-white" />
                  }
                  placeholder="Select a Category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {categoryData?.data?.map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Product Name"
                name="productName"
                rules={[{ required: true, message: "Product Name required!" }]}
              >
                <Input
                  placeholder="Enter product name"
                  className="bg-[#1f1f1f] border-none h-12 text-slate-300"
                />
              </Form.Item>

              <Form.Item
                label="Capacity"
                name="productCapacity"
                rules={[
                  { required: true, message: "Product Capacity required!" },
                ]}
              >
                <Input
                  placeholder="Enter product capacity"
                  className="bg-[#1f1f1f] border-none h-12 text-slate-300"
                />
              </Form.Item>

              <Form.Item
                label="Model"
                name="productModel"
                rules={[{ required: true, message: "Product Model required!" }]}
              >
                <Input
                  placeholder="Enter product model"
                  className="bg-[#1f1f1f] border-none h-12 text-slate-300"
                />
              </Form.Item>

              <Form.Item
                label="Type"
                name="productType"
                rules={[{ required: true, message: "Product Type required!" }]}
              >
                <Input
                  placeholder="Enter product type"
                  className="bg-[#1f1f1f] border-none h-12 text-slate-300"
                />
              </Form.Item>

              <Form.Item label="Power" name="productPower">
                <Input
                  placeholder="Enter product power"
                  className="bg-[#1f1f1f] border-none h-12 text-slate-300"
                />
              </Form.Item>
            </div>

            <div className="w-1/2">
              <Form.Item
                label="Sub-category"
                name="productSubCategory"
                rules={[{ required: true, message: "Sub-category required!" }]}
              >
                <Select
                  className="bg-[#1f1f1f] border-none h-12 text-slate-300 flex items-center rounded-md"
                  suffixIcon={
                    <MdOutlineArrowDropDown size={25} className="text-white" />
                  }
                  placeholder="Select a Sub-category"
                  value={selectedSubCategory}
                  onChange={handleSubCategoryChange}
                  disabled={isSubCategoryLoading || !categoryID}
                >
                  {subCategoryData?.data?.map((subCategory) => (
                    <Select.Option
                      key={subCategory._id}
                      value={subCategory._id}
                    >
                      {subCategory.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Product Price"
                name="productPrice"
                rules={[{ required: true, message: "Product Price required!" }]}
              >
                <Input
                  placeholder="Enter product price"
                  className="bg-[#1f1f1f] border-none h-12 text-slate-300"
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9.]/g, ""))
                  }
                />
              </Form.Item>

              <Form.Item
                label="Product Description"
                name="productDescription"
                rules={[
                  { required: true, message: "Product Description required!" },
                ]}
              >
                <Input.TextArea
                  placeholder="Write product description"
                  className="border-none text-slate-300"
                  style={{
                    resize: "none",
                    height: "175px",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                  }}
                />
              </Form.Item>

              <Form.Item label="Product Gallery" name="productImage">
                <UploadComponent
                  onFileUpload={setUploadedFiles}
                  existingFiles={uploadedFiles}
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <button
              type="submit"
              className="w-full h-12 bg-samba hover:bg-samba/90 text-white text-[18px] font-medium rounded-lg"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

export default AddProductModal;
