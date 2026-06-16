export const getErrorText = (statusCode: string) => {
  switch (statusCode) {
    case 'auth/invalid-email':
      return 'Invalid email address. Please enter valid email address';
    case 'auth/invalid-credential':
      return 'Invalid credentials. Please check your email or password';
    default:
      return statusCode;
  }
};
