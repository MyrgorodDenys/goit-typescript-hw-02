import Modal from "react-modal";
import { RiCloseLine } from "react-icons/ri";
import { format } from "date-fns";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import css from "./ImageModal.module.css";
import { useEffect } from "react";
import { Image } from "../App/App.types";

const formatDate = <T extends string>(date: T): string => {
  return format(new Date(date), "MMMM dd yyyy");
};

type Props = {
  isOpen: boolean;
  image: Image | null;
  onCloseModal: () => void;
}

const ImageModal = ({ isOpen, onCloseModal, image }: Props) => {
  useEffect(() => {
    if (isOpen) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [isOpen]);

  return (
    <Modal
      overlayClassName={css.backdrop}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
    >
      <button className={css.closeButton} onClick={onCloseModal}>
        <RiCloseLine size="40" />
      </button>
      {image && (
        <div className={css.containerModal}>
          <div className={css.imgContainer}>
            <img
              className={css.image}
              src={image.urls.regular}
              alt={image.alt_description}
            />
          </div>
          <div className={css.moreInform}>
            <p className={css.author}>
              Author:{" "}
              <a
                className={css.linkAuthor}
                href={image.user.social.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {image.user.name}
              </a>
            </p>
            <p className={css.likes}>
              Likes: <span className={css.likesSpan}>{image.likes}</span>
            </p>
            {image.description && (
              <p className={css.description}>{image.description}</p>
            )}
            <ul className={css.tagsList}>
              {image.tags.map((tag: { title: string }, index: number) => (
                <li className={css.tagItem} key={index}>
                  &#35;{tag.title}
                </li>
              ))}
            </ul>

            <p className={css.created}>
              Created on: {formatDate(image.created_at)}
            </p>
            {image.user.location && (
              <p className={css.location}>Location: {image.user.location}</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
