import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from 'src/student/student.module';
import { TeacherModule } from 'src/teacher/teacher.module';


@Module({
  imports: [TypeOrmModule.forRoot(),StudentModule,TeacherModule]
})
export class AppModule {}
