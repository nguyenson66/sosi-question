import { SetMetadata } from "@nestjs/common"
import { Role } from "src/user/enum/user-role.enum"

export const ROLES_KEY = 'sosi-question'
export const Roles = (... roles : Role[]) => SetMetadata(ROLES_KEY, roles)