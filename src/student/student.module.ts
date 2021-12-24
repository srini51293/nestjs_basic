import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidStudentMiddleware } from 'src/common/middleware/validStudent.midddleware';
import { StudentController } from './student.controller';
import { StudentEntity } from './student.entity';
import { StudentService } from './student.service';

@Module({
    imports:[TypeOrmModule.forFeature([StudentEntity])],
    controllers:[StudentController],
    providers:[StudentService],
   // exports:[StudentService]
})
export class StudentModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidStudentMiddleware).forRoutes({
            path:'students/:studentId',
            method:RequestMethod.GET
        });
        consumer.apply(ValidStudentMiddleware).forRoutes({
            path:'students/:studentId',
            method:RequestMethod.PUT
        });
    }
}
