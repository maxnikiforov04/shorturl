import { Button, Form, Input, Flex } from "antd";
import { postData } from "../api/postOriginalUrl";
import { useMutation } from "@tanstack/react-query";
import { CopyOutlined } from "@ant-design/icons";

interface ShortUrlResponse {
  shortUrl: string;
  originalUrl: string;
}

const getShortUrlsFromLocalStorage = (): ShortUrlResponse[] => {
  const shortUrls = localStorage.getItem("shortUrls");
  return shortUrls ? JSON.parse(shortUrls) : [];
};

const saveShortUrlsToLocalStorage = (shortUrls: ShortUrlResponse[]) => {
  localStorage.setItem("shortUrls", JSON.stringify(shortUrls));
};
export const ShortUrlForm = () => {
  const { mutate, isError, error, data } = useMutation({
    mutationFn: postData,
    onSuccess: (data: ShortUrlResponse) => {
      const shortUrls = getShortUrlsFromLocalStorage();
      const isUrlExists = shortUrls.some(
        (url) => url.originalUrl === data.originalUrl
      );
      if (!isUrlExists) {
        shortUrls.push(data);
        saveShortUrlsToLocalStorage(shortUrls);
      }
    },
  });

  const onFinish = (url: string) => {
    mutate(url);
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
                type="url"
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
        {isError && <div>Error: {error.message}</div>}

        {data && (
          <Flex style={{ justifyContent: "space-between", maxWidth: "10rem" }}>
            <Button
              onClick={() => {
                window.location.href = "http://localhost:3000/" + data.shortUrl;
              }}
            >
              {data.shortUrl}
            </Button>
            <Button
              style={{ borderRadius: "100%" }}
              icon={<CopyOutlined />}
              onClick={() => {
                navigator.clipboard.writeText(
                  "http://localhost:3000/" + data.shortUrl
                );
              }}
            />
          </Flex>
        )}
      </div>
    </Flex>
  );
};
