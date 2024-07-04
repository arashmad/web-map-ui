interface IDashboardPage {
  title?: string;
}

const DashboardPage: React.FC<IDashboardPage> = (props) => {
  return <>{props.title}</>;
};

export default DashboardPage;
