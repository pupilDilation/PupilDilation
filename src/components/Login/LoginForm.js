import 

fuction LoginForm(){
    return(
        <div className={InputStyles.inputWrapper}>
      <div className={InputStyles.loginText}>
        <h5>로그인</h5>
      </div>
      <div className={InputStyles.loginWrapper}>
        <Input className={InputStyles.input1} />
        <Input className={InputStyles.input1} />
        <input type="checkbox" id="saveIdCheckBox" />
        <label htmlFor="saveIdCheckBox">IODDIDIID</label>
      </div>
    </div>
    );
}