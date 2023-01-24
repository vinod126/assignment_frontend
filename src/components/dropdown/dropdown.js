import DropdownButton from "react-bootstrap/DropdownButton";
import "../dropdown/dropdown.css";

function DropDown(props) {
  let dropDownList = props.dropDownItems;

  return (
    <DropdownButton
      autoClose={props.autoClose}
      title={props.title}
      variant={props.variant}
    >
      {dropDownList.map((list, i) => (
        <li className={`dropDownListItems`} key={`${props.id}_${i}`}>
          {list}
        </li>
      ))}
    </DropdownButton>
  );
}
export default DropDown;
