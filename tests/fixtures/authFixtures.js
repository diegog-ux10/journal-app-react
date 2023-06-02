export const initialState = {
    status: 'no-authenticated', // 'checking', no-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated', // 'checking', no-authenticated, authenticated
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'John Doe',
    photoURL: 'http://demo.jpeg',
    errorMessage: null
}

export const noAuthenticatedState = {
    status: 'no-authenticated', // 'checking', no-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'John Doe',
    photoURL: 'http://demo.jpeg',
    errorMessage: null

}