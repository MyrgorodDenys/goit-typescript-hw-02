import { getImagesUnplash } from "../../images-api";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../../node_modules/modern-normalize/modern-normalize.css";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import LoaderMore from "../Loader/LoaderMore";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import { Image } from "./App.types";

interface ImageData {
  total_pages: number;
  total: number;
  results: Image[];
}

function App() {
  const [images, setImages] = useState<Image[]>([]); // Стан для зберігання списку зображень
  const [page, setPage] = useState<number>(1); // Стан для зберігання поточної сторінки результатів
  const [totalPages, setTotalPages] = useState<number>(1); // Стан для зберігання загальної кількості сторінок результатів
  const [search, setSearch] = useState<string>(""); // Стан для зберігання поточного пошукового запиту
  const [error, setError] = useState<boolean>(false); // Стан для відображення помилки
  const [loading, setLoading] = useState<boolean>(false); // Стан для відображення завантаження основного контенту
  const [loadingMore, setLoadingMore] = useState<boolean>(false); // Стан для відображення завантаження додаткового контенту
  const [isSearching, setIsSearching] = useState<boolean>(false); // Стан для відображення процесу пошуку нових зображень
  const [selectedImage, setSelectedImage] = useState<Image | null>(null); // Стан для зберігання вибраного зображення для модального вікна
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // Стан для відображення/приховування модального вікна

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleSearch = async (searchQuery: string): Promise<void> => {
    try {
      setLoading(true);
      setIsSearching(true);
      setImages([]);
      setPage(1);
      setSearch(searchQuery);

      const dataImg: ImageData | undefined = await getImagesUnplash(searchQuery, 1);
      console.log(dataImg);
      if (!dataImg) {
        throw new Error("No data received from the API");
      }

      setTotalPages(dataImg.total_pages);
      setImages(dataImg.results);

      if (searchQuery.trim() === "") {
        toast.error("The search field cannot be empty!");
        return;
      } else if (!dataImg.total) {
        toast(
          "Sorry, we have not found the photos for your request. Try to write it differently.",
          {
            duration: 5000,
          }
        );
      } else {
        toast.success(`Wow! We found ${dataImg.total} pictures`);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleLoadMore = async (): Promise<void> => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const dataImages: ImageData | undefined = await getImagesUnplash(search, nextPage);

      setImages((prevImages: Image[]): Image[] => {
        if (!dataImages) {
          throw new Error("No data received from the API");
        }

        return [...prevImages, ...dataImages.results];
      });
      setPage(nextPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const isVisible = (): boolean => {
    return totalPages !== 0 && totalPages !== page && !loadingMore;
  };

  const openModal = (image: Image): void => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };
  const closeModal = (): void => setModalIsOpen(false);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: css.toastTextCenter,
        }}
      />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery imageList={images} openModal={openModal} />
      {!loadingMore && !isSearching && (
        <LoadMoreBtn onClick={handleLoadMore} isVisible={isVisible} />
      )}
      {loadingMore && <LoaderMore />}
      <ImageModal
        isOpen={modalIsOpen}
        image={selectedImage}
        onCloseModal={closeModal}
      />
    </>
  );
}

export default App;
