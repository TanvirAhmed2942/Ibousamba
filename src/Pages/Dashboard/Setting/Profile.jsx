import React, { useState } from "react";
import { Button, ConfigProvider, Form, Input, Upload, message } from "antd";
import { FaFeather } from "react-icons/fa6";
import { HiMiniPencil } from "react-icons/hi2";
import { useUser } from "../../../provider/User";
import { imageUrl } from "../../../redux/api/baseApi";
import { useUpdateProfileMutation } from "../../../redux/apiSlices/profileSlice";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { user } = useUser();

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "#a11d26",
            defaultActiveBg: "#a11d26",
            defaultHoverBg: "#d99e1e",
            defaultHoverColor: "#ffffff",
          },
        },
      }}
    >
      <div className="bg-quilocoP w-[50%] min-h-72 flex flex-col justify-start items-center px-4 rounded-lg">
        <div className="relative mt-6 flex flex-col items-center justify-center">
          <img
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : `${imageUrl}${user?.image}`
            }
            className="w-24 h-24 border border-slate-500 rounded-full object-cover"
          />
          {isEditing && (
            <Upload
              showUploadList={false}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("You can only upload image files!");
                  return Upload.LIST_IGNORE;
                }
                return false; // Don't upload automatically
              }}
              onChange={(info) => {
                if (info.file.status !== "uploading") {
                  setUploadedImage(info.file.originFileObj || info.file);
                  message.success(`${info.file.name} ready to upload`);
                }
              }}
            >
              <button>
                <FaFeather
                  size={30}
                  className="text-samba absolute top-16 left-28 rounded-full bg-black p-1"
                />
              </button>
            </Upload>
          )}
          <h3 className="text-slate-50 text-xl mt-3">{user?.firstName}</h3>
        </div>
        <div className="w-full flex justify-end">
          <Button
            onClick={() => {
              setIsEditing(!isEditing);
              if (isEditing) {
                setUploadedImage(null); // Clear uploaded image if canceling
              }
            }}
            icon={
              !isEditing && <HiMiniPencil size={20} className="text-white" />
            }
            className="bg-samba/80 border-none text-white min-w-20 min-h-8 text-xs rounded-lg"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
        <ProfileDetails
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          user={user}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />
      </div>
    </ConfigProvider>
  );
}

export default Profile;

const ProfileDetails = ({
  isEditing,
  setIsEditing,
  user,
  uploadedImage,
  setUploadedImage,
}) => {
  const [form] = Form.useForm();
  const { updateUser } = useUser(); // Assuming you have an updateUser function in your user provider
  const [updateProfile, { isLoading, isError }] = useUpdateProfileMutation();

  const handleFinish = async (values) => {
    try {
      // Create a FormData object to send all data including the image
      const formData = new FormData();

      // Append all form values to FormData, including 'role'
      Object.keys(values).forEach((key) => {
        // Only append key-value pairs where the value is not null or undefined
        if (values[key] !== null && values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });

      // Append the uploaded image if present
      if (uploadedImage) {
        formData.append("image", uploadedImage); // Add the image to FormData
      }

      // Log FormData content (for debugging)
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      // Using await with the API call to update the profile
      const response = await updateProfile(formData).unwrap(); // unwrap the response to get the actual result

      // If the response is successful, update the state
      if (response) {
        message.success("Profile updated successfully");
        setIsEditing(false); // Exit editing mode
      }
    } catch (error) {
      // Catch any errors that occur in the try block
      console.error("Error updating profile:", error);
      message.error("Failed to update profile: " + error.message);
    }
  };

  // const handleFinish = async (values) => {
  //   try {
  //     const formData = new FormData();

  //     // Append form values, excluding image for now
  //     Object.keys(values).forEach((key) => {
  //       if (values[key] !== null && values[key] !== undefined) {
  //         formData.append(key, values[key]);
  //       }
  //     });

  //     // Log the FormData content
  //     formData.forEach((value, key) => {
  //       console.log(key, value);
  //     });

  //     // Make the API request without the image
  //     const response = await updateProfile(formData).unwrap();

  //     if (response) {
  //       message.success("Profile updated successfully");
  //       setIsEditing(false);
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     message.error(
  //       `Failed to update profile: ${error.message || "Unknown error"}`
  //     );
  //   }
  // };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "#a11d26",
            defaultActiveBg: "#a11d26",
            defaultHoverBg: "#d99e1e",
            defaultHoverColor: "#ffffff",
          },
          Form: {
            labelColor: "#efefef",
          },
          Input: {
            colorBgBase: "#1f1f1f",
            colorBgContainer: "#1f1f1f",
            colorBorder: "transparent",
            boxShadow: "none",
          },
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: user?.firstName,
          email: user?.email,
          phone: user?.mobileNumber,
          role: user?.role,
        }}
        onFinish={handleFinish}
        className="w-full"
      >
        <div className="flex justify-between gap-2 w-full">
          <Form.Item
            name="name"
            label={<p className="ml-1.5">Name</p>}
            className="w-full"
          >
            <Input
              className="bg-[1f1f1f] border-none h-12 text-slate-300"
              readOnly={!isEditing}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={<p className="ml-1.5">Email</p>}
            className="w-full"
            rules={[
              {
                pattern:
                  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\.com$/,
                message: "Please enter a valid email address!",
                // pattern: new RegExp("/S+@S+.S+/"),
                type: "email",
              },
            ]}
          >
            <Input
              className="bg-[1f1f1f] border-none h-12 text-slate-300"
              readOnly={!isEditing}
            />
          </Form.Item>
        </div>

        <div className="flex justify-between gap-2 w-full">
          <Form.Item
            name="phone"
            label={<p className="ml-1.5">Phone</p>}
            className="w-full"
          >
            <Input
              className="bg-[1f1f1f] border-none h-12 text-slate-300"
              readOnly={!isEditing}
            />
          </Form.Item>
          <Form.Item
            name="role"
            label={<p className="ml-1.5">Role</p>}
            className="w-full"
            initialValue="admin" // Role is always admin
          >
            <Input
              className="bg-[1f1f1f] border-none h-12 text-slate-300"
              readOnly
            />
          </Form.Item>
        </div>

        {isEditing && (
          <Form.Item>
            <Button
              block
              htmlType="submit"
              className="bg-samba/80 border-none text-white min-w-20 min-h-10 text-xs rounded-lg"
            >
              Save Changes
            </Button>
          </Form.Item>
        )}
      </Form>
    </ConfigProvider>
  );
};
