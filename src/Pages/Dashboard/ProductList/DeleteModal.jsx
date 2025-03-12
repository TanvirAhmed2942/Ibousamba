import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      title="Delete Confirmation"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
          className="bg-gray-500 text-white hover:bg-gray-600"
        >
          Cancel
        </Button>,
        <Button
          key="confirm"
          onClick={onConfirm}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </Button>,
      ]}
      closable={false}
      icon={<ExclamationCircleOutlined />}
    >
      <p className="text-lg">Are you sure you want to delete this item?</p>
    </Modal>
  );
}

export default DeleteModal;
