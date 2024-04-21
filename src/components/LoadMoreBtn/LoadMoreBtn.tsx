import css from "./LoadMoreBtn.module.css";

type Props = {
  onClick: () => void;
  isVisible: () => boolean;
};

const LoadMoreBtn = ({ onClick, isVisible }: Props) => {
  return (
    <div className={css.btnThumb}>
      {isVisible() && (
        <button className={css.btnLoad} onClick={onClick}>
          Load More
        </button>
      )}
    </div>
  );
};


export default LoadMoreBtn;
