import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @PrimaryGeneratedColumn()
    email: string;

    @ApiProperty()
    @Column()
    password: string;
}

