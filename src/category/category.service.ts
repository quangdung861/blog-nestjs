import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';
import { Post } from 'src/post/entities/post.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(Post) private postRepository: Repository<Post>
    ) { }

    async findAll(): Promise<any> {
        const [res, total] = await this.categoryRepository.findAndCount({
            order: {
                created_at: 'DESC',
            },
        })

        return {
            data: res,
            total,
        }
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        try {
            const res = await this.categoryRepository.save({
                ...createCategoryDto
            })

            return await this.categoryRepository.findOneBy({ id: res.id });
        } catch (error) {
            throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, updateCatagoryDto: any): Promise<UpdateResult> {
        return await this.categoryRepository.update(id, updateCatagoryDto)
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.categoryRepository.delete(id)
    }
}
