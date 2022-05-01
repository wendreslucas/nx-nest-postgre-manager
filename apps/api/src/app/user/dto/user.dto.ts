import { ApiProperty } from "@nestjs/swagger";
import { IUser } from "@nx-nest-postgre-manager/api-interfaces";
import { IsNotEmpty } from "class-validator";

export class UserDto implements IUser {
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;
}
