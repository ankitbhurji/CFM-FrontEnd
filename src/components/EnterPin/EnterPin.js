import styles from './EnterPin.module.css'
import React, { useState } from "react";
import OtpInput from "react18-input-otp";
import axios from "axios";

function EnterPin(props) {

    const [otp, setOtp] = useState("");
    const [key, setKey] = useState({
        isWarningKey:false
    });
    
    async function clickButton(){
        const url = 'http://localhost:3001/getpassword'
        const passcode = await axios.get(url);
        // console.log(passcode.data[0].password)
        // console.log(typeof(passcode.data[0].password))
        if(!(passcode.data[0].password==otp)){
            props.lockKey({isLockKey:false, isEnterPinKey:true, isSetPinKey:true});
            setKey({...key, isWarningKey:true})
        }else{
            // alert('go to home')
            props.lockKey({isLockKey:false, isEnterPinKey:false, isSetPinKey:false});
        }
    }
  
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
                onChange={(enteredOtp)=>{setOtp(enteredOtp)}}
                numInputs={4}
                // separator={<span>-</span>}
                // separateAfter={3}
                // onSubmit={console.log(otp)}
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
                <button onClick={clickButton} className={styles.passcodeButton}>Enter</button>
            </div>
            {key.isWarningKey?(<p className={styles.warning}>incorrect pin !</p>):('')}
        </div>
       </div>
     );
}

export default EnterPin;

