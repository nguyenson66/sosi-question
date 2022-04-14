import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/share/auth/role.decotory';
import { RolesGuard } from 'src/share/auth/role.guard';
import { Role } from 'src/user/enum/user-role.enum';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.Admin)
export class AdminController {
    constructor(
        private adminService : AdminService
    ){}

    @Get()
    Home(){
        
    }

    @Get('/question')
    questionManagement(){

    }

    @Delete('/question/:id')
    deleteQuestion(){

    }
}
