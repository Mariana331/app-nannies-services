import css from "./Nannies.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import NanniesList from "../../components/NanniesList/NanniesList";
import Modal from "../../components/Modal/Modal";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { getNannies } from "../../services/nannies";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useModal } from "../../components/ModalContext/UseModal";
import {
  SORT_ORDER,
  type SortOrder,
  type SortByKey,
  type FilterKey,
} from "../../constants/index";

const pageSize = 3;

interface NanniesProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isAuth: boolean;
}

export default function Nannies({
  favorites,
  toggleFavorite,
  isAuth,
}: NanniesProps) {
  const { closeModal, isModalOpen, modalContent } = useModal();
  const [currentPage, setCurrentPage] = useState(pageSize);
  const [sortBy, setSortBy] = useState<SortByKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDER.ASC);
  const [filterKey, setFilterKey] = useState<FilterKey>("All");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["nannies", sortBy, sortOrder, filterKey],
    queryFn: () => getNannies(sortBy, sortOrder, filterKey),
    placeholderData: keepPreviousData,
  });

  const handleReadMore = () => {
    setCurrentPage((prev) => prev + pageSize);
  };

  const handleFilterChange = (option: string) => {
    const map: Record<
      string,
      { sortBy: SortByKey; sortOrder: SortOrder; filter?: FilterKey }
    > = {
      "A to Z": { sortBy: "name", sortOrder: SORT_ORDER.ASC, filter: "All" },
      "Z to A": { sortBy: "name", sortOrder: SORT_ORDER.DESC, filter: "All" },
      Popular: { sortBy: "rating", sortOrder: SORT_ORDER.DESC, filter: "All" },
      "Not popular": {
        sortBy: "rating",
        sortOrder: SORT_ORDER.ASC,
        filter: "All",
      },
      "Less than 10$": {
        sortBy: "price_per_hour",
        sortOrder: SORT_ORDER.ASC,
        filter: "Less than 10$",
      },
      "Greater than 10$": {
        sortBy: "price_per_hour",
        sortOrder: SORT_ORDER.ASC,
        filter: "Greater than 10$",
      },
      "Show all": { sortBy: "name", sortOrder: SORT_ORDER.ASC, filter: "All" },
    };

    const selected = map[option];
    setSortBy(selected.sortBy);
    setSortOrder(selected.sortOrder);
    if (selected.filter) setFilterKey(selected.filter);
    setCurrentPage(pageSize);
  };

  return (
    <div className={css.nannies_container}>
      <div className={css.nannies}>
        <CustomSelect onChange={handleFilterChange} />
        {data && (
          <NanniesList
            nannies={data.slice(0, currentPage)}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            isAuth={isAuth}
          />
        )}
        {isModalOpen && <Modal onClose={closeModal}>{modalContent}</Modal>}
        {!isLoading && data && data.length === 0 && (
          <p>No nannies found for this filter.</p>
        )}
        {isError && <ErrorMessage />}
        {data && currentPage < data.length && (
          <button
            type="button"
            className={css.btn_nannies}
            onClick={handleReadMore}
          >
            Read more
          </button>
        )}
      </div>
    </div>
  );
}
