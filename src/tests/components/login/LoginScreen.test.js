import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const historyMock = {
        replace: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen 
                history={ historyMock }
            />
        </AuthContext.Provider>            
    );
    
    test('debe mostrarse correctamente', () => {        

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe( 'Login Screen' );

    });

    test('debe de realizar el dispatch y la navegación', () => {
        
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            payload: {
                name: expect.any(String)
            },
            type: types.login
        });

        expect( historyMock.replace ).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');
        handleClick();

        expect( historyMock.replace ).toHaveBeenCalledWith('/dc');
        
    });
    
});
