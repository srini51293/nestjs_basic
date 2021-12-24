import { v4 } from 'uuid';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class StudentEntity extends BaseEntity{
@PrimaryGeneratedColumn('uuid')
id:string;
@Column()
name:string;
@Column()
teacher:string;
}