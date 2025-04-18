import { Amplify } from 'aws-amplify';
import { signIn, signUp, signOut, confirmSignUp, getCurrentUser } from 'aws-amplify/auth';

const amplifyConfig = {
    Auth: {
        Cognito: {
            region: import.meta.env.VITE_COGNITO_REGION,
            userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
            userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
            authenticationFlowType: 'USER_PASSWORD_AUTH',
            signUpVerificationMethod: 'code',
            oauth: {
                domain: import.meta.env.VITE_COGNITO_DOMAIN,
                scope: ['email', 'openid', 'profile'],
                redirectSignIn: window.location.origin,
                redirectSignOut: window.location.origin,
                responseType: 'code'
            }
        }
    }
};

// Only configure Amplify on the client side
if (typeof window !== 'undefined') {
    try {
        Amplify.configure(amplifyConfig);
        console.log('Amplify configured successfully:', amplifyConfig);
    } catch (error) {
        console.error('Error configuring Amplify:', error);
    }
}

export { 
    Amplify,
    signIn,
    signUp,
    signOut,
    confirmSignUp,
    getCurrentUser
}; 