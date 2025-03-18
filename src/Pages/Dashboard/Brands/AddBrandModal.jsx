import React, { useEffect, useState } from "react";
import {
  Modal,
  ConfigProvider,
  Form,
  Input,
  Button,
  Upload,
  Image,
  message,
} from "antd";
import { LiaCloudUploadAltSolid } from "react-icons/lia";

const AddBrandModal = ({
  isModalOpen,
  handleClose,
  handleSave,
  initialBrand,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (initialBrand) {
      form.setFieldsValue({ name: initialBrand.name });
      setPreviewImage(initialBrand.Img || ""); // Existing image preview
    } else {
      form.resetFields();
      setPreviewImage("");
      setFileList([]);
    }
  }, [initialBrand, form]);

  // Handle Image Upload Change
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      setPreviewImage(URL.createObjectURL(newFileList[0].originFileObj));
    } else {
      setPreviewImage("");
    }
  };

  // Handle Form Submit
  const onFinish = (values) => {
    try {
      const imageToSend =
        fileList.length > 0 ? fileList[0].originFileObj : null;

      if (!imageToSend && !initialBrand?.Img) {
        message.error("Please upload an image");
        return;
      }

      const brandData = {
        name: values.name,
        Img: imageToSend || initialBrand.Img,
      };

      console.log("Form data on save:", brandData);
      handleSave(brandData);
    } catch (error) {
      console.error("Form submission error:", error);
      message.error("Failed to save brand information");
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: { contentBg: "#f4e1b9", headerBg: "#f4e1b9" },
          Button: {
            defaultBg: "#d99e1e",
            defaultColor: "white",
            defaultHoverBg: "#d99e1e",
            defaultHoverColor: "white",
            defaultActiveBg: "#d99e1e",
            defaultActiveColor: "white",
          },
        },
      }}
    >
      <Modal
        title={initialBrand ? "Edit Brand" : "Add New Brand"}
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* Upload Component */}
          <Form.Item label="Brand Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false} // Prevent automatic upload
              showUploadList={false}
            >
              {fileList.length >= 1 ? null : (
                <div className="flex flex-col items-center">
                  <LiaCloudUploadAltSolid size={25} className="text-black" />
                  <p className="text-black">Click or drag file to upload</p>
                </div>
              )}
            </Upload>
          </Form.Item>

          {/* Image Preview */}
          {previewImage && (
            <Form.Item label="Preview">
              <div className="flex justify-center">
                <Image src={previewImage} width={100} />
                <Button
                  size="small"
                  danger
                  onClick={() => {
                    setFileList([]);
                    setPreviewImage("");
                  }}
                  className="ml-2"
                >
                  Remove
                </Button>
              </div>
            </Form.Item>
          )}

          <Form.Item
            label="Brand Name"
            name="name"
            rules={[{ required: true, message: "Please enter a brand name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button block htmlType="submit">
              {initialBrand ? "Update" : "Save"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddBrandModal;
