import React from "react";

// Кастомный хук для управления инпутом. Здесь есть:
// 1. Удобное использование управляемого инпута;
// 2. Валидация данных в соответствии с конфигом.

// шаблон аргумента validation config:
// {
//   type: email || name || password || <empty>,
//   required: Boolean,
//   minLength: Number,
//   maxLength: Number,
// }

function useInput(defaultValue = "", validationConfig = null) {
  const [value, setValue] = React.useState(defaultValue);
  const [hasError, toggleHasError] = React.useState(false);
  const [error, setError] = React.useState("");
  const [hasBeenFocused, toggleHasBeenFocused] = React.useState(false);

  function handleInput(evt) {
    setValue(evt.target.value);
  }

  function handleFocus() {
    if (!hasBeenFocused) {
      toggleHasBeenFocused(true);
    }
  }

  // Функция валидации инпута
  function validateInput() {
    // проверка длины инпута
    function checkInputLength() {
      if (value.length < validationConfig.minLength) {
        setError(`Минимальное количество символов - ${validationConfig.minLength}.`)
        toggleHasError(true);
      } else if (value.length > validationConfig.maxLength) {
        setError(`Максимальное количество символов - ${validationConfig.maxLength}.`)
        toggleHasError(true);
      }
    }

    // проверка инпута на соответствие особенностям типа данных (email, ссылка и т. д.)
    function checkInputType() {
      let regexp;
      let errorMessage;

      switch (validationConfig.type) {
        case "email":
          regexp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
          errorMessage = "Введите корректный email."
          break;
        case "name":
          regexp = /^[a-zA-ZА-Яа-яё0-9\_\ ]+$/;
          errorMessage = "Имя содержит запрещенные символы."
          break;
      };

      if (!regexp.test(value)) {
        setError(errorMessage)
        toggleHasError(true);
      }
    }

    // проверка на обязательность заполнения поля
    function checkIsRequired() {
      if (value.length === 0) {
        if (hasBeenFocused) {
          setError("Это поле является обязательным.")
        }

        toggleHasError(true);
      }
    }

    // валидация происходит только после установления фокуса на элемент
    if (hasBeenFocused) {
      setError("");
      toggleHasError(false);
      if (validationConfig.minLength && validationConfig.maxLength) {
        checkInputLength();
      }

      if (validationConfig.type) {
        checkInputType();
      }
    }

    if (validationConfig.required) {
      checkIsRequired();
    }
  }

  React.useEffect(() => {
    if (validationConfig) {
      validateInput();
    }
  }, [value]);

  return [value, handleInput, handleFocus, hasError, error];
}

export default useInput;
