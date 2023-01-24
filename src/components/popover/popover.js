import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const PopOver = (props) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Orders</Popover.Header>
      <Popover.Body>{props.render}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant="success">Check Orders</Button>
    </OverlayTrigger>
  );
};
export default PopOver;
