const firebaseErrorCodes: { [key: string]: string } = {
    'auth/app-deleted':
        'The authentication server has deleted the Firebase project.',
    'auth/app-not-authorized':
        'The Firebase project is not authorized to use Firebase Authentication.',
    'auth/argument-error': 'An invalid argument was provided.',
    'auth/invalid-api-key': 'The provided API key is invalid.',
    'auth/invalid-user-token': "The user's token is invalid.",
    'auth/network-request-failed': 'A network error occurred.',
    'auth/operation-not-allowed':
        'The requested authentication operation is not allowed.',
    'auth/requires-recent-login': 'This operation requires a recent login.',
    'auth/too-many-requests':
        'Too many requests have been made to the authentication server.',
    'auth/unauthorized-domain':
        "The Firebase project's authentication domain is not authorized.",
    'auth/user-token-expired': "The user's token has expired.",
    'auth/web-storage-unsupported':
        'The browser does not support web storage or it is disabled.',
    'auth/email-already-in-use':
        'The email address is already in use by another account.',
    'auth/invalid-email': 'The email address is invalid.',
    'auth/user-disabled': 'The user account has been disabled.',
    'auth/user-not-found': 'The user account does not exist.',
    'auth/wrong-password': 'The password is incorrect.',
    // Add more error codes and their corresponding messages as needed
}
/**
 * parseFirebaseErrFromCodeText takes an string of type of firebase error code and return a string
 * which is more user readable
 */
export const parseFirebaseErrFromCodeToText = (errorCode: unknown): string => {
    if (!(typeof errorCode === 'string')) {
        throw Error(
            `A string required to parse firebae error from code to text but got ${typeof errorCode}`,
        )
    }

    if (errorCode in firebaseErrorCodes) {
        return firebaseErrorCodes[errorCode]
    }
    return 'An unknown error occurred.'
}
