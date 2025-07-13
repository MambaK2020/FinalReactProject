import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import css from "./CallToActionForm.module.css";

import animals from '../../assets/images/animals.png'; 
const schema = yup.object({
  name: yup
    .string()
    .min(2, "Name must contain at least 2 characters")
    .matches(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'\s-]+$/, "Only letters allowed")
    .required("Name is required"),
  phone: yup
    .string()
    .test("phone-format", "Invalid phone format", (value) => {
      if (!value) return true; 
      const uaRegex = /^\+38\d{10}$/;
      const deRegex = /^\+49\d{9,12}$/;
      return uaRegex.test(value) || deRegex.test(value);
    })
    .required("Phone is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
}).required();

const OrderForm = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue 
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3333/api/sale/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        reset(); 
       
        setTimeout(() => setSuccess(false), 5000);
      } else {
        
        console.error("Something went wrong, please try again.");
        
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      
    }
  };

  const formatPhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 

    if (value.length > 0 && !value.startsWith("+")) {
      if (value.startsWith("38") || value.startsWith("49")) {
        value = `+${value}`;
      }
      
    }

    
    if (value.startsWith("+38") && value.length > 13) {
      value = value.substring(0, 13);
    }
    if (value.startsWith("+49") && value.length > 14) {
      value = value.substring(0, 14);
    }

    
    setValue("phone", value, { shouldValidate: true });
  };

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.left}>
          <h2 className={css.title}>5% off on the first order</h2>
          <img src={animals} alt="animals" className={css.animalsImg} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <input {...register("name")} placeholder="Name" className={css.input} />
          {errors.name?.message && <p className={css.errors}>{errors.name.message}</p>}

          
          <input {...register("phone", { onChange: formatPhoneInput })} placeholder="Phone number" className={css.input} />
          {errors.phone?.message && <p className={css.errors}>{errors.phone.message}</p>}

          <input {...register("email")} placeholder="Email" className={css.input} />
          {errors.email?.message && <p className={css.errors}>{errors.email.message}</p>}

          <button className={css.button} type="submit">Get a discount</button>
          {success && <p className={css.success}>Request sent successfully!</p>}
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
