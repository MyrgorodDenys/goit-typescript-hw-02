import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

const LoaderMore = () => {
  return (
    <div className={css.container}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#5c6297"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoaderMore;
