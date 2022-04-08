import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schema/category.schema';

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
