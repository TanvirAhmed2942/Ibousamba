// import React, { useState } from "react";
// import {
//   Modal,
//   ConfigProvider,
//   Form,
//   Input,
//   Button,
//   Image,
//   Upload,
// } from "antd";
// import { LiaCloudUploadAltSolid } from "react-icons/lia";
// const AddBrandModal = ({ isModalOpen, handleClose }) => {
//   const [fileList, setFileList] = useState([]);
//   const [previewImage, setPreviewImage] = useState("");
//   const [previewOpen, setPreviewOpen] = useState(false);

//   // Preview Image Handler
//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
//   };

//   // Handle Image Upload Change
//   const handleChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   // Convert File to Base64
//   const getBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Modal: {
//             contentBg: "#f4e1b9",
//             headerBg: "#f4e1b9",
//           },
//           Input: {
//             hoverBorderColor: "none",
//             activeBorderColor: "none",
//           },
//           Button: {
//             defaultBg: "#d99e1e",
//             defaultColor: "black",
//             defaultBorderColor: "#d99e1e",
//             defaultHoverBg: "#d99e1e",
//             defaultHoverColor: "black",
//             defaultHoverBorderColor: "#d99e1e",
//             defaultActiveBg: "#d99e1e",
//             defaultActiveColor: "black",
//             defaultActiveBorderColor: "#d99e1e",
//           },
//         },
//       }}
//     >
//       <Modal
//         title="Add New Brand"
//         open={isModalOpen}
//         onCancel={handleClose}
//         footer={null}
//         closable
//       >
//         <Form layout="vertical" className="flex flex-col gap-1">
//           {/* Upload Component with white background */}
//           <Form.Item label="Brand Image" required>
//             <Upload
//               action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//               listType="picture-card"
//               fileList={fileList}
//               onPreview={handlePreview}
//               onChange={handleChange}
//             >
//               {fileList.length >= 1 ? null : (
//                 <div className="w-full flex items-center justify-center">
//                   <div className="mt-2 text-black flex flex-col items-center">
//                     <LiaCloudUploadAltSolid size={25} />
//                     Upload
//                   </div>
//                 </div>
//               )}
//             </Upload>
//           </Form.Item>

//           {/* Single Image Preview */}
//           {previewImage && (
//             <Form.Item>
//               <div className="flex justify-center">
//                 <Image
//                   preview={{
//                     visible: previewOpen,
//                     onVisibleChange: (visible) => setPreviewOpen(visible),
//                     afterOpenChange: (visible) =>
//                       !visible && setPreviewImage(""),
//                   }}
//                   src={previewImage}
//                   style={{ width: "100%", maxWidth: 300 }}
//                 />
//               </div>
//             </Form.Item>
//           )}

//           {/* Category Name Form */}
//           <Form.Item
//             label="Brand Url Link"
//             name="brandUrl"
//             rules={[
//               {
//                 required: true,
//                 message: "Enter your Brand Link",
//               },
//             ]}
//           >
//             <Input className="h-9" />
//           </Form.Item>

//           {/* Save Button */}
//           <Form.Item>
//             <Button block className="h-9">
//               Save
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </ConfigProvider>
//   );
// };

// export default AddBrandModal;

import React, { useEffect, useState } from "react";
import {
  Modal,
  ConfigProvider,
  Form,
  Input,
  Button,
  Upload,
  Image,
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
      setPreviewImage(initialBrand.Img);
    } else {
      form.resetFields();
      setPreviewImage("");
      setFileList([]);
    }
  }, [initialBrand, form]);

  // Handle Save
  const onFinish = (values) => {
    handleSave({
      name: values.name,
      Img: previewImage || initialBrand?.Img,
    });
  };

  // Handle Image Upload
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      getBase64(newFileList[0].originFileObj, (imageUrl) => {
        setPreviewImage(imageUrl);
      });
    }
  };

  // Convert File to Base64
  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: { contentBg: "#f4e1b9", headerBg: "#f4e1b9" },
          Button: {
            defaultBg: "#d99e1e",
            defaultColor: "white",
            defaultHoverBg: "d99e1e",
            defaultHoverColor: "white",
            defaultHoverBorderColor: "none",
            defaultActiveBg: "#d99e1e",
            defaultActiveColor: "white",
            defaultActiveBorderColor: "d99e1e",
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
          <Form.Item label="Brand Image">
            {previewImage ? <Image src={previewImage} width={100} /> : null}
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              showUploadList={false}
            >
              <div className="flex flex-col items-center ">
                <LiaCloudUploadAltSolid size={25} className="text-black" />
                <p className="text-black">Click or drag file to upload</p>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Brand Url Link"
            name="brandUrl"
            rules={[{ required: true, message: "Enter Brand Url Link" }]}
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
