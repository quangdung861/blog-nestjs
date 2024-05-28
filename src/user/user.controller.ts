import { BadRequestException, Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { Roles } from 'src/auth/decorator/roles.decorator';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Roles('Admin')
    @ApiQuery({ name: 'page' })
    @ApiQuery({ name: 'items_per_page' })
    @ApiQuery({ name: 'search', required: false })
    @Get()
    findAll(@Query() query: FilterUserDto): Promise<User[]> {
        return this.userService.findAll(query);
    }

    @Get('profile')
    profile(@Req() req: any): Promise<User> {
        return this.userService.findOne(Number(req.user_data.id))
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(Number(id));
    }

    @Post()
    @Roles('Admin')

    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    @Roles('Admin')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(Number(id), updateUserDto);
    }

    @Delete('multiple')
    @Roles('Admin')
    multipleDelete(@Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]) {
        return this.userService.multipleDelete(ids)
    }

    @Delete(':id')
    @Roles('Admin')
    delete(@Param('id') id: string) {
        return this.userService.delete(Number(id));
    }

    @Post('upload-avatar')
    @Roles('Admin')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: storageConfig('avatar'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.png', '.jpeg'];
            if (!allowedExtArr.includes(ext)) {
                req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`
                cb(null, false)
            } else {
                const fileSize = parseInt(req.headers['content-length']);
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'File size is too large. Accepted file size is less than 5 MB';
                    cb(null, false);
                } else {
                    cb(null, true);
                }
            }
        }
    }))
    uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('File is required');
        }
        this.userService.updateAvatar(req.user_data.id, file.fieldname + '/' + file.filename)
    }
}
