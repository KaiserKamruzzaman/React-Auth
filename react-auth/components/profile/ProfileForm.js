import { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";

// let token = "";
// if (typeof window !== "undefined") {
//   token = localStorage.getItem("token");
// }

const ProfileForm = () => {

  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredNewPass = passwordInputRef.current.value;
    //validation

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBT04MUIPhtUNDySJT6t9sUntwJHI2LJzE",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPass,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("okay");
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
        alert('password change successfully!!!');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={passwordInputRef}
          minLength="1"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
