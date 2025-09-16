function TitleAuth({
  title = "ورود به حساب کاربری",
  description = "ایمیل خود را وارد کنید تا وارد حساب کاربری شوید",
}) {
  return (
    <>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-balance text-sm text-muted-foreground">
        {description}
      </p>
    </>
  );
}

export default TitleAuth;
