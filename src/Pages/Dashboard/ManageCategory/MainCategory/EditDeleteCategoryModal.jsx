import React, { useState } from "react";
import {
  Modal,
  Input,
  Button,
  ConfigProvider,
  Form,
  Upload,
  Image,
} from "antd";
import { EditOutlined } from "@ant-design/icons"; // Edit icon from Ant Design

const EditDeleteCategoryModal = ({
  visible,
  onCancel,
  onOk,
  mode,
  record,
  onCategoryChange,
  handleClose,
}) => {
  const [categoryName, setCategoryName] = useState(
    record ? record.category : ""
  );
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(
    record ? record.categoryImg : ""
  );
  const [isEditingImage, setIsEditingImage] = useState(false); // Flag to toggle between static image and upload component

  const handleOk = () => {
    if (mode === "edit") {
      onCategoryChange(categoryName, fileList);
    }
    onOk();
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleEditClick = () => {
    setIsEditingImage(true); // Enable the upload view when the edit icon is clicked
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
        title={mode === "edit" ? "Edit Category" : null}
        visible={visible}
        onCancel={onCancel}
        closable={false}
        onOk={handleOk}
        footer={
          mode === "delete"
            ? [
                <div className="w-full flex items-center justify-center gap-2">
                  <Button key="cancel" onClick={handleClose}>
                    Cancel
                  </Button>

                  <Button key="delete" type="primary" danger onClick={handleOk}>
                    Delete
                  </Button>
                </div>,
              ]
            : null
        }
      >
        {mode === "edit" ? (
          <div>
            <Form layout="vertical" className="flex flex-col gap-1">
              {/* Static Image Initially Displayed */}
              {!isEditingImage ? (
                <Form.Item>
                  <div className="flex justify-center relative">
                    {/* Static image displayed initially */}
                    <Image
                      preview={false}
                      src={previewImage}
                      style={{ width: "100%", maxWidth: 300 }}
                    />
                    {/* Edit button */}
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
                // Upload Component when clicked on Edit
                <Form.Item>
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
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
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="h-9"
                />
              </Form.Item>

              {/* Save Button */}
              <Form.Item>
                <Button block className="h-9" onClick={handleOk}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <p className="text-black my-2">
              Are you sure you want to delete the category{" "}
              <strong>{record?.category}</strong>?
            </p>
          </div>
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default EditDeleteCategoryModal;
