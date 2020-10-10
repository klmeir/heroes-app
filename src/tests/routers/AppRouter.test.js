import React from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter />', () => {
    

    test('debe de mostrar login si no está autenticado', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: false
            }
        };
        
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>            
        );

        expect( wrapper ).toMatchSnapshot();

    });    

    test('debe de mostrar el componente marvel si está autenticado', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Barry'
            }
        };
    
        
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>            
        );

        expect( wrapper.find('.navbar').exists() ).toBe( true );

    });    
    
});
