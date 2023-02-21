import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectEntityManager } from '@nestjs/typeorm/dist/common';
import { EntityManager, Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectEntityManager() private readonly entityManager: EntityManager) { }
    
    async getUsers() {
        const data = await this.entityManager.query(`Select * from users`)
        return { message: 'success', data: data };
    }

    async createUser(body) {

        const userList = await this.entityManager.query(`Select * from users where email = "${body.email}"`);
        
        if(userList.length) {
            return { message: 'user already exists' };
        }

        const data = await this.entityManager.query(`insert into users (name, email, password) values("${body.name}", "${body.email}", "${body.password}")`)
        return { message: 'user created', data: data }
    }

    async updateUser(userId, body) {

        const userList = await this.entityManager.query(`Select * from users where id = ${userId}`);
        
        if(!userList.length) {
            return { message: 'invalid userID' };
        }

        let query = "update users set ";
        let list = [];
        for(let key in body) {
            list.push(`${key} = "${body[key]}"`)
        }
        query += list.join(", ");
        query += ` where id = ${userId}`
        const data = await this.entityManager.query(query);
        return { message: 'user updated', data: data }
    }

    async deleteUser(userId) {
        const userList = await this.entityManager.query(`Select * from users where id = ${userId}`);
        
        if(!userList.length) {
            return { message: 'invalid userID' };
        }
        const data = await this.entityManager.query(`delete from users where id = ${userId}`);

        return { message: 'user deleted', data: data };
    }


}
