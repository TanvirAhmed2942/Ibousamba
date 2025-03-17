import React, { useState } from "react";
import man from "../../../assets/samba/man.png";
import { FaFeather } from "react-icons/fa6";
import { Button, ConfigProvider, Form, Input, Upload, message } from "antd";
import { HiMiniPencil } from "react-icons/hi2";
import { useUser } from "../../../provider/User";
import { imageUrl } from "../../../redux/api/baseApi";

function Profile() {
  const [showButton, setShowButton] = useState(false);
  const { user } = useUser();
  console.log("user", user);
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultActiveColor: "#ffffff",
              defaultActiveBorderColor: "#a11d26 ",
              defaultActiveBg: "#a11d26 ",
              defaultHoverBg: "#d99e1e  ",
              defaultHoverColor: "#ffffff",
            },
          },
        }}
      >
        <div className="bg-quilocoP w-[50%] min-h-72 flex flex-col justify-start items-center px-4 rounded-lg">
          <div className="relative mt-6 flex flex-col items-center justify-center">
            <img
              src={`${imageUrl}${user?.image}`}
              // width={120}
              // height={60}
              className="w-24 h-24 border border-slate-500  rounded-full"
            />
            {showButton ? (
              <Upload
                onChange={(info) => {
                  if (info.file.status !== "uploading") {
                    console.log(info.file, info.fileList);
                  }
                  if (info.file.status === "done") {
                    message.success(
                      `${info.file.name} file uploaded successfully`
                    );
                  } else if (info.file.status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
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
            ) : null}

            <h3 className="text-slate-50 text-xl mt-3">{user.firstName}</h3>
          </div>
          <div className="w-full flex justify-end">
            <Button
              onClick={() => setShowButton(!showButton)}
              icon={
                showButton ? null : (
                  <HiMiniPencil size={20} className="text-white" />
                )
              }
              className="bg-samba/80 border-none text-white min-w-20 min-h-8 text-xs rounded-lg"
            >
              {showButton ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
          <ProfileDetails
            showButton={showButton}
            setShowButton={setShowButton}
            user={user}
          />
        </div>
      </ConfigProvider>
    </>
  );
}

export default Profile;

const ProfileDetails = ({ showButton, setShowButton, user }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "#a11d26 ",
            defaultActiveBg: "#a11d26 ",
            defaultHoverBg: "#d99e1e ",
            defaultHoverColor: "#ffffff",
          },
          Form: {
            labelColor: "#efefef",
          },
          Select: {
            selectorBg: "black",
            activeOutlineColor: "grey",
            optionSelectedBg: "grey",
            multipleItemBorderColor: "grey",
            activeBorderColor: "grey",
            hoverBorderColor: "grey",
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
        layout="vertical"
        className={`w-full ${
          !showButton ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <div className="flex justify-between gap-2 w-full ">
          <Form.Item label={<p className="ml-1.5">Name</p>} className="w-full">
            <Input
              placeholder={`${!showButton && user ? user.firstName : ""}`}
              value={`${!showButton && user ? "" : user.firstName}`}
              className="bg-[1f1f1f] border-none h-12 text-slate-300 "
              disabled={!showButton}
            />
          </Form.Item>
          <Form.Item label={<p className="ml-1.5">Email</p>} className="w-full">
            <Input
              placeholder={`${!showButton && user ? user.email : ""}`}
              value={`${!showButton && user ? "" : user.email}`}
              disabled={!showButton}
              className="bg-[1f1f1f] border-none h-12 text-slate-300 "
            />
          </Form.Item>
        </div>
        <div className="flex justify-between gap-2 w-full 0">
          <Form.Item label={<p className="ml-1.5">Phone</p>} className="w-full">
            <Input
              placeholder={`${!showButton && user ? user.mobileNumber : ""}`}
              value={`${!showButton && user ? "" : user.mobileNumber}`}
              disabled={!showButton}
              className="bg-[1f1f1f] border-none h-12 text-slate-300 "
            />
          </Form.Item>
          <Form.Item label={<p className="ml-1.5">Role</p>} className="w-full">
            <Input
              placeholder={`${!showButton && user ? user.role : ""}`}
              value={`${!showButton && user ? "" : user.role}`}
              disabled={!showButton}
              className="bg-[1f1f1f] border-none h-12 text-slate-300 "
            />
          </Form.Item>
        </div>

        {showButton ? (
          <Form.Item>
            <Button
              block
              onClick={() => setShowButton(false)}
              className="bg-samba/80 border-none text-white min-w-20 min-h-10 text-xs rounded-lg"
            >
              Save Changes
            </Button>
          </Form.Item>
        ) : null}
      </Form>
    </ConfigProvider>
  );
};
