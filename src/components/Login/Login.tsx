import css from "./Login.module.css";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "../ModalContext/UseModal";
import { useState } from "react";
import { login } from "../../services/users";
import { getUserName } from "../../services/users";
import type { LoginRequest } from "../../services/users";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AxiosError } from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

const Schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .max(128, "Maximum 128 characters")
    .required("Password required!"),
});

interface LoginProps {
  setIsAuth: (value: boolean) => void;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login({ setIsAuth, setUserName }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { closeModal } = useModal();

  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data as LoginRequest);
      localStorage.setItem("token", res.idToken);
      localStorage.setItem("lid", res.localId);
      localStorage.setItem("refreshToken", res.refreshToken);

      const userNameFromDB = await getUserName(res.localId, res.idToken);
      localStorage.setItem("userName", userNameFromDB);
      setUserName(userNameFromDB);

      toast.success("Login successful!");
      closeModal();
      setIsAuth(true);
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: { message: string } }>;
      toast.error(err.response?.data.error.message || "Something went wrong");
    }
  };

  return (
    <div className={css.login}>
      <button
        className={css.btn_close}
        aria-label="Close modal"
        onClick={closeModal}
      >
        <svg width={19} height={19} className={css.close_icon}>
          <use href="/sprite.svg#icon-x"></use>
        </svg>
      </button>
      <div className={css.login_info}>
        <h2 className={css.login_title}>Log In</h2>
        <p className={css.login_text}>
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          className={css.input}
          type="email"
          placeholder="Email"
          required
        />
        <div className={css.box_password}>
          <button
            className={css.btn_eyes}
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <svg width={20} height={20} className={css.eye_icon}>
                <use href="/sprite.svg#icon-eye"></use>
              </svg>
            ) : (
              <svg width={20} height={20} className={css.eye_icon_off}>
                <use href="/sprite.svg#icon-eye-off"></use>
              </svg>
            )}
          </button>
          <input
            {...register("password")}
            className={css.input}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />
        </div>
        <button className={css.btn_login} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}
