import { Repository } from "typeorm";

import dataSource from "../../../../database/dataSource";
import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;
    // eslint-disable-next-line no-use-before-define

    constructor() {
        this.repository = dataSource.getRepository(Category);
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOneBy({ name });

        return category;
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }
}
export { CategoriesRepository };
