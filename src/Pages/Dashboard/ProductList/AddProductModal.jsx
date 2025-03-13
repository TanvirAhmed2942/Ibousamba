import React, { useState, useEffect } from "react";
import { Modal, Form, Input, ConfigProvider, Select } from "antd";
import UploadComponent from "./UploadComponent";
import { MdOutlineArrowDropDown } from "react-icons/md";

function AddProductModal({
  isModalOpen,
  setIsModalOpen,
  addProduct,
  editProduct,
  editingProduct,
}) {
  const [form] = Form.useForm();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Populate form fields when editing a product
  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue(editingProduct);
      setUploadedFiles(editingProduct.images || []);
    } else {
      form.resetFields();
      setUploadedFiles([]);
    }
  }, [editingProduct, form]);

  const onFinish = (values) => {
    const updatedProduct = {
      ...values,
      images: uploadedFiles,
      key: editingProduct ? editingProduct.key : Date.now().toString(),
    };

    if (editingProduct) {
      editProduct(updatedProduct); // Update existing product
    } else {
      addProduct(updatedProduct); // Add new product
    }

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
          className="flex flex-col"
          style={{ padding: 5, marginBlockStart: 15 }}
          onFinish={onFinish}
        >
          <div className="flex gap-4">
            {/* Left Section */}
            <div className="w-1/2">
              <Form.Item
                label="Category"
                name="productCategory"
                rules={[{ required: true, message: "Category required!" }]}
              >
                <Select
                  // className="flex items-center gap-2  w-40 border rounded-md"
                  className="bg-[#1f1f1f] border-none h-12 text-slate-300 flex items-center rounded-md"
                  suffixIcon={
                    <MdOutlineArrowDropDown size={25} className="text-white" />
                  }
                  placeholder="Select a Category"
                  options={[
                    {
                      value: "1",
                      label: "All Terrain vehicle",
                    },
                    {
                      value: "2",
                      label: "Articulated Dump truck Compactors",
                    },
                    {
                      value: "3",
                      label: "Construction",
                    },
                    {
                      value: "4",
                      label: "Cranes",
                    },
                    {
                      value: "5",
                      label: "Dozers",
                    },
                    {
                      value: "6",
                      label: "Drills Excavators Front shovels",
                    },
                    {
                      value: "7",
                      label: "Loader Backhoes",
                    },
                    {
                      value: "8",
                      label: "Loaders",
                    },
                    {
                      value: "9",
                      label: "Moto Graders",
                    },
                    {
                      value: "10",
                      label: "Generator sets",
                    },
                  ]}
                />
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

            {/* Right Section */}
            <div className="w-1/2">
              <Form.Item
                label="Sub-category"
                name="productSubCategory"
                rules={[{ required: true, message: "Sub-category required!" }]}
              >
                {/* <Input
                  placeholder="Enter product sub-category"
                  className="bg-[#1f1f1f] border-none h-12 text-slate-300"
                /> */}
                <Select
                  // className="flex items-center gap-2  w-40 border rounded-md"
                  className="bg-[#1f1f1f] border-none h-12 text-slate-300 flex items-center rounded-md"
                  suffixIcon={
                    <MdOutlineArrowDropDown size={25} className="text-white" />
                  }
                  placeholder="Select a Sub-category"
                  options={[
                    {
                      value: "1",
                      label: "Articulated dump truck",
                    },
                    {
                      value: "2",
                      label: "Dozers",
                    },
                    {
                      value: "3",
                      label: "Drills",
                    },
                    {
                      value: "3",
                      label: "Rock truck",
                    },
                    {
                      value: "4",
                      label: "Water wagon ",
                    },
                  ]}
                />
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

              <Form.Item
                label="Product Gallery"
                name="productImage"
                rules={[
                  {
                    required: uploadedFiles.length === 0,
                    message: "Product Image required!",
                  },
                ]}
              >
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
