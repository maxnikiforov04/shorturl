import { Layout } from "antd";
import { MainHeader, ShortUrlForm } from "../../../widgets";

const { Content } = Layout;

export const MainPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <MainHeader />
      <Content style={{ padding: "20px" }}>
        <ShortUrlForm />
      </Content>
    </Layout>
  );
};
