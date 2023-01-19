import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}
@injectable()
class ImportCategoryUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(
        @inject(CategoriesRepository)
        private categoriesRepository: ICategoriesRepository
    ) {}

    loadCateories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolver, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolver(categories);
                })
                .on("Error", () => {
                    reject(console.error());
                });
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCateories(file);
        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = await this.categoriesRepository.findByName(
                name
            );

            if (!existCategory) {
                await this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}
export { ImportCategoryUseCase };
