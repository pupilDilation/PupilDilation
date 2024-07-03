import React, { useEffect } from 'react';
import Button from '../Button/Button';
import Buttonstyles from '../Button/Button.module.css';
import HeaderStyles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toggleLogin } from '../../features/auth/authSlice';

function Header(){
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const handleLoginClick = () => {
        dispatch(toggleLogin());
        if (isLoggedIn){
            navigate('/login');
        }
        else{
            navigate('/');
        }
        console.log(isLoggedIn);
    }
    const handleSignupClick = () => {
        
    }

    return(
        <div className={HeaderStyles.header}>
            <h1>동공확장</h1>
            <Button className={Buttonstyles.loginBtn} onClick={handleLoginClick} >
                {isLoggedIn ? "Logout" : "Login"}
            </Button>
            {!isLoggedIn && (
                <Button className={Buttonstyles.loginBtn} onClick={handleSignupClick} >
                    Sign up
                </Button>
            )}
        </div>
    );
};

export default Header;