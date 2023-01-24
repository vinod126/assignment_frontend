import { useEffect, useState } from "react";
export default function CheckBox(props) {
  let [checkboxVal, setCheckBoxVal] = useState(props.checked);

  useEffect(() => {}, [props]);

  let handleChange = (e) => {
    setCheckBoxVal(!checkboxVal);
    let checkedItems = Object.values(
      document.querySelectorAll(`input[data-selector=${props.selector}]`)
    ).filter((ele) => ele?.checked === true);
    let updatedDays = checkedItems.map((ele) => {
      let idArr = ele.id.split("_");
      return idArr[idArr.length - 1];
    });
    e["updatedDays"] = updatedDays;
    props.handleChange(e);
  };

  return (
    <>
      <label htmlFor={props.id}>
        <input
          key={props.id}
          style={{ cursor: "pointer" }}
          id={`${props.id}`}
          type="checkbox"
          data-selector={`${props.selector}`}
          name="days"
          defaultChecked={checkboxVal}
          onChange={(e) => handleChange(e)}
        />
        &nbsp;
        {props.value}
      </label>
    </>
  );
}
