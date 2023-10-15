import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import useInput from "../../utils/hooks/useInput";

function Login(props) {
  const navigate = useNavigate();

  const [isSubmitButtonDisabled, toggleIsSubmitButtonDisabled] = React.useState(true);

  // Инициализация инпутов с помощью кастомного хука
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

  React.useEffect(() => {
    // Удаление ошибки после редактирования одного из инпутов
    if (props.formError) {
      props.setFormError("");
    }
  }, [emailInput, passwordInput]);

  React.useEffect(() => {
    // Управление состоянием DISABLED кнопки отправления
    if (props.formError || emailInputHasError || passwordInputHasError) {
      toggleIsSubmitButtonDisabled(true);
    } else {
      toggleIsSubmitButtonDisabled(false);
    }
  }, [props.formError, emailInputHasError, passwordInputHasError]);

  function onLogin() {
    props.onLogin({
      email: emailInput,
      password: passwordInput,
    });
  }

  function handleChangeApproach() {
    navigate("/signup");
  }

  return (
    <main className="main">
      <Form type="auth" logo={true} heading="Рады видеть!" onSubmit={() => { onLogin() }}>
        <fieldset className="authentication fieldset">
          <div className="form__input-container form__input-container_type_auth">
            <label className="authentication__input-label" htmlFor="registration-email-input">E-mail</label>
            <input className="authentication__input input" id="registration-email-input" type="email" required={true} value={emailInput} onChange={changeEmailInput} onFocus={handleEmailInputFocus} />
            <p className="authentication__input-error">{emailInputError}</p>
          </div>

          <div className="form__input-container form__input-container_type_auth">
            <label className="authentication__input-label"
              htmlFor="registration-password-input">Пароль</label>
            <input className="authentication__input input" id="registration-password-input"
              type="password" required={true} value={passwordInput} onChange={changePasswordInput} onFocus={handlePasswordInputFocus} />
            <p className="authentication__input-error">{passwordInputError}</p>
          </div>

          <div className={`authentication__toolbar authentication__toolbar_type_login`}>
            <p className="form__error">{props.formError}</p>
            <button
              className={`authentication__btn-submit ${isSubmitButtonDisabled ? "authentication__btn-submit_disabled" : ""} button`}
              disabled={isSubmitButtonDisabled}>Войти
            </button>            <div className="authentication__btn-change-approach-container">
              <p className="authentication__btn-change-approach-text">Еще не зарегистрированы?</p>
              <button className="authentication__btn-change-approach button"
                onClick={handleChangeApproach}>Регистрация
              </button>
            </div>
          </div>
        </fieldset>
      </Form>
    </main>
  )
}

export default Login;
