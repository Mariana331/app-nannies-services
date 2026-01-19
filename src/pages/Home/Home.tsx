import Hero from "../../components/Hero/Hero";
import css from "./Home.module.css";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={isHome ? css.home : css.not_home}>
      <Hero />
    </div>
  );
}
