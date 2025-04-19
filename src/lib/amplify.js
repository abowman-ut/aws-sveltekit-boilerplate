'use client';
import { Amplify } from 'aws-amplify';
import { signIn, signUp, signOut, confirmSignUp, getCurrentUser } from 'aws-amplify/auth';

// Get Cognito configuration based on environment
const getCognitoConfig = () => {
    if (import.meta.env.DEV) {
        return {
            region: import.meta.env.VITE_COGNITO_REGION,
            userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
            userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
            domain: import.meta.env.VITE_COGNITO_DOMAIN
        };
    } else {
        return {
            region: process.env.VITE_COGNITO_REGION,
            userPoolId: process.env.VITE_COGNITO_USER_POOL_ID,
            userPoolClientId: process.env.VITE_COGNITO_CLIENT_ID,
            domain: process.env.VITE_COGNITO_DOMAIN
        };
    }
};

const cognitoConfig = getCognitoConfig();

const amplifyConfig = {
    Auth: {
        Cognito: {
            region: cognitoConfig.region,
            userPoolId: cognitoConfig.userPoolId,
            userPoolClientId: cognitoConfig.userPoolClientId,
            authenticationFlowType: 'USER_PASSWORD_AUTH',
            signUpVerificationMethod: 'code',
            oauth: {
                domain: cognitoConfig.domain,
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
        Amplify.configure(amplifyConfig, { ssr: false });
        console.log('✅ Amplify configured successfully');
        console.log('🚀 Amplify config:', amplifyConfig);
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