import "./signin.css";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import alertDispatch from "../../../modules/alertDispatch";
import { setAuth } from "../../../modules/authSlice";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const dispatch = useDispatch();
  const schema = Yup.object({
    email: Yup.string().required("email is required").email("Invalid email"),
    password: Yup.string()
      .required("password is required")
      .min(8, "min length should be 8 ")
      .matches(
        /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/g,
        "Password can only contain Latin letters."
      ),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    schema.isValid({ email, password }).then((res) => {
      if (res) {
        axios
          .get(`/users/authUser?email=${email}&password=${password}`)
          .then((res) => {
            alertDispatch(
              {
                message: "You have successfully signed in",
                variant: "success",
              },
              dispatch
            );
            sessionStorage.setItem("role", res.data.role);
            dispatch(setAuth(true));
          })
          .catch((err) => {
            alertDispatch(
              { message: err.response.data, variant: "danger" },
              dispatch
            );
          });
      } else {
        alertDispatch(
          { message: "Kindly enter valid values", variant: "danger" },
          dispatch
        );
      }
    });
  };
  return (
    <form>
      <div className="parentGrid">
        <div className="gridInput">
          <input
            style={{ gridRow: "2/3" }}
            className="gridItem"
            type="text"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{ gridRow: "4/5" }}
            className="gridItem"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            style={{ gridRow: "6/7" }}
            className="gridItem"
            type="Submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          />
          {errMsg ? errMsg : ""}
        </div>
      </div>
    </form>
  );
}

export default SignIn;
