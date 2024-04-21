import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <>
      <p className={css.errorMessage}>
        Whoops, something went wrong! <br />
        Please try reloading this page!
      </p>
    </>
  );
};

export default ErrorMessage;
