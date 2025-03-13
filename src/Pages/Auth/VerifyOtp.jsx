import { Button, Form, Typography } from "antd";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import VerifyOTP from "../../assets/samba/VerifyOTP.png";
const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const email = new URLSearchParams(location.search).get("email");

  const onFinish = async (values) => {
    navigate(`/auth/reset-password?email=${email}`);
  };

  const handleResendEmail = async () => {};

  return (
    <div className="w-full h-full flex items-center justify-center  ">
      <div className="border-r-2 border-sambaSD w-full h-[500px] flex items-center justify-center mr-4">
        <img src={VerifyOTP} width={400} />
      </div>
      <div className="flex flex-col items-center justify-center  w-full ml-4">
        <div className="text-center mb-6">
          <h1 className="text-[25px] text-white font-semibold mb-2">
            Verify OTP
          </h1>
          <p className="w-[80%] mx-auto text-[#A3A3A3]">
            We'll send a verification code to your email. Check your inbox and
            enter the code here.
          </p>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <div className="flex items-center justify-center mb-6">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle={{
                height: 50,
                width: 50,
                background: "transparent",
                borderRadius: "8px",
                margin: "10px",
                fontSize: "20px",
                border: "1px solid #d99e1e ",
                color: "white",
                outline: "none",
                marginBottom: 10,
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <div className="flex items-center justify-between mb-6 ">
            <Text className="text-[#A3A3A3]">Don't received code?</Text>

            <p
              onClick={handleResendEmail}
              className="login-form-forgot  font-medium cursor-pointer"
              // style={{ color: "#ffffff ", cursor: "pointer" }}
            >
              Resend
            </p>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              htmlType="submit"
              style={{
                width: "100%",
                height: 45,
                border: "1px solid #d99e1e  ",
                outline: "none",
                boxShadow: "none",
                background: "#d99e1e  ",
                color: "white",
              }}
            >
              Verify
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOtp;
