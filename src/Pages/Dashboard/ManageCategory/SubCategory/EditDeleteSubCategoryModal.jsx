import React, { useState } from "react";
import { Modal, Input, Button, Upload, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";

const EditSubCategoryModal = ({ visible, onCancel, onOk, record }) => {
  const [categoryName, setCategoryName] = useState(record?.category || "");
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(record?.categoryImg || "");
  const [isEditingImage, setIsEditingImage] = useState(false);

  const handleClose = () => {
    setCategoryName(record?.category || "");
    setFileList([]);
    setPreviewImage(record?.categoryImg || "");
    setIsEditingImage(false);
    onCancel();
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", categoryName);
    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    console.log("Form Data Entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    onOk(formData);
    handleClose();
  };

  const handlePreview = async (file) => {
    setPreviewImage(URL.createObjectURL(file.originFileObj));
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      handlePreview(newFileList[0]);
    }
  };

  return (
    <Modal
      title="Edit Sub-Category"
      open={visible}
      onCancel={handleClose}
      onOk={handleSave}
      closable={false}
      footer={null}
    >
      {!isEditingImage ? (
        <div className="flex justify-center relative">
          <Image
            preview={false}
            src={previewImage}
            style={{ width: "100%", maxWidth: 300 }}
          />
          <Button
            onClick={() => setIsEditingImage(true)}
            className="absolute top-0 right-0"
            icon={<EditOutlined />}
            shape="circle"
            size="large"
          />
        </div>
      ) : (
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : <div>Upload</div>}
        </Upload>
      )}

      <Input
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="h-9 mt-3"
      />
      <Button block className="h-9 mt-4" onClick={handleSave}>
        Save
      </Button>
    </Modal>
  );
};

export default EditSubCategoryModal;
