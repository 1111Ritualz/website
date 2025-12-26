import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { cognitoConfig } from '../cognitoConfig';

const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId,
});

export const authService = {
    signUp: (username, email, password) => {
        return new Promise((resolve, reject) => {
            const attributeList = [];

            const dataEmail = { Name: 'email', Value: email };
            const attributeEmail = new CognitoUserAttribute(dataEmail);
            attributeList.push(attributeEmail);

            userPool.signUp(username, password, attributeList, null, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result.user);
            });
        });
    },

    confirmSignUp: (username, code) => {
        return new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username: username,
                Pool: userPool,
            });

            user.confirmRegistration(code, true, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },

    login: (usernameOrEmail, password) => {
        return new Promise((resolve, reject) => {
            const authDetails = new AuthenticationDetails({
                Username: usernameOrEmail,
                Password: password,
            });

            const user = new CognitoUser({
                Username: usernameOrEmail,
                Pool: userPool,
            });

            user.authenticateUser(authDetails, {
                onSuccess: (result) => {
                    resolve(result);
                },
                onFailure: (err) => {
                    reject(err);
                },
                newPasswordRequired: (userAttributes, requiredAttributes) => {
                    // Handle NEW_PASSWORD_REQUIRED challenge if needed
                    // For now, we assume standard auth flow
                    reject(new Error("New Password Required challenge not fully implemented in this demo."));
                }
            });
        });
    },

    logout: () => {
        const user = userPool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    },

    forgotPassword: (username) => {
        return new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username: username,
                Pool: userPool,
            });

            user.forgotPassword({
                onSuccess: (data) => resolve(data),
                onFailure: (err) => reject(err),
            });
        });
    },

    confirmNewPassword: (username, code, newPassword) => {
        return new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username: username,
                Pool: userPool,
            });

            user.confirmPassword(code, newPassword, {
                onSuccess: () => resolve(),
                onFailure: (err) => reject(err),
            });
        });
    },

    getCurrentUser: () => {
        return userPool.getCurrentUser();
    },

    getSession: () => {
        return new Promise((resolve, reject) => {
            const user = userPool.getCurrentUser();
            if (!user) {
                reject(new Error("No user found"));
                return;
            }
            user.getSession((err, session) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(session);
            });
        });
    },

    getUserAttributes: () => {
        return new Promise((resolve, reject) => {
            const user = userPool.getCurrentUser();
            if (!user) {
                reject(new Error("No user found"));
                return;
            }
            user.getSession((err, session) => { // Ensure session exists first
                if (err) {
                    reject(err);
                    return;
                }
                user.getUserAttributes((err, attributes) => {
                    if (err) {
                        reject(err);
                    } else {
                        const results = {};
                        for (let i = 0; i < attributes.length; i++) {
                            results[attributes[i].getName()] = attributes[i].getValue();
                        }
                        resolve(results);
                    }
                })
            });
        })
    }

};
