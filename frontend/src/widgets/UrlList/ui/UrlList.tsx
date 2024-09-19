import { Button, Flex, Layout, notification, List, Card } from "antd";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchUserLinks } from "../api/fetchUserLinks";

const { Content } = Layout;

interface User {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  about: string;
  password: string;
}

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div style={{ marginBottom: "10px" }}>
    <strong>{label}:</strong> {value}
  </div>
);

export const UrlList = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const { data, mutate } = useMutation({
    mutationFn: fetchUserLinks,
    onError: (error) => {
      notification.error({
        message: "Failed to update password",
        description: error.message,
      });
    },
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUserData: User = JSON.parse(user);
        if (parsedUserData) {
          setIsAuthenticated(true);
          setUserData(parsedUserData);
          mutate(parsedUserData.id);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  if (!isAuthenticated || !userData) {
    return <div>User unAutorised</div>;
  }

  return (
    <Content style={{ padding: "50px" }}>
      <Flex>
        <div
          style={{
            width: "30vw",
            fontSize: "1.5rem",
            height: "60%",
            backgroundColor: "",
          }}
        >
          <h1>Profile</h1>
          <ProfileField label="Email" value={userData.email} />
          <ProfileField label="Username" value={userData.username} />
          <Button>
            <a href="/reset">Forgot password</a>
          </Button>
        </div>
        <div style={{ width: "70vw", fontSize: "1.5rem" }}>
          <h1>Url's</h1>
          {isAuthenticated ? (
            <div>
              {data?.map((item) => (
                <List.Item
                  style={{
                    listStyle: "none",
                    marginBottom: "2rem",
                    width: "60%",
                  }}
                >
                  <Card>
                    <Button>http://localhost:3000/{item.shortUrl}</Button>
                    <div>
                      <strong>Original URL:</strong> {item.originalUrl}
                    </div>
                  </Card>
                </List.Item>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </Flex>
    </Content>
  );
};
