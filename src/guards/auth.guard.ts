import { CanActivate, Injectable } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: any): boolean {
    const request = context.switchToHttp().getRequest();
    // console.log('AuthGuard - User Token:', request.session.userToken);
    return request.session.userToken;
  }
}