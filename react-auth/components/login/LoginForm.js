import { useState, useRef, useContext } from "react";
import classes from "./LoginForm.module.css";
import { useRouter } from "next/router";
import AuthContext from "../../store/auth-context";
//custom hook for validation
import useInput from "../../hooks/use-input";
// import { useSelector, useDispatch } from "react-redux";

const LoginForm = () => {
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput
  } = useInput((value) => value.trim() !== "" && value.length >= 6 );
  // console.log(passwordInputHasError);

  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    // const enteredEmail = emailInputRef.current.value;
    // const enteredPassword = passwordInputRef.current.value;
    // console.log(enteredEmail);
    // console.log(enteredPassword);
    console.log(enteredEmailIsValid);
    console.log(enteredPasswordIsValid);
    if(!enteredEmailIsValid || !enteredPasswordIsValid)
    {
      return;
    }

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBT04MUIPhtUNDySJT6t9sUntwJHI2LJzE";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBT04MUIPhtUNDySJT6t9sUntwJHI2LJzE";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed...";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        authCtx.login(data.idToken);
        // localStorage.setItem("token", data.idToken);
        router.push("/home");
      })
      .catch((error) => alert(error.message));

      // resetEmailInput();
      // resetPasswordInput();

  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={emailInputHasError ? classes.invalid : classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailInputHasError && (
            <p className={classes.errorText}>
              <b>Invalid Email...</b>
            </p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordInputHasError && isLogin &&  (
            <p className={classes.errorText}>
              <b>Invalid Password..!!</b>
            </p>
          )}
           {passwordInputHasError && !isLogin  && (
            <p className={classes.errorText}>
              <b>Password should be 6 character long!!</b>
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
