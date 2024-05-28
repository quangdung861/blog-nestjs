import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.create(createCategoryDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdateCategoryDto) {
        return this.categoryService.update(Number(id), updatePostDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.categoryService.delete(Number(id))
    }
}