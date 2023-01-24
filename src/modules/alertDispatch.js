import { setAlert } from "./alertSlice";
const alertDispatch = (alert, dispatch) => {
  dispatch(setAlert(alert));
};
export default alertDispatch;
