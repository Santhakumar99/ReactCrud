import React from "react";
import { useForm } from "react-hook-form";
import "../components/css/create.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  // your form submit function which will invoke after successful validation

  const AddHandleProducts = async (data) => {
    // e.preventDefault();
    try {
      let vals = data;
      const valuesObj = {
        ...vals,
      };
      console.log(valuesObj);
      const Result = await axios.post(
        `http://localhost:7400/users/`,
        valuesObj
      );

      if (Result) {
        console.log(Result);
        // setProducts(Result);
        toast("User Added Successfully!!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <ToastContainer />
      <div className="CHead">
        <div className="d-flex flex-column justify-content-center align-items-center bg-light">
          <h2>Add Users</h2>
        </div>
        <div className="formsection">
          <form onSubmit={handleSubmit(AddHandleProducts)}>
            <label> Name</label>
            <input
              {...register("name", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors?.Name?.type === "required" && <p>This field is required</p>}
            {errors?.Name?.type === "maxLength" && (
              <p className="errors"> name cannot exceed 20 characters</p>
            )}
            {errors?.Name?.type === "pattern" && (
              <p className="errors">Alphabetical characters only</p>
            )}
            <label>Age</label>
            <input {...register("age", { min: 12, max: 99 })} />
            {errors.age && (
              <p className="errors">
                You Must be older then 12 and younger then 99 years old
              </p>
            )}
            <label>Email</label>
            <input
              {...register("email", {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {errors?.email?.type === "pattern" && (
              <p className="errors">Invalid Email</p>
            )}
            <label>Mobile</label>
            <input {...register("mobile")} />
            {errors.mobile && (
              <p className="errors">
                You Must be older then 18 and younger then 99 years old
              </p>
            )}
            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
