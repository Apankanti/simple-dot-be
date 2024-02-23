import { CreateUser } from 'src/common/interfaces/create-user.interface';
import { CreateUserParams } from '../../../../models/user';

export const mapCreateUserParams = ({
  email,
  ...user
}: CreateUser): CreateUserParams => ({
  ...user,
  email: email,
});
