import { Button, Form, Input, Flex, Modal, QRCode, Space } from "antd";
import { postData } from "../api/postOriginalUrl";
import { useMutation } from "@tanstack/react-query";
import { CopyOutlined } from "@ant-design/icons";
import { useState } from "react";

export const ShortUrlForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutate, isError, error, data } = useMutation({
    mutationFn: postData,
  });

  const onFinish = (values: { url: string }) => {
    const user = localStorage.getItem("user");
    if (!user) {
      setIsModalVisible(true);
    } else {
      mutate({ url: values.url });
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Flex
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
      }}
    >
      <div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: "100%" }}
          onFinish={onFinish}
        >
          <Flex>
            <Form.Item
              name="url"
              rules={[{ required: true, message: "Please input your URL" }]}
            >
              <Input
                placeholder="URL"
                type="url"
                style={{ height: 60, width: 500, minWidth: 300, fontSize: 20 }}
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
        {isError && <div>Error: {error.message}</div>}

        {data && (
          <Flex style={{ justifyContent: "space-between", maxWidth: "100%" }}>
            <Button
              style={{ height: "3rem" }}
              onClick={() => {
                window.location.href = "http://localhost:3000/" + data.shortUrl;
              }}
            >
              http://localhost:3000/{data.shortUrl}
            </Button>
            <Button
              style={{ borderRadius: "100%", height: "3rem", width: "3rem" }}
              icon={<CopyOutlined />}
              onClick={() => {
                navigator.clipboard.writeText(
                  "http://localhost:3000/" + data.shortUrl
                );
              }}
            />
            <Space direction="vertical" align="center">
              <QRCode value={"http://localhost:3000/" + data.shortUrl} />
            </Space>
          </Flex>
        )}

        <Modal
          title="Please log in or register"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="login" type="primary" href="/signin">
              Log in
            </Button>,
            <Button key="register" type="default" href="/signup">
              Register
            </Button>,
          ]}
        >
          <p>You need to log in or register to shorten URLs.</p>
        </Modal>
      </div>
    </Flex>
  );
};
