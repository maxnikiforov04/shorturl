import { Link } from "react-router-dom";
import { Button } from "antd";
export const SignUpLink = () => {
  return (
    <Link to="/signup">
      <Button type="default">Sign Up</Button>
    </Link>
  );
};
