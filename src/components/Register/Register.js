import React from "react";
import "./Register.css"
import { useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import useInput from "../../utils/hooks/useInput";

function Register(props) {
  const navigate = useNavigate();

  const [isSubmitButtonDisabled, toggleIsSubmitButtonDisabled] = React.useState(true);

  const [nameInput, changeNameInput, handleNameInputFocus, nameInputHasError, nameInputError] = useInput(
    "",
    {
      required: true,
      type: "name",
      minLength: 2,
      maxLength: 30,
    }
  );
  const [emailInput, changeEmailInput, handleEmailInputFocus, emailInputHasError, emailInputError] = useInput(
    "",
    {
      required: true,
      type: "email",
    }
  );
  const [passwordInput, changePasswordInput, handlePasswordInputFocus, passwordInputHasError, passwordInputError] = useInput(
    "",
    {
      required: true,
    }
  );

  // Функция убирает ошибку после использования инпута
  React.useEffect(() => {
    if (props.formError) {
      props.setFormError("");
    }
  }, [nameInput, emailInput, passwordInput]);

  // Управление кнопкой отправки формы
  React.useEffect(() => {
    if (props.formError || nameInputHasError || emailInputHasError || passwordInputHasError) {
      toggleIsSubmitButtonDisabled(true);
    } else {
      toggleIsSubmitButtonDisabled(false);
    }
  }, [props.formError, nameInputHasError, emailInputHasError, passwordInputHasError]);

  function onRegister() {
    props.onRegister({
      name: nameInput,
      email: emailInput,
      password: passwordInput
    });
  }

  function handleChangeApproach() {
    navigate("/signin");
  }

  return (
    <main className="main">
      <Form type="auth" logo={true} heading="Добро пожаловать!" onSubmit={() => {
        onRegister()
      }}>
        <fieldset className="authentication fieldset">
          <div className="form__input-container form__input-container_type_auth">
            <label className="authentication__input-label" htmlFor="registration-name-input">Имя</label>
            <input className={`authentication__input ${nameInputError ? "authentication__input_type_error" : ""} input`}
              id="registration-name-input" type="text"
              value={nameInput} onChange={changeNameInput} onFocus={handleNameInputFocus} required={true} formNoValidate={true} />
            <p className="authentication__input-error">{nameInputError}</p>
          </div>

          <div className="form__input-container form__input-container_type_auth">
            <label className="authentication__input-label" htmlFor="registration-email-input">E-mail</label>
            <input
              className={`authentication__input ${emailInputError ? "authentication__input_type_error" : ""} input`}
              id="registration-email-input" type="email"
              value={emailInput} onChange={changeEmailInput} onFocus={handleEmailInputFocus} required={true} formNoValidate={true} />
            <p className="authentication__input-error">{emailInputError}</p>
          </div>

          <div className="form__input-container form__input-container_type_auth">
            <label className="authentication__input-label"
              htmlFor="registration-password-input">Пароль</label>
            <input
              className={`authentication__input ${passwordInputError ? "authentication__input_type_error" : ""} input`}
              id="registration-password-input"
              type="password" value={passwordInput} onChange={changePasswordInput} onFocus={handlePasswordInputFocus} required={true} formNoValidate={true} />
            <p className="authentication__input-error">{passwordInputError}</p>
          </div>

          <div className="authentication__toolbar authentication__toolbar_type_registration">
            <p className="form__error">{props.formError}</p>
            <button
              className={`authentication__btn-submit ${isSubmitButtonDisabled ? "authentication__btn-submit_disabled" : ""} button`}
              disabled={isSubmitButtonDisabled}>Зарегистрироваться
            </button>
            <div className="authentication__btn-change-approach-container">
              <p className="authentication__btn-change-approach-text">Уже зарегистрированы?</p>
              <button className="authentication__btn-change-approach button"
                onClick={handleChangeApproach}>Войти
              </button>
            </div>
          </div>
        </fieldset>

      </Form>
    </main>
  )
}

export default Register;
