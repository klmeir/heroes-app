import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Navbar } from '../../../components/ui/Navbar';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router-dom';
import { types } from '../../../types/types';

describe('Pruebas en <Navbar />', () => {

    const historyMock = {
        replace: jest.fn(),
        push: jest.fn(),
        location: {},          
        listen: jest.fn(),      
        createHref: jest.fn()      
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Barry'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue } >
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar />
                </Router>                
            </MemoryRouter>            
        </AuthContext.Provider>        
    );

    afterEach( () => {
        jest.clearAllMocks();
    });
    
    test('debe de mostrar el componente correctamente', () => {
       
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe( 'Barry' );
        
    });

    test('debe de llamar el logout y usar el history ', () => {
        
        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch ).toHaveBeenCalledWith( {
            payload: {},
            type: types.logout
        });

        expect( historyMock.replace ).toHaveBeenCalledWith( '/login' );

    });       

});
