import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ERROR_MESSAGES } from 'src/shared/const';

@Injectable()
export class SellerGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.seller) {
      return true;
    }

    throw new HttpException(
      ERROR_MESSAGES.UNAUTHORIZE,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
