import Header from "../components/Header/Header";
import Nannies from "../pages/Nannies/Nannies";
import Home from "../pages/Home/Home";
import Favorites from "../pages/Favorites/Favorites";
import { Routes, Route, useLocation } from "react-router-dom";
import css from "./App.module.css";
import Login from "../components/Login/Login";
import Registration from "../components/Registration/Registration";
import Modal from "../components/Modal/Modal";
import { useModal } from "../components/ModalContext/UseModal";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { logout } from "../services/users";

function App() {
  const { closeModal, isModalOpen } = useModal();
  const [modalType, setModalType] = useState<
    "login" | "register" | "appointment" | null
  >(null);
  const [isAuth, setIsAuth] = useState<boolean>(
    () => !!localStorage.getItem("token")
  );
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (nannyName: string) => {
    setFavorites((prev) => {
      let updated;
      if (prev.includes(nannyName)) {
        updated = prev.filter((name) => name !== nannyName);
      } else {
        updated = [...prev, nannyName];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const location = useLocation();
  const page = location.pathname;

  return (
    <div className={css.app_container}>
      <Header
        setModalType={setModalType}
        page={page}
        isAuth={isAuth}
        userName={localStorage.getItem("userName") || ""}
        onLogOut={() => {
          logout();
          setIsAuth(false);
          localStorage.removeItem("favorites");
        }}
      />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {modalType === "login" && <Login setIsAuth={setIsAuth} />}
          {modalType === "register" && <Registration setIsAuth={setIsAuth} />}
        </Modal>
      )}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/nannies"
          element={
            <Nannies
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              isAuth={isAuth}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              isAuth={isAuth}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
