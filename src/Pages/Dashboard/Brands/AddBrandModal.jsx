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
  const [imageData, setImageData] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Convert File to Base64 for both preview and storage
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Populate form when editing
  useEffect(() => {
    if (initialBrand) {
      form.setFieldsValue({ name: initialBrand.name });
      if (initialBrand.Img) {
        setPreviewImage(initialBrand.Img);
      }
    } else {
      form.resetFields();
      setPreviewImage("");
      setFileList([]);
      setImageData(null);
    }
  }, [initialBrand, form]);

  // Handle Image Upload Change
  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // If there's a file, convert it to base64
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      try {
        const base64Data = await getBase64(newFileList[0].originFileObj);
        setImageData(base64Data);
        setPreviewImage(base64Data);
        console.log("Image converted to base64");
      } catch (error) {
        console.error("Error converting image to base64:", error);
        message.error("Failed to process the image");
      }
    } else {
      setImageData(null);
      setPreviewImage("");
    }
  };

  // Handle Form Submit
  const onFinish = (values) => {
    try {
      // Determine which image to use
      const imageToSend = imageData || initialBrand?.Img || null;

      // If no image is selected, show an error
      if (!imageToSend) {
        message.error("Please upload an image");
        return;
      }

      // Create the object to save
      const brandData = {
        name: values.name,
        Img: imageToSend,
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
            defaultHoverBg: "#d99e1e", // Fixed missing # symbol
            defaultHoverColor: "white",
            defaultHoverBorderColor: "none",
            defaultActiveBg: "#d99e1e",
            defaultActiveColor: "white",
            defaultActiveBorderColor: "#d99e1e", // Fixed missing # symbol
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
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          className="flex flex-col gap-2"
        >
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
                    setImageData(null);
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
            <Input className="h-10" />
          </Form.Item>

          <Form.Item>
            <Button block htmlType="submit" className="h-10">
              {initialBrand ? "Update" : "Save"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddBrandModal;
