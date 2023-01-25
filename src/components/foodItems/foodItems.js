import { useSelector, useDispatch } from "react-redux";
import FoodItem from "../foodItem/foodItem";
import PageNumberBar from "../pagination/pagination";
import { setFoodData, setTotalItems } from "../../modules/foodItemSlice";
import { useEffect } from "react";
import axios from "axios";
import "./foodItems.css";
import Button from "react-bootstrap/esm/Button";
import alertDispatch from "../../modules/alertDispatch";
import { resetCart } from "../../modules/orderSlice";

function FoodItems(props) {
  let foodItems = useSelector((state) => state.foodItems.value);
  const dispatch = useDispatch();
  let pageNumber = useSelector((state) => state.pagination.pageNumber);
  let offset = (pageNumber - 1) * 10;
  let cartItems = useSelector((state) => state.orderItems.cart);
  let handleOrderClick = () => {
    if (Object.values(cartItems).length == 0) {
      return;
    }
    axios
      .post("/orders/createOrder", { orderItems: cartItems })
      .then((res) => {
        alertDispatch(
          {
            message: "Order placed successfully",
            variant: "success",
          },
          dispatch
        );
      })
      .catch((err) => {
        alertDispatch(
          { message: err.response.data, variant: "danger" },
          dispatch
        );
      });
    dispatch(resetCart());
  };
  let mapRes = foodItems.map((obj) => {
    return <FoodItem key={obj.name} foodItem={obj} />;
  });
  useEffect(() => {
    //getting food items from databases and setting store in global state container
    axios
      .get(`/getFoodItems?offset=${offset}`)
      .then((foodItems) => {
        dispatch(setFoodData(foodItems.data.data));
        dispatch(setTotalItems(foodItems.data.length));
      })
      .catch((err) => {
        alertDispatch(
          { message: err.response.data, variant: "danger" },
          dispatch
        );
      });
  }, [pageNumber]);

  return (
    <>
      <Button
        variant="primary"
        style={{ position: "absolute", right: "9%" }}
        size="sm"
        onClick={(e) => handleOrderClick()}
      >
        Place Order
      </Button>
      <div className={"flexContainer"}>
        {mapRes}
        <PageNumberBar
          totalItems={useSelector((state) => state.foodItems.totalItems)}
        />
      </div>
    </>
  );
}

export default FoodItems;
