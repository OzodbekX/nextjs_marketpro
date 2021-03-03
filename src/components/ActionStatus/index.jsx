import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAppMessage,
  selectAppMessageType,
} from "../../redux/selectors/app";
import { useAlert } from "react-alert";

const SUCCESS = "success";
const FAIL = "fail";
const WARNING = "warning";

const ActionStatus = ({ message, type }) => {
  const alert = useAlert();

  useEffect(() => {
    if (message && type) {
      if (type === SUCCESS) {
        alert.success(message);
      } else if (type === FAIL) {
        alert.error(message);
      } else if (type === WARNING) {
        alert.warning(message);
      }
    }
  }, [message, type]);

  return null;
};

const mapStateToProps = createStructuredSelector({
  message: selectAppMessage,
  type: selectAppMessageType,
});

export default connect(mapStateToProps)(ActionStatus);
