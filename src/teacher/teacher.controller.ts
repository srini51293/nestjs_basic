import { Controller,Get,Param,ParseUUIDPipe,Post,Put } from "@nestjs/common";
import { findTeacherResponseDto } from "./dto/teacher.dto";
import { TeacherService } from "./teacher.service";
@Controller("teachers")
export class TeacherController{
    constructor(private readonly teacherService:TeacherService){}

    @Get()
    getTeacher():Promise<findTeacherResponseDto[]>
    {
        return this.teacherService.getTeachers();
    }
    @Get("/:teacherId")
    getTeacherId(
        @Param ("teacherId",new ParseUUIDPipe()) teacherId:string
    ):Promise<findTeacherResponseDto>{
        return this.teacherService.getTeacherById(teacherId);
    }
    
}