import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from './schema/category.schema';

@ApiBearerAuth()
@ApiTags('Categorys')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategory(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Post('/create')
  createCategory(@Body('name') name: string): Promise<Category> {
    return this.categoryService.createCategory(name);
  }
}
