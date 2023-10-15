import React from "react";

// кастомный хук, который позволяет удобно извлекать...
// ...данные из локального хранилища и записывать их в стейт
function useLocalStorage(key, defaultValue = null) {
  const [value, setValue] = React.useState(() => {
    // проверка на наличие данных в локальном хранилище
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }

    return defaultValue;
  });

  // При изменении ключа или значения данные устанавливаются в локальное хранилище
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
