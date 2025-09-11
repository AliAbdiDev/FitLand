import RegisterForm from "../register-form";
import TitleAuth from "../TitleAuth";

export default async function RegisterPage() {
  return (
    <>
      <TitleAuth
        title="Create to your account"
        description="Enter your email below to create to your account"
      />

      <RegisterForm />
    </>
  );
}
