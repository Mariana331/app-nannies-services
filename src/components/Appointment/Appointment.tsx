import css from "./Appointment.module.css";
import { useModal } from "../ModalContext/UseModal";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Nanny } from "../../types/types";

interface AppointmentFormData {
  address: string;
  tel: string;
  number: number;
  meetingTime: string;
  email: string;
  text: string;
  comment: string;
}

interface AppointmentProps {
  nanny: Nanny;
}

export const AppointmentSchema = Yup.object().shape({
  address: Yup.string()
    .min(3, "Address must be at least 3 characters")
    .required("Address is required"),

  tel: Yup.string()
    .matches(/^\+?[0-9\s-]+$/, "Invalid phone number format")
    .required("Phone number is required"),

  number: Yup.number()
    .typeError("Number must be a number")
    .positive("Must be positive")
    .required("Number is required"),

  meetingTime: Yup.string().required("Time is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  text: Yup.string()
    .min(5, "Text must be at least 5 characters")
    .required("Text is required"),
  comment: Yup.string().optional().required("Comment is required"),
});

export default function Appointment({ nanny }: AppointmentProps) {
  const { closeModal } = useModal();

  const { register, handleSubmit, reset } = useForm<AppointmentFormData>({
    resolver: yupResolver(AppointmentSchema),
    defaultValues: {
      meetingTime: "00:00",
    },
  });

  const onSubmit = (data: AppointmentFormData) => {
    console.log(data);
    reset();
    closeModal();
  };
  return (
    <div className={css.appointment}>
      <button
        className={css.btn_close}
        aria-label="Close modal"
        onClick={closeModal}
      >
        <svg width={19} height={19} className={css.close_icon}>
          <use href="/sprite.svg#icon-x"></use>
        </svg>
      </button>
      <div className={css.appointment_info}>
        <h2 className={css.appointment_title}>
          Make an appointment with a babysitter
        </h2>
        <p className={css.appointment_text}>
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>
      </div>
      <div className={css.nanny_info}>
        <div className={css.nanny_photo}>
          <img
            className={css.avatar}
            src={nanny.avatar_url}
            alt={nanny.name}
            width={44}
            height={44}
          ></img>
        </div>
        <div className={css.nanny_name}>
          <p className={css.nanny_name_text}>Nanny</p>
          <p className={css.nanny_name_name}>{nanny.name}</p>
        </div>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form_row}>
          <input
            {...register("text")}
            className={css.input_row}
            type="text"
            placeholder="Address"
            required
          ></input>
          <input
            {...register("tel")}
            className={css.input_row}
            type="tel"
            placeholder="+380"
            required
          ></input>
        </div>
        <div className={css.form_row}>
          <input
            {...register("number")}
            className={css.input_row}
            type="number"
            placeholder="Child's age"
            required
          ></input>
          <input
            {...register("meetingTime")}
            className={css.input_row}
            type="time"
            required
          ></input>
        </div>
        <input
          {...register("email")}
          className={css.input}
          type="email"
          placeholder="Email"
          required
        ></input>
        <input
          {...register("text")}
          className={css.input}
          type="text"
          placeholder="Father's or mother's name"
          required
        ></input>
        <textarea
          {...register("comment")}
          className={css.textarea}
          name="comment"
          placeholder="Comment"
          rows={3}
          required
        />
        <button className={css.form_btn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
