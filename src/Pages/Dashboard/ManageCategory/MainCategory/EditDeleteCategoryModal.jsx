import React, { useState, useEffect } from "react";
import {
  Modal,
  Input,
  Button,
  ConfigProvider,
  Form,
  Upload,
  Image,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { imageUrl } from "../../../../redux/api/baseApi";

const EditDeleteCategoryModal = ({
  visible,
  onCancel,
  mode,
  record,
  onCategoryChange,
  onDelete,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageBase64, setImageBase64] = useState("");

  // Update form and state when record or visibility changes
  useEffect(() => {
    if (record && visible) {
      form.setFieldsValue({
        categoryName: record.name || "",
      });
      setPreviewImage(`${imageUrl}${record.image}`);
      setIsEditingImage(false);
      setFileList([]);
      setImageBase64("");
    }
  }, [record, visible, form]);

  // Convert file to base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedName = values.categoryName;

      // Submit both the name and image (if changed)
      onCategoryChange(record, imageBase64, updatedName);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  // Handle file changes (uploading a new image)
  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // If there's a file, convert it to base64
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      const base64 = await getBase64(newFileList[0].originFileObj);
      setImageBase64(base64);
      setPreviewImage(base64); // Also update preview
    }
  };

  // Toggle between displaying the image and uploading a new one
  const handleEditClick = () => {
    setIsEditingImage(true);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#f4e1b9",
            headerBg: "#f4e1b9",
          },
          Input: {
            hoverBorderColor: "none",
            activeBorderColor: "none",
          },
        },
      }}
    >
      <Modal
        title={mode === "edit" ? "Edit Category" : "Delete Category"}
        open={visible}
        onCancel={onCancel}
        closable={true}
        footer={
          mode === "edit"
            ? [
                <Button key="cancel" onClick={onCancel}>
                  Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                  Save
                </Button>,
              ]
            : [
                <div
                  key="footer"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Button key="cancel" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button key="delete" type="primary" danger onClick={onDelete}>
                    Delete
                  </Button>
                </div>,
              ]
        }
      >
        {mode === "edit" ? (
          <div>
            <Form form={form} layout="vertical" className="flex flex-col gap-1">
              {/* Image Display/Upload */}
              {!isEditingImage ? (
                <Form.Item>
                  <div className="flex justify-center relative">
                    <Image
                      preview={false}
                      src={previewImage}
                      style={{ width: "100%", maxWidth: 300 }}
                      alt="Category"
                    />
                    <Button
                      onClick={handleEditClick}
                      className="absolute top-0 right-0"
                      icon={<EditOutlined />}
                      shape="circle"
                      size="large"
                    />
                  </div>
                </Form.Item>
              ) : (
                <Form.Item>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={() => false} // Prevent auto upload
                  >
                    {fileList.length >= 1 ? null : (
                      <div className="w-full flex items-center justify-center">
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              )}

              {/* Category Name Form */}
              <Form.Item
                label="Category Name"
                name="categoryName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Category Name",
                  },
                ]}
              >
                <Input className="h-9" />
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <p className="text-black my-2">
              Are you sure you want to delete the category{" "}
              <strong>{record?.name}</strong>?
            </p>
          </div>
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default EditDeleteCategoryModal;
