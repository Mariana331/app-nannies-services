import css from "./Registration.module.css";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "../ModalContext/UseModal";
import { useState } from "react";
import { logUp } from "../../services/users";
import type { RegistrationRequest } from "../../types/users";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AxiosError } from "axios";

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too long")
    .required("Name is required!"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .max(128, "Maximum 128 characters")
    .required("Password required!"),
});

interface RegistrationProps {
  setIsAuth: (value: boolean) => void;
}

export default function Registration({ setIsAuth }: RegistrationProps) {
  const [showPassword, setShowPassword] = useState(false);

  const { closeModal } = useModal();
  const { register, handleSubmit } = useForm<RegistrationFormData>({
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const res = await logUp(data as RegistrationRequest);
      localStorage.setItem("token", res.idToken);
      localStorage.setItem("uid", res.localId);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("userName", data.name);

      toast.success("Registration successful!");
      closeModal();
      setIsAuth(true);
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: { message: string } }>;
      toast.error(err.response?.data.error.message || "Something went wrong");
    }
  };

  return (
    <div className={css.registration}>
      <button
        className={css.btn_close}
        aria-label="Close modal"
        onClick={closeModal}
      >
        <svg width={19} height={19} className={css.close_icon}>
          <use href="/sprite.svg#icon-x"></use>
        </svg>
      </button>
      <div className={css.registration_info}>
        <h2 className={css.registration_title}>Registration</h2>
        <p className={css.registration_text}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          className={css.input}
          type="text"
          placeholder="Name"
          required
        />
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
        <button className={css.btn_signup} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
