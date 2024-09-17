import { SignInLink, SignUpLink } from "../../../shared";
import { Button, Layout } from "antd";
const { Header } = Layout;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const MainHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
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
          <Link to="/profile">
            <Button>My Profile</Button>
          </Link>
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
