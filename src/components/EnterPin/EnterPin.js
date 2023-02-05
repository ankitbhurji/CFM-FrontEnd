import styles from './EnterPin.module.css'
import React, { useEffect, useState } from "react";
import OtpInput from "react18-input-otp";
import axios from "axios";

function EnterPin(props) {

    // const [otp, setOtp] = useState("");
    const [password, setPassword] = useState({
        passcode: '',
        hidePasscode:'****',
        isWarningKey:false,
        isBlank:false
    });
    // console.log(password.passcode)
    
    function changePassword(inputValue){
        setPassword({
            ...password, 
            passcode:inputValue,
            isWarningKey:false, 
            isBlank:false
            })
    }

    async function clickButton(){
        const url = 'http://localhost:3001/api/security/getpassword'
        const passcode = await axios.get(url);

        if(password.passcode===''){
            setPassword({
                ...password, 
                isBlank:true
                })
        }else{
            if(!(passcode.data[0].password==password.passcode)){
                props.lockKey({
                    isLockKey:false, 
                    isEnterPinKey:true, 
                    isSetPinKey:true
                    });
                setPassword({
                    ...password, 
                    isWarningKey:true
                    })
            }else{
                props.lockKey({
                    isLockKey:false, 
                    isEnterPinKey:false, 
                    isSetPinKey:false
                    });
                    localStorage.setItem('localStatus', JSON.stringify(false));
            }
        }
    }

   
  
    return ( 
        <div className={styles.demo}>
            <div className={styles.LockContainer}>
                <div className={styles.lock}>
                    <div  className='row'>
                        <div className={styles.name}><p>Enter Account Pin</p></div>
                    </div>
                    <div  className='row'>
                        <OtpInput className={styles.otp}
                        // value={otp}
                        value={password.passcode}
                        // value={password.hidePasscode}
                        // onChange={(enteredOtp)=>{setOtp(enteredOtp)}}
                        onChange={(enteredOtp)=>{changePassword(enteredOtp)}}
                        numInputs={4}
                        isInputNum={true}
                        isInputSecure={true}
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
                    {
                        password.isWarningKey?(<p className={styles.warning}>incorrect pin !</p>)
                        :
                        password.isBlank?(<p className={styles.warning}>please enter the pin !</p>)
                        :
                        ('')
                    }
                </div>
            </div>
       </div>
     );
}

export default EnterPin;

