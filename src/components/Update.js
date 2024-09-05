import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { useForm } from "react-hook-form";
import "../components/css/create.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let inputValues = formValues;
    inputValues[name] = value;
    setFormValues({ ...inputValues });
  };
  let navigate = useNavigate();
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  const [data, setData] = useState([]);
  const UserID = useParams();
  const getID = UserID.id;

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      // setIsLoading(true);
      const result = await axios.get(
        "http://localhost:7400/users/AllUsers/" + getID
      );
      console.log(result.data);

      console.log(result, "users");

      // if (result.data) {
      let array = result.data;
      //   for (let i = 0; i < array.length; i++) {
      //     const element = array[i];
      //     element._id = i + 1;
      //   }
      setFormValues(array);
      // console.log(array, "data");
      // setIsLoading(false);
      // }
    } catch (err) {
      console.log(err);
    }
  };
  const UpdateHandleProducts = async (e) => {
    e.preventDefault();
    try {
      let vals = formValues;
      const valuesObj = {
        ...vals,
      };
      console.log(valuesObj);
      const Result = await axios.put(
        "http://localhost:7400/users/update/" + getID,
        valuesObj
      );

      if (Result) {
        console.log(Result);
        // setProducts(Result);
        toast("User updated Successfully!!!", {
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
    <div>
      {" "}
      <div className="CHead">
        <div className="d-flex flex-column justify-content-center align-items-center bg-light">
          <h2>Update User</h2>
        </div>
        <div className="formsection">
          <form onSubmit={UpdateHandleProducts}>
            <label>Name</label>
            <input
              value={formValues.name}
              name="name"
              className="form_inputfield"
              type="text"
              placeholder="E.g: John Smith"
              onChange={(e) => onChangeHandler(e)}
              required
              // {...register("name", {
              //   required: true,
              //   maxLength: 20,
              //   pattern: /^[A-Za-z]+$/i,
              // })}
            />
            {/* {errors?.Name?.type === "required" && <p>This field is required</p>}
      {errors?.Name?.type === "maxLength" && (
        <p className="errors"> name cannot exceed 20 characters</p>
      )} */}
            {/* {errors?.Name?.type === "pattern" && (
        <p className="errors">Alphabetical characters only</p>
      )} */}
            <label>Age</label>
            <input
              value={formValues.age}
              name="age"
              className="form_inputfield"
              type="number"
              placeholder="E.g: John Smith"
              onChange={(e) => onChangeHandler(e)}
              required
              // {...register("age", { min: 12, max: 99 })}
            />
            {/* {errors.age && (
        <p className="errors">
          You Must be older then 12 and younger then 99 years old
        </p>
      )} */}
            <label>Email</label>
            <input
              value={formValues.email}
              name="email"
              className="form_inputfield"
              type="email"
              placeholder="E.g: John Smith"
              onChange={(e) => onChangeHandler(e)}
              required
              // {...register("email", {
              //   pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              // })}
            />
            {/* {errors?.email?.type === "pattern" && (
        <p className="errors">Invalid Email</p>
      )} */}
            <label>Mobile</label>
            <input
              value={formValues.mobile}
              name="mobile"
              type="tel"
              className="form_inputfield"
              placeholder="E.g: John Smith"
              onChange={(e) => onChangeHandler(e)}
              // {...register("mobile")}
            />
            {/* {errors.mobile && (
        <p className="errors">
          You Must be older then 18 and younger then 99 years old
        </p>
      )} */}
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
