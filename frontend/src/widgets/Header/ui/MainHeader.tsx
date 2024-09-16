import { SignInLink, SignUpLink } from "../../../shared";
import { Layout } from "antd";
const { Header } = Layout;
export const MainHeader = () => {
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ color: "white", fontSize: "1.5rem" }}>Short Url</div>
      <div>
        <SignInLink />
        <SignUpLink />
      </div>
    </Header>
  );
};
