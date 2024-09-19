import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Flex, notification } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { LogUser } from "../model/LogUser";
import { useNavigate } from "react-router-dom";
import { CheckUserData } from "../api/CheckUserData";

export const Authorization = () => {
  const { register } = useForm<LogUser>();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: CheckUserData,
    onError: (error) => {
      notification.error({
        message: "This user already exists",
        description: error.message,
      });
    },
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    },
  });
  const onSubmit: SubmitHandler<LogUser> = (data) => {
    mutate(data);
  };

  return (
    <Flex
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            {...register("userName")}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Item>
        <Form.Item>
          <a href="/reset">Forgot password</a>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
          or <a href="/signin">Register now!</a>
        </Form.Item>
      </Form>
    </Flex>
  );
};
