import "./App.css";
import HomePage from "./components/homepage/homePage";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import BreadCrumbs from "./components/breadCrumbs/breadCrumbs";
import SignIn from "./components/user/signin/signin";
import SignUp from "./components/user/signup/signup";
import Alert from "react-bootstrap/Alert";

function App() {
  const [page, setPage] = useState("SignIn");
  const [auth, setAuth] = useState(false);
  const [show, setShow] = useState(false);
  const alert = useSelector((state) => state.alert.value);

  useEffect(() => {
    setShow(true);
    setTimeout(() => setShow(false), 5000);
  }, [alert]);

  useEffect(() => {
    if (sessionStorage.getItem("role")) {
      setAuth(true);
    }
  });
  const getPages = () => {
    return page == "SignIn" ? (
      <SignIn
        setAuth={(authVal) => {
          setAuth(authVal);
        }}
      />
    ) : (
      <SignUp />
    );
  };
  return (
    <>
      {show ? (
        <Alert
          key={alert.variant}
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
