import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  let inputElementClass = [classes.InputElement]
  //console.log(props);
  if( props.invalid && props.hasValidation && props.touched)
  {
    inputElementClass = [classes.InputElement,classes.Invalid];
  }


  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputElementClass.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputElementClass.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select 
        className={inputElementClass.join(" ")} 
        value={props.value}
        onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
        className={inputElementClass.join(" ")}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
