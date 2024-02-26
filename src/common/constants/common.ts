export const EXCEPTION = {
  EMAIL_NOT_VERIFIED: 'user email must be verified !!',
  INSECURE_PASSWORD: 'Insecure Password',
  PHONE_NUMBER_NOT_VERIFIED: 'user phone number must be verified !!',
  UPDATE_SAME_PASSWORD: 'You are trying to update the same password!',
  USER_NOT_EXIST: 'user does not exist',
};

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
  STAGING = 'staging',
}
