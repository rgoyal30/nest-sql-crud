import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserEntity } from './user.entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Post('/create')
    createUser(@Body() body: UserEntity) {
        return this.usersService.createUser(body);
    }

    @Patch('/update/:id')
    updateUser(@Param("id") userId: number, @Body() body: UserEntity) {
        return this.usersService.updateUser(userId, body)
    }

    @Delete('/delete/:id')
    deleteUser(@Param("id") userId: number) {
        return this.usersService.deleteUser(userId);
    }

}
