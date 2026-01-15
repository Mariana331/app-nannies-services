import css from "./Registration.module.css";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "../ModalContext/UseModal";
import { useState } from "react";

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
    .max(128, "Maximum 8 characters")
    .required("Password required!"),
});

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);

  const { closeModal } = useModal();
  const { register, handleSubmit } = useForm<RegistrationFormData>({
    resolver: yupResolver(Schema),
  });

  const onSubmit = (data: RegistrationFormData) => {
    console.log(data);
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
      </form>
      <button className={css.btn_signup} onClick={closeModal}>
        Sign Up
      </button>
    </div>
  );
}
