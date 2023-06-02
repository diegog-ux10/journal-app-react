import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Tests on authSlice', () => {
    test('should return initialState and call auth', () => {
        const state = authSlice.reducer( initialState, {});

        expect( authSlice.name).toBe('auth');
        expect( state ).toEqual( initialState );
    });
    test('should do authentication', () => {
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual(authenticatedState);
    });
    test('should make logout without arguments', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'no-authenticated', // 'checking', no-authenticated, authenticated
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        }); 
    });
    test('should make logout with arguments', () => {
        const errorMessage = 'Wrong Credentials'
        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
        expect(state).toEqual({
            status: 'no-authenticated', // 'checking', no-authenticated, authenticated
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        }); 
    });
    test('should change state to checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking')
    });
    
});
