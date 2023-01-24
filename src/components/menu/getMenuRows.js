import DropDown from "../dropdown/dropdown";
import CheckBox from "../checkbox/checkbox";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { weekDays } from "./invariables";
import Button from "react-bootstrap/Button";

const getMenuRows = (
  menuItemsArray,
  handleChange,
  handleCreate,
  handleUpdate,
  handleDelete
) => {
  return menuItemsArray.map((menus) => {
    let createElem = false;
    let { id, name, duration, days, quantity } = menus;

    if (id == "new_menu_item") {
      createElem = true;
    }

    let dropDownItems = weekDays.map((day) => {
      let checked = days ? days.split(",").includes(day) : false;
      return (
        <CheckBox
          key={`checkbox_${id}_${day}`}
          id={`${id}_${day}`}
          selector={`${id}`}
          value={day}
          checked={checked}
          handleChange={handleChange}
        />
      );
    });

    let dropdownElem = (
      <DropDown
        key={`dropdown_${id}`}
        id={`${id}_dropdown`}
        dropDownItems={dropDownItems}
        variant={"secondary"}
        autoClose="outside"
        title={"Available on days"}
      />
    );
    let inputField = (
      id,
      key,
      value,
      name,
      min,
      max,
      type,
      handleChange,
      placeholder,
      defaultVal
    ) => {
      return (
        <input
          key={key}
          id={id}
          value={value ? value : defaultVal}
          name={name}
          min={min}
          max={max}
          type={type}
          onChange={handleChange}
          placeholder={placeholder}
        />
      );
    };

    let inputElemQuantity = inputField(
      id,
      `input_quant_${id}`,
      quantity,
      "quantity",
      0,
      1000,
      "number",
      handleChange,
      "",
      0
    );
    let inputElemDuration = inputField(
      id,
      `input_duration_${id}`,
      duration,
      "duration",
      0,
      180,
      "number",
      handleChange,
      "",
      0
    );
    let inputElemId = inputField(
      id,
      `input_id_${id}`,
      name,
      "name",
      0,
      15,
      "text",
      handleChange,
      "Enter Item Name...",
      ""
    );
    name = createElem ? inputElemId : name;
    let ActionItems = createElem ? (
      <Button
        variant="primary"
        elemid={`${id}`}
        onClick={handleCreate}
        size="sm"
      >
        Create
      </Button>
    ) : (
      <ButtonGroup size="sm">
        <Button elemid={`${id}`} onClick={handleUpdate} variant="warning">
          update
        </Button>
        &nbsp;
        <Button elemid={`${id}`} onClick={handleDelete} variant="danger">
          Delete
        </Button>
      </ButtonGroup>
    );
    return [
      name,
      inputElemDuration,
      dropdownElem,
      inputElemQuantity,
      ActionItems,
    ];
  });
};

export default getMenuRows;
