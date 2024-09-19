import { DownOutlined } from "@ant-design/icons";
import { SignInLink, SignUpLink } from "../../../shared";
import { Dropdown, Layout, Space } from "antd";
const { Header } = Layout;
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const MainHeader = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<{ username: string }>();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link rel="noopener noreferrer" to="/profile">
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            localStorage.removeItem("user");
            setIsAuthenticated(false);
            navigate("/");
          }}
          rel="noopener noreferrer"
        >
          exit
        </a>
      ),
      danger: true,
    },
  ];
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const dataUser = JSON.parse(user);
      setIsAuthenticated(true);
      setData({ username: dataUser?.username });
    }
  }, []);
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <div style={{ color: "white", fontSize: "1.5rem", cursor: "pointer" }}>
          Short Url
        </div>
      </Link>
      <div>
        {isAuthenticated ? (
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {data?.username}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <div>
            <SignInLink />
            <SignUpLink />
          </div>
        )}
      </div>
    </Header>
  );
};
