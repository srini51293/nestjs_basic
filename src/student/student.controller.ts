import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  Delete,
  UseInterceptors,
  UseFilters,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { customDecorator } from 'src/common/decorator/customdecorator.decorator';
import { HttpExceptionFilter } from 'src/common/Exception/httpExceptionFilter.exception';
import { RoleGuard } from 'src/common/guard/roleguard.guard';
import {
  createStudentDto,
  findStudentResponseDto,
  studentResponseDto,
  updateStudentDto,
} from './dto/student.dto';
import { SimplePrintInterceptor } from './interceptor';
import { StudentService } from './student.service';
//@UseInterceptors(ExcludeNullInterceptor)
// @UseGuards(RoleGuard)
@Controller('students')
// @UseFilters(new HttpExceptionFilter())
@customDecorator()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getStudent() : Promise<findStudentResponseDto[]> {
    
    /*expection filter example 
    if (true) {
      throw new ForbiddenException();
    }*/
    return this.studentService.getStudents();
  }
  @Get('/:studentId')
  getStudentId(
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
  ): Promise<findStudentResponseDto> {
    return this.studentService.getStudentById(studentId);
  }
  @Post()
  createStudent(@Body() body: createStudentDto): Promise<studentResponseDto> {
    return this.studentService.createStudent(body);
  }
  @Put('/:studentId')
  updateStudentId(
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
    @Body() body: updateStudentDto,
  ): Promise<studentResponseDto> {
    return this.studentService.updateStudent(body, studentId);
  }

  @Delete('/:studentId')
  deleteStudent(@Param('studentId', new ParseUUIDPipe()) studentId: string) {
    this.studentService.delete(studentId);
  }
}
