import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { AuthService } from './auth.service';
import { Payload } from '../types/payload';
import { ERROR_MESSAGES } from 'src/shared/const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(
    payload: Payload,
    done: VerifiedCallback,
  ): Promise<void | VerifiedCallback> {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      return done(
        new HttpException(ERROR_MESSAGES.UNAUTHORIZE, HttpStatus.UNAUTHORIZED),
        false,
      );
    }
    return done(null, user, payload.iat);
  }
}
