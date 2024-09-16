import { Link } from "react-router-dom";
import { Button } from "antd";
export const SignInLink = () => {
  return (
    <Link to="/signin">
      <Button type="primary" style={{ marginRight: "10px" }}>
        Sign In
      </Button>
    </Link>
  );
};
