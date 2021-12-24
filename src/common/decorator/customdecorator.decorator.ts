import {
  applyDecorators,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SimplePrintInterceptor } from 'src/student/interceptor';
import { HttpExceptionFilter } from '../Exception/httpExceptionFilter.exception';
import { RoleGuard } from '../guard/roleguard.guard';

export function customDecorator() {
  return applyDecorators(
    UseInterceptors(SimplePrintInterceptor),
    UseGuards(RoleGuard),
    UseFilters(new HttpExceptionFilter()),
    UseFilters(HttpExceptionFilter)
    );
}
