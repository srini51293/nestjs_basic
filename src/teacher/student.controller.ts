import { Controller,Get,Param,ParseUUIDPipe,Post,Put } from "@nestjs/common";
import { findStudentResponseDto, studentResponseDto } from "src/student/dto/student.dto";
import { StudentService } from "src/student/student.service";
import { findTeacherResponseDto } from "./dto/teacher.dto";
@Controller("teachers/:teacherId/students")
export class StudentTeacherController{
    constructor(private readonly studentService:StudentService){}

    @Get()
    getStudentForThisTeacher(
        @Param("teacherId",new ParseUUIDPipe()) teacherId:string
    ):Promise<findStudentResponseDto []>{
        return this.studentService.getStudentsByTeacherId(teacherId);
    }
    @Put("/:studentId")
    getStudentsIdOfTeacher(
        @Param("teacherId",new ParseUUIDPipe()) teacherId:string,
        @Param("studentId",new ParseUUIDPipe()) studentId:string
    ):Promise<studentResponseDto>{
        return this.studentService.updateStudentTeacher(teacherId,studentId);
    }
}