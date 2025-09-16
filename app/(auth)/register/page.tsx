import RegisterForm from "../register-form";
import TitleAuth from "../TitleAuth";

export default async function RegisterPage() {
  return (
    <>
      <TitleAuth
        title="ایجاد حساب کاربری"
        description="ایمیل خود را وارد کنید تا حساب کاربری جدید ایجاد کنید"
      />

      <RegisterForm />
    </>
  );
}
