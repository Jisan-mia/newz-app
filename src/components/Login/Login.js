import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import { firebaseConfig } from "./firebaseConfig";
import "./Login.css";

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const Login = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const [newUser, setNewUser] = useState(false);
	const [user, setUser] = useState({
		isLoggedIn: false,
		name: "",
		password: "",
		email: "",
		nameErr: "",
		passwordErr: "",
		emailErr: "",
	});

	let history = useHistory();
	let location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } };

	const handleBlur = (e) => {
		let nameErrMsg, emailErrMsg, passwordErrMsg;
		let isFieldValid = false;

		if (e.target.name === "name") {
			if (!e.target.value) {
				nameErrMsg = "Name Cannot be empty";
			} else if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
				nameErrMsg = "Enter a valid name";
			} else if (e.target.value.trim().length < 3) {
				nameErrMsg = "Must be at least 3 letters";
			} else {
				nameErrMsg = "";
				isFieldValid = true;
			}
		} else if (e.target.name === "email") {
			if (!e.target.value) {
				emailErrMsg = "Email cannot be empty";
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
				emailErrMsg = "Enter valid email";
			} else {
				emailErrMsg = "";
				isFieldValid = true;
			}
		} else if (e.target.name === "password") {
			if (!e.target.value) {
				passwordErrMsg = "Password cannot be empty";
			} else if (e.target.value.length < 6) {
				passwordErrMsg = "Enter at least 6 char";
			} else if (!/[a-z]/i.test(e.target.value)) {
				passwordErrMsg = "Password must contain at least one letter";
			} else if (!/[0-9]/.test(e.target.value)) {
				passwordErrMsg = "Password must contain at least one digit";
			} else {
				passwordErrMsg = "";
				isFieldValid = true;
			}
		}

		//final form validation
		if (isFieldValid) {
			const newUserInfo = { ...user };
			newUserInfo[e.target.name] = e.target.value;
			if (e.target.name === "name") {
				newUserInfo.nameErr = nameErrMsg;
			} else if (e.target.name === "email") {
				newUserInfo.emailErr = emailErrMsg;
			} else if (e.target.name === "password") {
				newUserInfo.passwordErr = passwordErrMsg;
			}

			setUser(newUserInfo);
		} else if (!isFieldValid) {
			const newUserInfo = { ...user };
			newUserInfo[e.target.name] = "";
			if (e.target.name === "name") {
				newUserInfo.nameErr = nameErrMsg;
			} else if (e.target.name === "email") {
				newUserInfo.emailErr = emailErrMsg;
			} else if (e.target.name === "password") {
				newUserInfo.passwordErr = passwordErrMsg;
			}
			setUser(newUserInfo);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newUser && user.name && user.email && user.password) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(user.email, user.password)
				.then((res) => {
					console.log(res.user);
					const newUserInfo = { ...user };
					newUserInfo.isLoggedIn = true;
					setUser(newUserInfo);
					setLoggedInUser(newUserInfo);
					updateName(user.name);
					history.replace(from);
					alert("You've successfully signed up");
				})
				.catch((error) => {
					var errorMessage = error.message;
					alert(errorMessage);
				});

			const modifiedUser = { ...user };
			modifiedUser.name = "";
			modifiedUser.email = "";
			modifiedUser.password = "";
			setUser(modifiedUser);

			e.target.reset();
		} else if (!newUser && user.email && user.password) {
			firebase
				.auth()
				.signInWithEmailAndPassword(user.email, user.password)
				.then((res) => {
					const newUserInfo = { ...user };
					newUserInfo.isLoggedIn = true;
					const currentuser = firebase.auth().currentUser;
					const currentUsername = currentuser.displayName;
					newUserInfo.name = currentUsername;
					setUser(newUserInfo);
					setLoggedInUser(newUserInfo);
					history.replace(from);
					alert("Signed in successfully");
				})
				.catch((error) => {
					alert(error.message);
				});
		} else {
			alert("Enter valid information");
		}
	};

	//update display name
	const updateName = (name) => {
		const user = firebase.auth().currentUser;

		user.updateProfile({
			displayName: name,
		});
	};

	return (
		<div className="login-page">
			<form onSubmit={handleSubmit} className="login-form">
				{newUser && (
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input onBlur={(e) => handleBlur(e)} name="name" type="text" />
						{user.nameErr && <i className="error-msg">{user.nameErr}</i>}
					</div>
				)}
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input onBlur={(e) => handleBlur(e)} name="email" type="text" />
					{user.emailErr && <i className="error-msg">{user.emailErr}</i>}
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						onBlur={(e) => handleBlur(e)}
						type="password"
						name="password"
					/>
					{user.passwordErr && <i className="error-msg">{user.passwordErr}</i>}
				</div>

				<input
					className="loggin-btn"
					type="submit"
					value={newUser ? "Sign Up" : "Sign In"}
				/>

				<div className="create-or-login">
					<p>
						{newUser
							? "Already have an account . "
							: "Don't have an account ? "}
						<span onClick={() => setNewUser(!newUser)}>
							{newUser ? "Sign in" : "Sign Up"}
						</span>
					</p>
					<p></p>
				</div>
			</form>
		</div>
	);
};

export default Login;
