import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class TeacherEntity extends BaseEntity{
@PrimaryGeneratedColumn("uuid")
id:string;
@Column()
name:string;
}