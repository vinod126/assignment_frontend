import { useState } from "react";
import "./signup.css";
import * as Yup from "yup";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setName] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const schema = Yup.object({
    username: Yup.string().required("User name required").min(3),
    email: Yup.string().required("email is required").email("Invalid email"),
    role: Yup.string().required("role is required").min(3),
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
    schema.isValid({ email, username, role, password }).then((res) => {
      if (res) {
        axios
          .post(
            `/users/createUser?email=${email}&username=${username}&password=${password}&role=${role}`
          )
          .then((res) => {
            console.log("User created successfully");
          })
          .catch((err) => {
            console.log("error : ", err);
          });
      } else {
        setErrMsg("Kindly enter valid values");
      }
    });
  };

  return (
    <form>
      <div className="parentGrid">
        <div className="gridInputSignUp">
          <input
            style={{ gridRow: "1/2" }}
            className="gridItem"
            required
            name="email"
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{ gridRow: "3/4" }}
            className="gridItem"
            required
            name="username"
            type="text"
            placeholder="user name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={{ gridRow: "5/6" }}
            required
            name="password"
            className="gridItem"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ gridRow: "7/8" }} className="gridItem">
            Role :{" "}
            <input
              id="admin"
              name="role"
              type="radio"
              onChange={(e) => setRole(e.target.id)}
            />
            <label>&nbsp;Admin &nbsp; &nbsp;</label>
            <input
              id="user"
              type="radio"
              name="role"
              onChange={(e) => setRole(e.target.id)}
            />
            <label>&nbsp;User</label>
          </div>
          <input
            style={{ gridRow: "9" }}
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

export default SignUp;
