function TitleAuth({
  title = "Login to your account",
  description = "Enter your email below to login to your account",
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
