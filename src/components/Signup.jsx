import React from 'react';
import styles from "../css/Login.module.css";


const Signup = () => {
  return (
    <div className={styles.logincontainer}>
      <form className={styles.loginform}>  
      <input type='text' name='name' placeholder='name' />
      <input type='text' name='email' placeholder='email'  />
      <input type='password' name='password' placeholder='password' />
       <button className={styles.loginbutton} href="/" >Signup</button>
       <a href="/login">Already signed in?</a>
       </form>
    </div>
  )
}

export default Signup;
