import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import mainApi from "../../utils/api/MainApi"
import Landing from "../Landing/Landing";
import Login from "../Login/Login";
import Register from "../Register/Register";

function App() {
  const navigate = useNavigate();

  // Данные пользователя
  const [isLogged, toggleIsLogged] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: "",
  });

  // Данные форм
  const [registerFormError, setRegisterFormError] = React.useState("");
  const [loginFormError, setLoginFormError] = React.useState("");
  const [profileFormError, setProfileFormError] = React.useState("");
  const [profileNotification, setProfileNotification] = React.useState("");

  React.useEffect(() => {
    // Отправка запроса о провкерке авторизации
    if (!userInfo.name || !userInfo.email || !userInfo.id) {
      mainApi.getUserInfo()
        .then((res) => {
          setUserInfo({
            id: res._id,
            email: res.email,
            name: res.name,
          });
          toggleIsLogged(true);
        })
        .catch(() => {
          console.log("Вы не авторизованы.");
        });
    }
  }, [isLogged]);

  function handleRegister(registrationParams = {}) {
    mainApi.register(registrationParams)
      .then(() => {
        handleLogin(registrationParams);
      })
      .catch((err) => {
        if (err === 409) {
          setRegisterFormError("Пользователь с таким email уже существует.");
        } else {
          setRegisterFormError("При регистрации пользователя произошла ошибка.");
        }
      });
  }

  function handleLogin(loginParams = {}) {
    mainApi.login(loginParams)
      .then(() => {
        toggleIsLogged(true);
      })
      .then(() => {
        navigate("/movies", { replace: true })
      })
      .catch((err) => {
        if (err === 401) {
          setLoginFormError("Вы ввели неправильный логин или пароль.");
        } else {
          setLoginFormError("При авторизации произошла ошибка. Переданный токен некорректен.");
        }
      });
  }

  function handleExitAccount() {
    mainApi.exitAccount()
      .then(() => {
        toggleIsLogged(false);
        localStorage.clear();
        navigate("/");
      })
      .catch(() => {
        setProfileFormError("При выходе из аккаунта произошла ошибка.")
      });
  }

  function handleEditProfile(userParams = {}) {
    mainApi.editProfile(userParams)
      .then((res) => {
        setUserInfo({
          ...userInfo,
          name: res.name,
          email: res.email,
        })
      })
      .then(() => {
        setProfileNotification("Данные успешно сохранены!");
      })
      .catch((err) => {
        if (err === 409) {
          setProfileFormError("Пользователь с таким email уже существует.");
        } else {
          setProfileFormError("При обновлении профиля произошла ошибка.");
        }
      });
  }

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Register onRegister={handleRegister} formError={registerFormError}
          setFormError={setRegisterFormError} />} />

        <Route path="/signin"
          element={<Login onLogin={handleLogin} formError={loginFormError} setFormError={setLoginFormError} />} />
      </Routes>
    </div>
  );
}

export default App;
