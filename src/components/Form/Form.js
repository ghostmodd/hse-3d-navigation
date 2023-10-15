import React from "react";
import "./Form.css"

function Form(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit();
  }

  return (
    <form className={`form form_type_${props.type}`} onSubmit={handleSubmit} noValidate={true} >
      <div className={`form__title-info form__title-info_type_${props.type}`}>
        {props.logo && <h1>@officecreators</h1>}
        <h1 className={`form__heading form__heading_type_${props.type}`}>{props.heading}</h1>
      </div>
      {props.children}
    </form>
  )
}

export default Form;
