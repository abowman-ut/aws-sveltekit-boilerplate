import { Amplify } from 'aws-amplify';
import { signIn, signUp, signOut, confirmSignUp, getCurrentUser } from 'aws-amplify/auth';

// Note: This file runs in the browser, so we must use import.meta.env
// process.env is not available in the browser
const amplifyConfig = {
    Auth: {
        Cognito: {
            // These values are replaced at build time by Vite
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
        console.log('✅ Amplify configured successfully');
    } catch (error) {
        console.error('❌ Error configuring Amplify:', error);
        throw new Error('Failed to configure Amplify. Please check your environment variables and configuration.');
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