import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MyListService } from '../my-list/my-list.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private myListService: MyListService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    try {
      const request = context.switchToHttp().getRequest();
  
      const { userid } = request.headers; // For testing purposes, we are passing the userId in the headers. We can use authentication middleware to get the userId from the token.
      if (userid) {
        const user = await this.myListService.getUserDetails(userid);
        request.currentUser = user;
      }
  
      return next.handle();
    } catch (error) {
      throw error;
    }
  }
}
