const LoginPage = ({loginWithGithub}) => {
  return (
    <>
      <p>User is not logged in</p>
      <button onClick={loginWithGithub}>Login with Github</button>
    </>
  );
};

export default LoginPage;
