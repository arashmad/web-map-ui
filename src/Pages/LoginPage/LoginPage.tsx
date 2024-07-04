interface ILoginPage {
  title?: string;
}
const LoginPage: React.FC<ILoginPage> = (props) => {
  return <>{props.title || "No Title"}</>;
};

export default LoginPage;
