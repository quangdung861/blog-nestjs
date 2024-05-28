import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './decorator/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('register')
    @Public()
    @ApiResponse({ status: 201, description: 'Login successfully' })
    @ApiResponse({ status: 401, description: 'Login fail' })
    register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
        return this.authService.register(registerUserDto)
    }
    @Post('login')
    @Public()
    @ApiResponse({ status: 201, description: 'Login successfully' })
    @ApiResponse({ status: 401, description: 'Login fail' })
    @UsePipes(ValidationPipe)
    login(@Body() loginUserDto: LoginUserDto): Promise<any> {
        return this.authService.login(loginUserDto)
    }

    @Post('refresh-token')
    @Public()
    refreshToken(@Body() { refresh_token }): Promise<any> {
        return this.authService.refreshToken(refresh_token)
    }
}
