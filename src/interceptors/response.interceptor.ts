import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Extract pagination info from query params (or use defaults)
    const page = parseInt(request.query.page, 10) || 1;
    const limit = parseInt(request.query.limit, 10) || 15;

    return next.handle().pipe(
      map((data) => {
        // Handle array data (e.g. product lists)
        if (Array.isArray(data)) {
          const totalItems = data.length;
          const totalPages = Math.ceil(totalItems / limit);
          const start = (page - 1) * limit;
          const end = start + limit;
          const paginatedData = data.slice(start, end);

          return {
            status: 'success',
            message: 'Data Sent Successfully',
            data: paginatedData,
            pagination: {
              total_items: totalItems,
              page,
              limit,
              total_pages: totalPages,
            },
          };
        }

        // Handle single item or other responses
        return {
          status: 'success',
          message: data?.message || 'Data Sent Successfully',
          data: data?.data ?? data,
        };
      }),
    );
  }
}
