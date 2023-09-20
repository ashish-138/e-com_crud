import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const navigate = useNavigate();
  const handleLogin = async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Please Enter Correct Details");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="text"
        name=""
        value={email}
        placeholder="Enter Email ID"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        name=""
        value={password}
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="appButton">
        LOGIN
      </button>
    </div>
  );
};

export default Login;
