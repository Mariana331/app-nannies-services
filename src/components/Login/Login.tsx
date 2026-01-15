import css from "./Login.module.css";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "../ModalContext/UseModal";
import { useState } from "react";

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
    .max(128, "Maximum 8 characters")
    .required("Password required!"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { closeModal } = useModal();

  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(Schema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
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
      </form>
      <button className={css.btn_login} onClick={closeModal}>
        Log In
      </button>
    </div>
  );
}
