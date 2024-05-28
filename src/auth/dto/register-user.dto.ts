import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    status: number;
}