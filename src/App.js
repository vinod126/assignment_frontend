import "./App.css";
import HomePage from "./components/homepage/homePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import BreadCrumbs from "./components/breadCrumbs/breadCrumbs";
import SignIn from "./components/user/signin/signin";
import SignUp from "./components/user/signup/signup";
import Alert from "react-bootstrap/Alert";
import { setAuth } from "./modules/authSlice";
import "./App.css";

function App() {
  const [page, setPage] = useState("SignIn");
  const auth = useSelector((state) => state.auth.value);
  const [show, setShow] = useState(false);
  const alert = useSelector((state) => state.alert.value);
  const dispatch = useDispatch();
  useEffect(() => {
    setShow(true);
    setTimeout(() => setShow(false), 1000);
  }, [alert]);
  console.log("kookie ", sessionStorage.getItem("role"));
  if (sessionStorage.getItem("role")) {
    dispatch(setAuth(true));
  }
  const getPages = () => {
    return page == "SignIn" ? <SignIn /> : <SignUp />;
  };
  return (
    <>
      {show ? (
        <Alert
          key={alert.variant}
          className="alertPopOver"
          dismissible
          onClose={() => setShow(false)}
          variant={alert.variant}
        >
          {alert.message}
        </Alert>
      ) : (
        ""
      )}
      <BreadCrumbs
        className={auth ? "hideClass" : ""}
        items={["SignIn", "SignUp"]}
        setPage={(pageVal) => {
          setPage(pageVal);
        }}
      />
      {auth ? <HomePage /> : getPages()}
    </>
  );
}

export default App;
