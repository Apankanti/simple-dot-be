import { RouterModule, Routes } from '@nestjs/core';
import { LoginModule } from './login';
import { UserModule } from './user/user.module';
import {
  API_PREFIX,
  ROUTES,
  VERSION_1,
} from 'src/common/constants/routes.constants';
import { ProductModule } from './products/products.module';
import { RegistrationModule } from './registration';

export const routes: Routes = [
  {
    path: `${API_PREFIX}/${VERSION_1}`,
    children: [
      {
        path: ROUTES.PUBLIC,
        module: LoginModule,
      },
      {
        path: ROUTES.USER,
        module: UserModule,
      },
      {
        path: ROUTES.PUBLIC,
        module: ProductModule,
      },
      {
        path: ROUTES.PUBLIC,
        module: RegistrationModule,
      },
    ],
  },
  {
    path: API_PREFIX,
  },
];

export const APIModule = [
  RouterModule.register(routes),
  LoginModule,
  UserModule,
  RegistrationModule,
];
