import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('Executing JWTAuthGuard canActivate...');
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    console.log('Executing JWTAuthGuard handleRequest...');
    if (err || !user) {
      console.error('JWTAuthGuard: Authentication failed. Error:', err);
      throw err || new UnauthorizedException();
    }

    console.log('JWTAuthGuard: Authentication successful. User:', user);
    return user;
  }
}
