import LayoutContainer from "../src/containers/LayoutContainer";
import HomePage from "../src/pages/Home";

const HomeRoute = () => {
  return (
    <div>
      <LayoutContainer>
        <HomePage />
      </LayoutContainer>
    </div>
  );
};

export default HomeRoute;
