import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function Header(){
    const isLogged = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'});
    };

    return(
        <div className="header">
            <h1>동공확장</h1>
            {isLogged ? (
                <button onClick ={handleLogout}>Logout</button>
            ) : (
                !isLoginPage && <button onClick={() => navigate('/login')}>Login</button>
            )}
        </div>
    );
}

export default Header;