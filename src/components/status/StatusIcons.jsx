import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import React from "react";

export const StatusIcons = ({ statID }) => {
  let icon;
  if (statID == 2) {
    icon = <FontAwesomeIcon icon={faCircleCheck} size="lg" color="green"/>;
  } else if (statID == 3) {
    icon = <FontAwesomeIcon icon={faCircleXmark} size="lg" color="red"/>;
  } else {
    icon = <FontAwesomeIcon icon={faClock} size="lg" color="gray"/>;
  }
  return <>{icon}</>;
};
