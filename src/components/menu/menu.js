import { useEffect, useState } from "react";
import axios from "axios";
import { TableHead, TableRow } from "../table/table";
import { useSelector, useDispatch } from "react-redux";
import { setMenuItems, updateMenuItem } from "../../modules/menuSlice";
import Table from "react-bootstrap/Table";
import { menuHeads } from "./invariables";
import getMenuRows from "./getMenuRows";
import alertDispatch from "../../modules/alertDispatch";

function Menu(props) {
  let menuItems = useSelector((state) => state.menu.menuItems);
  let dispatch = useDispatch();
  let [reset, resetValues] = useState(false);
  let menuItemsArray = Object.values(menuItems);
  let newMenuItem = {
    id: "new_menu_item",
    name: "",
    duration: 0,
    days: "",
    quantity: 0,
  };

  let handleCreate = (e) => {
    alertDispatch({ message: "loading...", variant: "info" }, dispatch);
    let id = e.target.getAttribute("elemid");
    let item = menuItems[id];
    if (item.name == "") {
      alertDispatch(
        {
          message: "Kindly provide valid name for menu item!",
          variant: "danger",
        },
        dispatch
      );
    } else {
      axios
        .post(
          `/menu/createMenuItem?days=${item.days}&name=${item.name}&duration=${item.duration}&quantity=${item.quantity}`
        )
        .then((res) => {
          alertDispatch(
            {
              message: "Item has been created!!",
              variant: "success",
            },
            dispatch
          );
          resetValues(!reset);
        })
        .catch((err) => {
          alertDispatch(
            {
              message:
                "Sorry!! could not create menu item, cause : " +
                err.response.data,
              variant: "danger",
            },
            dispatch
          );
        });
    }
  };

  let handleUpdate = (e) => {
    alertDispatch({ message: "loading...", variant: "info" }, dispatch);

    let id = e.target.getAttribute("elemid");
    let item = menuItems[id];
    axios
      .put(
        `/menu/modifyMenuItem?days=${item.days}&name=${item.id}&duration=${item.duration}&quantity=${item.quantity}`
      )
      .then((res) => {
        alertDispatch(
          {
            message: "Updated successfully",
            variant: "success",
          },
          dispatch
        );

        resetValues(!reset);
      })
      .catch((err) =>
        alertDispatch(
          {
            message: err.response.data,
            variant: "danger",
          },
          dispatch
        )
      );
  };

  let handleDelete = (e) => {
    alertDispatch({ message: "loading...", variant: "info" }, dispatch);

    let id = e.target.getAttribute("elemid");
    let item = menuItems[id];
    axios
      .delete(`/menu/removeMenuItem?id=${item.id}`)
      .then((res) => {
        alertDispatch(
          {
            message: "Item removed successfully",
            variant: "success",
          },
          dispatch
        );
        resetValues(!reset);
      })
      .catch((err) =>
        alertDispatch(
          { message: err.response.data, variant: "danger" },
          dispatch
        )
      );
  };
  let defaultVal = (type) => {
    switch (type) {
      case "text":
        return "";
      case "checkbox":
        return "";
      case "number":
        return 0;
      default:
        return null;
    }
  };
  let handleChange = (e) => {
    if (!e.target.validity.valid) {
      alertDispatch(
        { message: e.target.validationMessage, variant: "danger" },
        dispatch
      );
    } else {
      let { id, name, value, type } = e.target;
      if (name === "days") {
        value = e["updatedDays"].join(",");
        id = e.target.getAttribute("data-selector");
      }

      if (value.length > 1 && value.startsWith("0")) {
        value = value.slice(1);
      }
      let updatedItem = {
        ...menuItems[id],
        [name]: value ? value : defaultVal(type),
      };
      dispatch(updateMenuItem(updatedItem));
    }
  };

  let menuRows = getMenuRows(
    menuItemsArray,
    handleChange,
    handleCreate,
    handleUpdate,
    handleDelete
  );

  useEffect(() => {
    axios
      .get("/menu/getMenuItems")
      .then((res) => {
        let menuStructuredData = {};
        res.data.forEach((menu) => {
          let { id } = menu;
          menuStructuredData[id] = menu;
        });
        menuStructuredData["new_menu_item"] = newMenuItem;
        dispatch(setMenuItems(menuStructuredData));
      })
      .catch((err) => {
        alertDispatch(
          { message: err.response.data, variant: "danger" },
          dispatch
        );
      });
  }, [props, reset]);

  return (
    <div>
      <Table striped bordered hover>
        <TableHead heads={menuHeads} />
        <tbody>
          {menuRows.map((menuRow, i) => (
            <TableRow key={"menu_table_row_" + i} row={menuRow}></TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Menu;
