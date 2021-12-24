import {HttpException, Injectable,NestMiddleware} from "@nestjs/common"
import {Request,Response,NextFunction} from "express"
import {students} from "../../db"
import { Repository } from 'typeorm';
import { StudentEntity } from "src/student/student.entity";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class ValidStudentMiddleware implements NestMiddleware{
    constructor(@InjectRepository(StudentEntity) private studentRepository:Repository<StudentEntity>){}
    use(req:Request,res:Response,next:NextFunction){
        const studentId=req.params.studentId;
        const studentExists=this.studentRepository.findOne({ where:
            { id: studentId }
        })
        if(!studentExists){
            throw new HttpException("Student not exists",404);
        }
        next();
    }
}