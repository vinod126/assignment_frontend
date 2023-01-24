import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import alertDispatch from "../../modules/alertDispatch";
import { setHistory, setInProgress } from "../../modules/orderSlice";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import "./orders.css";
import Badge from "react-bootstrap/Badge";

function Orders(props) {
  const dispatch = useDispatch();
  const historyOrders = useSelector((state) => state.orderItems.historyOrders);
  const inProgressOrders = useSelector(
    (state) => state.orderItems.inProgressOrders
  );
  const [progress, setProgress] = useState({});
  const [update, setUpdate] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const [review, setReview] = useState({});
  const [refreshReview, setRefreshReview] = useState(true);
  const handleRating = (e, item) => {
    let itemName = e.target.innerText;
    axios
      .delete(`/review/removeReview?elem=${item.id}`)
      .then((res) => {
        alertDispatch(
          {
            message: `You have rated ${itemName} for ${item.name}`,
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
  };

  let rejectOrder = (id) => {
    axios
      .put(`/orders/modifyOrderItems?id=${id}&status=Rejected`)
      .then(() => {
        alertDispatch(
          { message: `Rejected ${id} successfully`, variant: "success" },
          dispatch
        );
      })
      .catch((err) => {
        alertDispatch(
          { message: err.response.data, variant: "danger" },
          dispatch
        );
      });
  };

  useEffect(() => {
    let progress = {};
    inProgressOrders.forEach((obj) => {
      if (obj.duration > 0) {
        let timeLapsed = Date.now() - obj.timeStamp;
        let val = timeLapsed / (obj.duration * 600);
        if (val >= 100) {
          setRefresh(!refresh);
          setRefreshReview(!refreshReview);
        }
        progress[obj.id] = Math.floor(val);
      } else {
        progress[obj.id] = 100;
      }
    });
    setProgress(progress);

    let timer = setInterval(() => {
      setUpdate(update + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [update, inProgressOrders]);

  useEffect(() => {
    axios.get("/review/getReview").then((res) => setReview(res.data));
  }, [refreshReview, props]);

  useEffect(() => {
    axios
      .get("/orders/getOrderItems")
      .then((res) => {
        dispatch(
          setHistory(
            res.data.filter((obj) => obj.status != "Accepted").slice(0, 100)
          )
        );
        dispatch(
          setInProgress(res.data.filter((obj) => obj.status == "Accepted"))
        );
      })
      .catch((err) =>
        alertDispatch(
          { message: err.response.data, variant: "danger" },
          dispatch
        )
      );
  }, [refresh, props]);

  return (
    <div>
      <section key={"section1"} style={{ padding: "2vw" }}>
        <h2>Orders </h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {inProgressOrders.map((obj) => {
            return (
              <>
                <Card key={obj.id}>
                  <Card.Header>Order Id : ${obj.id}</Card.Header>
                  <ListGroup variant="flush">
                    {obj.orderItems.map((ele) => {
                      return (
                        <>
                          <ListGroup.Item key={`${obj.id}_${ele.name}`}>
                            <pre>{`${ele.name.padEnd(20, " ")}(${
                              ele.quantity
                            })`}</pre>
                          </ListGroup.Item>
                        </>
                      );
                    })}
                    <ListGroup.Item key={`${obj.id}_progress`}>
                      Progress:&nbsp;
                      {Math.ceil(
                        obj.duration - (progress[obj.id] * obj.duration) / 100
                      )}
                      &nbsp;mins left
                      <ProgressBar
                        animated
                        label={`${progress[obj.id]}%`}
                        now={progress[obj.id]}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item key={`${obj.id}_reject`}>
                      {sessionStorage.getItem("role") == "admin" ? (
                        <Button onClick={() => rejectOrder(obj.id)}>
                          Reject
                        </Button>
                      ) : (
                        ""
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </>
            );
          })}
        </div>
      </section>
      <section key={"section2"} style={{ padding: "2vw" }}>
        <h2>History</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {historyOrders.map((obj) => {
            return (
              <>
                <Card>
                  <Card.Header>Order Id : ${obj.id}</Card.Header>
                  <ListGroup variant="flush">
                    {obj.orderItems.map((ele) => {
                      return (
                        <ListGroup.Item key={`${obj.id}_${ele.name}`}>
                          <pre>{`${ele.name.padEnd(20, " ")}(${
                            ele.quantity
                          })`}</pre>
                        </ListGroup.Item>
                      );
                    })}
                    <ListGroup.Item key={`${obj.id}_status`}>
                      <pre>{`${"Status".padEnd(15, " ")}${obj.status}`}</pre>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </>
            );
          })}
        </div>
      </section>
      <footer>
        {review.id ? (
          <div>
            <strong>Rate</strong> <em>{review.name}</em> &nbsp;
            {[1, 2, 3, 4, 5].map((ele, i) => (
              <>
                <Badge
                  key={"badge" + i}
                  onClick={(e) => {
                    handleRating(e, review);
                  }}
                  bg="secondary"
                >
                  {ele}
                </Badge>
                &nbsp;
              </>
            ))}
          </div>
        ) : (
          ""
        )}
      </footer>
    </div>
  );
}

export default Orders;
