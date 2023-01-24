import "./foodItem.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../modules/orderSlice";

function FoodItem(props) {
  let foodItem = props.foodItem;
  const cartItems = useSelector((state) => state.orderItems.cart);
  const quantity = cartItems.hasOwnProperty(foodItem.id)
    ? cartItems[foodItem.id].quantity
    : 0;
  const dispatch = useDispatch();

  const handleClick = (e, foodItem) => {
    const action = e.target.getAttribute("action");
    const [id, name, cost] = [foodItem.id, foodItem.name, foodItem.cost];

    if (action == "increaseQuant") {
      dispatch(addItem([id, name, cost]));
    } else {
      dispatch(removeItem([id]));
    }
  };

  return (
    <Card style={{ width: "18rem", margin: "0px 10px 40px 20px" }}>
      <Card.Img variant="top" alt={foodItem.name} src={foodItem.img} />
      <Card.Body>
        <Card.Title>{foodItem.name}</Card.Title>
        <Card.Text>
          Style - {foodItem.style}
          <br />
          Spice - {foodItem.spiceLevel}
          <br />
          Vegan Food - {foodItem.isVegan == "yes" ? "Yes" : foodItem.isVegan}
          <br />
          Cost - {foodItem.cost}
        </Card.Text>
        <Button
          style={{
            marginRight: "5px",
            backgroundColor: "grey",
            borderColor: "grey",
          }}
          size="sm"
          action="decreaseQuant"
          item={foodItem.id}
          onClick={(e) => handleClick(e, foodItem)}
          variant="primary"
        >
          -
        </Button>
        {quantity}
        <Button
          style={{ marginLeft: "5px" }}
          size="sm"
          action="increaseQuant"
          item={foodItem.id}
          onClick={(e) => handleClick(e, foodItem)}
          variant="primary"
        >
          +
        </Button>
      </Card.Body>
    </Card>
  );
}

export default FoodItem;
