import React, { Suspense, useState } from "react";
import BreadCrumbs from "../breadCrumbs/breadCrumbs";
const Orders = React.lazy(() => import("../orders/orders"));
const FoodItems = React.lazy(() => import("../foodItems/foodItems"));
const Menu = React.lazy(() => import("../menu/menu"));
const SignIn = React.lazy(() => import("../user/signin/signin"));

function HomePage() {
  //useEffect()
  let [page, setPage] = useState("Food");
  let role = sessionStorage.getItem("role");
  let pages = ["Orders", "Food"];
  let cookie = document.cookie;
  console.log("cookie", cookie);
  if (role == "admin") {
    pages.push("Menu");
  }

  if (!cookie) {
    pages.push("SignIn");
  } else {
    if (pages.includes("SignIn")) {
      pages.splice(pages.indexOf("SignIn", 1));
    }
  }
  let getPage = (page) => {
    switch (page) {
      case "Orders":
        return <Orders />;
      case "Menu":
        return <Menu />;
      case "SignIn":
        return <SignIn />;
      default:
        return <FoodItems />;
    }
  };
  return (
    <>
      <div>
        <BreadCrumbs
          items={pages}
          setPage={(pageVal) => {
            setPage(pageVal);
          }}
        />
        <Suspense fallback={"loading..."}>{getPage(page)}</Suspense>
      </div>
    </>
  );
}

export default HomePage;
