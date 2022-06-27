import { useState } from "react";

import {
  auth,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // console.log(formFields);
  //# handle Submit...
  const handleSubmit = async (event) => {
    event.preventDefault();

    //* checks if passwords match or not
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    //* tries to create the user with email and password
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.error("User creation encountered an error", error);
      }
    }
  };

  //# handle change...
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    // console.log(e.target.name);
    // console.log(name, value);
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          name="displayName"
          labelFor="displayName"
          id="displayName"
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label="Email"
          type="text"
          required
          name="email"
          labelFor="email"
          id="email"
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          type="text"
          required
          name="password"
          labelFor="password"
          id="password"
          onChange={handleChange}
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="text"
          required
          name="confirmPassword"
          labelFor="confirmPassword"
          id="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
