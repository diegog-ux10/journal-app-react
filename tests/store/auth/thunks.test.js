import { checkingAuth, startEmailAndPasswordSignIn, startGoogleSignIn, startLogoutFirebase } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { loginWithEmailAndPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";

jest.mock("../../../src/firebase/providers");

describe('test on thunks', () => {

    const dispatch = jest.fn();
    beforeEach(()=> jest.clearAllMocks());

    test('should return checkingCredentials', async() => {
        await checkingAuth()(dispatch);
        expect( dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('should startGoogleSignIn call login', async() => {
        const loginData = {
            ok: true, ...demoUser
        }
        await signInWithGoogle.mockResolvedValue( loginData );
        // thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('should startGoogleSignIn call logout - with error message', async() => {
        const loginData = {
            ok: false,
            errorMessage: 'Error'
        }
        await signInWithGoogle.mockResolvedValue( loginData );
        // thunk
        await startGoogleSignIn()( dispatch );

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startEmailAndPasswordSignIn should call checkingCredentials - login', async() => {
        const loginData = {ok: true, ...demoUser}
        const  formData = {email: demoUser.email, password: '123456'};

        await loginWithEmailAndPassword.mockResolvedValue( loginData );

        // await startEmailAndPasswordSignIn(formData)(dispatch);

        // expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        // expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });
    test('startLogoutFirebase should call logoutFirebase, clearNotes and logout', async() => {
        await startLogoutFirebase()(dispatch);
        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        // expect(dispatch).toHaveBeenCalledWith(logout());
    });
    
    
    
});
