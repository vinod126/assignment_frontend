import React, { Suspense, useState } from "react";
import BreadCrumbs from "../breadCrumbs/breadCrumbs";
const Orders = React.lazy(() => import("../orders/orders"));
const FoodItems = React.lazy(() => import("../foodItems/foodItems"));
const Menu = React.lazy(() => import("../menu/menu"));

function HomePage() {
  //useEffect()
  let [page, setPage] = useState("Food");
  let role = sessionStorage.getItem("role");
  let pages = ["Orders", "Food"];
  if (role == "admin") {
    pages.push("Menu");
  }
  let getPage = (page) => {
    switch (page) {
      case "Orders":
        return <Orders />;
      case "Menu":
        return <Menu />;
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
