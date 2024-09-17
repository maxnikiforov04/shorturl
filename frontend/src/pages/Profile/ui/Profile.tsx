import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import { MainHeader } from "../../../widgets";
import { Layout } from "antd";

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

interface IUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
}

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div style={{ marginBottom: "10px" }}>
    <strong>{label}:</strong> {value}
  </div>
);

export const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [urls, setUrls] = useState<IUrl[] | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const url = localStorage.getItem("shortUrls");
    console.log(user);
    if (user && url) {
      try {
        const parsedUserData: User = JSON.parse(user);
        const parsedUrlsData: IUrl[] = JSON.parse(url);
        if (parsedUserData) {
          setIsAuthenticated(true);
          setUserData(parsedUserData);
          setUrls(parsedUrlsData);
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
    <>
      <MainHeader />
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
            {urls?.map((item) => (
              <div>
                <div>{item.originalUrl}</div>
                <div>{item.shortUrl}</div>
              </div>
            ))}
          </div>
        </Flex>
      </Content>
    </>
  );
};
