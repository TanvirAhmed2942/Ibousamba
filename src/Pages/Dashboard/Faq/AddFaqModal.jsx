import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

function AddFaqModal({ isOpen, onClose, onSave }) {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values); // Send FAQ data to parent
        form.resetFields(); // Reset fields after save
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Add FAQ"
      closable={true}
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
          key="save"
          type="primary"
          onClick={handleSave}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="addFaqForm"
        initialValues={{
          question: "",
          answer: "",
        }}
      >
        <Form.Item
          label="FAQ Question"
          name="question"
          rules={[
            { required: true, message: "Please enter the FAQ question!" },
          ]}
        >
          <Input placeholder="Enter the FAQ question" />
        </Form.Item>

        <Form.Item
          label="FAQ Answer"
          name="answer"
          rules={[{ required: true, message: "Please enter the FAQ answer!" }]}
        >
          <Input.TextArea placeholder="Enter the FAQ answer" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddFaqModal;
