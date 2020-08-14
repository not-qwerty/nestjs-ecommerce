import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SellerGuard implements CanActivate {

    constructor() { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user && user.seller) {
            return true;
        }

        throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
}