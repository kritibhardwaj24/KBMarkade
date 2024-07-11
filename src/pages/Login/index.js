import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: "This field is required",
  },
];

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(values);
      dispatch(SetLoader(false));

      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/"); // Navigate to home page after successful login
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    // Check if token exists in localStorage to prevent repeated redirects
    if (localStorage.getItem("token")) {
      navigate("/"); // Redirect to home page if token exists
    }
  }, [navigate]); // Depend on navigate to avoid stale closure

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px] ">
        <h1 className="text-primary text-2xl">
          KB MARKADE | <span className="text-gray-400">Login</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
          <div className="mt-5 text-center ">
            <span className="text-gray-500">
              Don't have an account?<Link to="/register">Register</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
