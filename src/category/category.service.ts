import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async createCategory(name: string): Promise<Category> {
    try {
      const category = new this.categoryModel({
        name: name.toLowerCase(),
      });

      const res = await category.save();

      return res;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`category '${name}' already exists !!!!`);
      }

      throw new InternalServerErrorException();
    }
  }

  async getAllCategory(): Promise<Category[]> {
    try {
      const categorys = await this.categoryModel.find();

      return categorys;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);

    if (!category) throw new NotFoundException(`Category id ${id} not found`);

    return category;
  }
}
