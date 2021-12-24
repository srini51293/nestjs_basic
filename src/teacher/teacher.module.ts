import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/student/student.entity';
import { StudentModule } from 'src/student/student.module';
import { StudentService } from 'src/student/student.service';
import { StudentTeacherController } from './student.controller';
import { TeacherController } from './teacher.controller';
import { TeacherEntity } from './teacher.entity';
import { TeacherService } from './teacher.service';

@Module({
    imports:[TypeOrmModule.forFeature([StudentEntity]),TypeOrmModule.forFeature([TeacherEntity])],
    //imports: [StudentModule],
    controllers:[TeacherController,StudentTeacherController],
    providers:[TeacherService,StudentService]
})
export class TeacherModule {}
