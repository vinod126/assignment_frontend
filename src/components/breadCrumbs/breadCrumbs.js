import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./breadCrumb.css";
function BreadCrumbs(props) {
  let items = props.items;
  return (
    <Breadcrumb className={props.className}>
      {items.map((item) => {
        return (
          <Breadcrumb.Item key={item} onClick={() => props.setPage(item)}>
            {item}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default BreadCrumbs;
