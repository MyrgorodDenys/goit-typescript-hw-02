import { Image } from "../App/App.types";
import css from "./ImageCard.module.css";

type Props = {
  imageItem: Image;
}

const ImageCard = ({
  imageItem: {
    alt_description,
    likes,
    urls: { small },
    user: {
      name,
      social: { portfolio_url },
    },
  },
}: Props) => {
  return (
    <div className={css.galleryThumb}>
      <img
        className={css.galleryImage}
        src={small}
        alt={alt_description}
        width="360"
      />
      <div className={css.thumbBlock}>
        <p className={css.textPhoto}>
          ✍️ <strong>Author</strong>
          <br />
          <a href={portfolio_url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </p>
        <p className={css.textPhoto}>
          ❤️ <strong>Likes: </strong>
          {likes}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
