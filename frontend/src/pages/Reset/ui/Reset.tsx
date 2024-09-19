import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Flex, notification } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../api/updateUserData";
import { UpdateUserDataParams } from "../model/upUser";

export const Reset = () => {
  const { register } = useForm();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: updateUserData,
    onError: (error) => {
      notification.error({
        message: "Failed to update password",
        description: error.message,
      });
    },
    onSuccess: () => {
      notification.success({
        message: "Password updated successfully",
      });
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<UpdateUserDataParams> = (data) => {
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
          name="checkedPassword"
          rules={[
            { required: true, message: "Please input your Current Password!" },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Current Password"
            {...register("checkedPassword")}
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please input your New Password!" },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="New Password"
            {...register("newPassword")}
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Reset
          </Button>
          or <a href="/signin">Log in now!</a>
        </Form.Item>
      </Form>
    </Flex>
  );
};
