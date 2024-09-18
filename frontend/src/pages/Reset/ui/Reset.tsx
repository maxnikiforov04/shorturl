import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Flex, notification } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUser } from "../../../entities/model/User";
import { useNavigate } from "react-router-dom";

export const Reset = () => {
  const { register } = useForm<IUser>();
  const navigate = useNavigate();
  const { mutate, isError, error } = useMutation({
    mutationFn: PostUser,
    onError: (error) => {
      notification.error({
        message: "This user already exists",
        description: error.message,
      });
    },
    onSuccess: () => {
      navigate("/");
    },
  });
  const onSubmit: SubmitHandler<IUser> = (data) => {
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
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            type="email"
            {...register("email")}
          />
        </Form.Item>
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
          <a href="">Forgot password</a>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
          or <a href="/signin">Log in now!</a>
        </Form.Item>
      </Form>
    </Flex>
  );
};
