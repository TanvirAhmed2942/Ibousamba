import React, { useState } from "react";
import {
  Modal,
  ConfigProvider,
  Form,
  Input,
  Button,
  Image,
  Upload,
} from "antd";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
const AddBrandModal = ({ isModalOpen, handleClose }) => {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  // Preview Image Handler
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Handle Image Upload Change
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Convert File to Base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
      <Modal
        title="Add New Brand"
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        closable
      >
        <Form layout="vertical" className="flex flex-col gap-1">
          {/* Upload Component with white background */}
          <Form.Item label="Brand Image" required>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : (
                <div className="w-full flex items-center justify-center">
                  <div className="mt-2 text-black flex flex-col items-center">
                    <LiaCloudUploadAltSolid size={25} />
                    Upload
                  </div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {/* Single Image Preview */}
          {previewImage && (
            <Form.Item>
              <div className="flex justify-center">
                <Image
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                  style={{ width: "100%", maxWidth: 300 }}
                />
              </div>
            </Form.Item>
          )}

          {/* Category Name Form */}
          <Form.Item
            label="Brand Url Link"
            name="brandUrl"
            rules={[
              {
                required: true,
                message: "Enter your Brand Link",
              },
            ]}
          >
            <Input className="h-9" />
          </Form.Item>

          {/* Save Button */}
          <Form.Item>
            <Button block className="h-9">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default AddBrandModal;
