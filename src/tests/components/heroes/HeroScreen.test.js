import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroScreen />', () => {    

    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }
   
    test('debe de mostrar el componente redirect si no hay argumentos en el URL', () => {        

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero'] }>
                <HeroScreen 
                    history={ historyMock }
                />
            </MemoryRouter>        
        );
        
        expect( wrapper.find('Redirect').exists() ).toBe( true );

    });    

    test('debe de mostrar un hero si el parámetro existe y se encuentra', () => {
       
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route path="/hero/:heroeId" component={ HeroScreen } />
            </MemoryRouter>        
        );

        // expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.row').exists() ).toBe( true );
        
    });

    test('debe de regresar a la pantalla anterior con PUSH', () => {
        
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route 
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen history={ historyMock } /> } 
                />
            </MemoryRouter>        
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).toHaveBeenCalledWith( '/' );
        expect( historyMock.goBack ).not.toHaveBeenCalled();

    });

    test('debe de regresar a la pantalla anterior GOBACk', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route 
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen history={ historyMock } /> } 
                />
            </MemoryRouter>        
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).toHaveBeenCalledTimes( 0 );
        expect( historyMock.goBack ).toHaveBeenCalled();

    });    

    test('debe de llamar el redirect si el hero no existe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider123'] }>
                <Route 
                    path="/hero/:heroeId"
                    component={ () => <HeroScreen history={ historyMock } /> } 
                />
            </MemoryRouter>        
        );

        expect( wrapper.text() ).toBe( '' );

    });    
    
});
