import css from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { useModal } from "../ModalContext/UseModal";

interface HeaderProps {
  setModalType: (type: "login" | "register") => void;
  page: string;
  isAuth: boolean;
  onLogOut: () => void;
  userName: string;
}

export default function Header({
  setModalType,
  page,
  isAuth,
  onLogOut,
  userName,
}: HeaderProps) {
  const { openModal } = useModal();
  const location = useLocation();

  const openLogin = () => {
    setModalType("login");
    openModal();
  };

  const openRegistration = () => {
    setModalType("register");
    openModal();
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor:
      page === "/nannies" || page === "/favorites" ? "red" : "transparent",
  };

  const isNannies = location.pathname === "/nannies";
  const isFavorites = location.pathname === "/favorites";

  return (
    <div className={css.header} style={headerStyle}>
      <div className={css.logo}>
        <Link to="/" aria-label="Home" className={css.logo_text}>
          Nanny.Services
        </Link>
      </div>
      <div className={css.menu}>
        <nav className={css.nav}>
          <ul className={css.navigation}>
            <li>
              <Link className={css.nav_text} to="/">
                Home
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link className={css.nav_text} to="/nannies">
                Nannies
              </Link>
              {isNannies && (
                <svg className={css.icon_point} width={8} height={8}>
                  <use href="/sprite.svg#icon-point_white"></use>
                </svg>
              )}
            </li>
            {isAuth && (
              <li className={css.nav_item}>
                <Link className={css.nav_text} to="/favorites">
                  Favorites
                </Link>
                {isFavorites && (
                  <svg className={css.icon_point} width={8} height={8}>
                    <use href="/sprite.svg#icon-point_white"></use>
                  </svg>
                )}
              </li>
            )}
          </ul>
        </nav>
        <ul className={css.registration}>
          {isAuth ? (
            <>
              <li className={css.user_info}>
                <button className={css.user_btn}>
                  <svg className={css.icon_user} width={24} height={24}>
                    <use href="/sprite.svg#icon-user"></use>
                  </svg>
                </button>
                <p className={css.user_text}>{userName}</p>
              </li>
              <li>
                <button
                  className={css.btn_logOut}
                  type="button"
                  onClick={onLogOut}
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  className={css.btn_log}
                  type="button"
                  onClick={openLogin}
                >
                  Log In
                </button>
              </li>
              <li>
                <button
                  className={css.btn_registration}
                  type="button"
                  onClick={openRegistration}
                >
                  Registration
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
