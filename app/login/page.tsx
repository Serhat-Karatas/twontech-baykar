import LoginPage from "@/components/loginPage/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login sayfasına hoşgeldiniz.",
};

const SignUp = () => {
  return <LoginPage />;
};

export default SignUp;
