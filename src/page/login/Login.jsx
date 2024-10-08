import React from 'react'
import "./login.css"

const Login = () => {
  return (
    <div className="loginPage">
        <form class="formControl" action="">
        <p class="title">Login</p>
        <div class="inputFieled">
            <input required="" class="input" type="text" />
            <label class="label" for="input">Enter Email</label>
        </div>
        <div class="inputFieled">
            <input required="" class="input" type="password" />
            <label class="label" for="input">Enter Password</label>
        </div>
        <a>Forgot your password?</a>
        <button class="submit-btn">Sign In</button>
        </form>
    </div>
  )
}

export default Login
