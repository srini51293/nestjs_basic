import { Injectable, NotFoundException } from '@nestjs/common';
import {students} from "../db"
import { Repository } from 'typeorm';
import { createStudentDto, findStudentResponseDto, studentResponseDto, updateStudentDto } from './dto/student.dto';
import {v4 as uuid} from "uuid";
import { findTeacherResponseDto } from 'src/teacher/dto/teacher.dto';
import { StudentEntity } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class StudentService {
    constructor(@InjectRepository(StudentEntity) private studentRepository:Repository<StudentEntity>){}
    private students=students;
    async getStudents(): Promise<findStudentResponseDto[]>{
        return this.studentRepository.find();
    }

    async getStudentById(studentId:string):Promise<findStudentResponseDto>{
        return await this.studentRepository.findOne({ where:
            { id: studentId }
        });
        // return this.students.find(student=>{
        //     return student.id===studentId;
        // })
    }
    async createStudent(payload: createStudentDto):Promise<studentResponseDto>{
        return this.studentRepository.save(payload);
        // let newStudent={
        //     id:uuid(),
        //     ...payload
        // }
        // this.students.push(newStudent);
        // return newStudent;
    }
    async updateStudent(payload:updateStudentDto,studentId:string){
        // let updateStudent:studentResponseDto;
        // const updateStudentList=this.students.map(student=>{
        //     if(student.id===studentId){
        //         updateStudent={
        //             id:studentId,
        //             ...payload
        //         }
        //         return updateStudent;
        //     }
        //     else
        //         return student;
        // });
        // this.students=updateStudentList;
        // return updateStudent;
        const editedNote = await this.studentRepository.findOne(studentId);
        if (!editedNote) {
          throw new NotFoundException('Note is not found');
        }
        editedNote.teacher = payload.teacher;
        editedNote.name = payload.name;
        await editedNote.save();
        return editedNote;
    }
    async getStudentsByTeacherId(teacherId:string):Promise<findStudentResponseDto[]>{
        // return this.students.filter(student => {
        //     return student.teacher ===teacherId;
        // })
        return await this.studentRepository.find({where:{teacher:teacherId}});
    }
    async updateStudentTeacher(teacherId:string,studentId:string):Promise<studentResponseDto>{
        // let updateStudent:studentResponseDto;
        // const updateStudentList=this.students.map(student=>{
        //     if(student.id===studentId){
        //         updateStudent={
        //             ...student,
        //             teacher:teacherId

        //         }
        //         return updateStudent
        //     }
        //     else
        //         return student;
        // });
        // this.students=updateStudentList;
        // return updateStudent;
        const editedNote = await this.studentRepository.findOne({where:{id:studentId}});
        if (!editedNote) {
          throw new NotFoundException('Student is not found');
        }
        editedNote.teacher = teacherId;
        await editedNote.save();
        return editedNote;
    }
    async delete(studentId:string): Promise<void>{
        await this.studentRepository.delete({id:studentId});
    }
}