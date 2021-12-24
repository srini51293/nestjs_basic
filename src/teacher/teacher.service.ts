import { Injectable } from '@nestjs/common';
import { findTeacherResponseDto } from './dto/teacher.dto';
import {teachers} from "../db"
import { TeacherEntity } from './teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class TeacherService {
    constructor(@InjectRepository(TeacherEntity) private teacherRepository:Repository<TeacherEntity>){}
    private teachers=teachers
    async getTeachers():Promise<findTeacherResponseDto[]>{
        return this.teacherRepository.find();
    }
    async getTeacherById(teacherId:string):Promise<findTeacherResponseDto>{
        // return this.teachers.find(teacher=>{
        //     return teacher.id===teacherId
        // })
        return this.teacherRepository.findOne({where:{id:teacherId}});
    }
}
