import { Button, Form, Input, Flex } from "antd";
import { postData } from "../api/postOriginalUrl";
import { useMutation } from "@tanstack/react-query";

export const ShortUrlForm = () => {
  const mutation = useMutation({ mutationFn: postData });
  const onFinish = (url: string) => {
    console.log(mutation.mutate(url));
  };
  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Flex>
        <Form.Item
          name="url"
          rules={[{ required: true, message: "Please input your URL" }]}
        >
          <Input
            placeholder="URL"
            style={{ height: 60, width: 520, fontSize: 20 }}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ width: 80, height: 60, marginLeft: 20 }}
          >
            Get URL
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
