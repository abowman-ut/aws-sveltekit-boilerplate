export function load() {
    return {
        serverTime: new Date().toISOString(),
        environment: 'AWS Amplify'
    };
}