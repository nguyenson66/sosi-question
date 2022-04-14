import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/user/enum/user-role.enum";
import { ROLES_KEY } from "./role.decotory";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private reflector : Reflector
    ){}

    canActivate(context: ExecutionContext): boolean{
        
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        
        if(!roles)
            return true;
        
        const rolesUser = context.switchToHttp().getRequest().user.roles;
        // const rolesUser = [Role.Employee, Role.Admin];

        return roles.every(ele => rolesUser.includes(ele));
    }

}