import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class CurrentUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const {userToken} = request.session || {};
    
    if (userToken) {
      // Attach user to request object for further use
      request.userToken = userToken;
    }
    console.log('CurrentUserInterceptor executed. UserToken:', userToken);
    return next.handle()
  }
}