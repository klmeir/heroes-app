import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {

    const { dispatch } = useContext( AuthContext );    

    const handleLogin = () => {  
        
        const lastPath = localStorage.getItem('lastPath') || '/';
        
        dispatch({
            type: types.login,
            payload: {
                name: 'Barry'
            }
        });  
        
        history.replace( lastPath );   
    }

    return (
        <div className="container mt-5">
            <h1>Login Screen</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    )
}

LoginScreen.propTypes = {
    history: PropTypes.object.isRequired
}
