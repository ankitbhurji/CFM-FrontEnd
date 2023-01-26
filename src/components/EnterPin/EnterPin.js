import styles from './EnterPin.module.css'
import React, { useState } from "react";
import OtpInput from "react18-input-otp";


function EnterPin() {

    const [otp, setOtp] = useState("");
    const handleChange = (enteredOtp) => {
        setOtp(enteredOtp);
    };
  
    return ( 
       <div className={styles.LockContainer}>
        <div className={styles.lock}>
            <div  className='row'>
                <div className={styles.name}><p>Enter Account Pin</p></div>
            </div>
            <div  className='row'>
                {/* <div>password</div> */}
                <OtpInput className={styles.otp}
                value={otp}
                onChange={handleChange}
                numInputs={4}
                // separator={<span>-</span>}
                // separateAfter={3}
                onSubmit={console.log(otp)}
                inputStyle={{
                    border: "1px solid #C8D6E5",
                    background:'white',
                    borderRadius: "8px",
                    width: "40px",
                    height: "40px",
                    fontSize: "20px",
                    color: "#000",
                    fontWeight: "400",
                    caretColor: "blue",
                    margin:'10px',
                  }}
                  focusStyle={{
                    border: "1px solid #CFD3DB",
                    outline: "none"
                  }}
                />
            </div>
            <div  className='row'>
                <button className={styles.passcodeButton}>Enter</button>
            </div>
        </div>
       </div>
     );
}

export default EnterPin;

