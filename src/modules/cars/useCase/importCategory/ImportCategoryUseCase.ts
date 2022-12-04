import { parse as csvParse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private categoriesRepository: ICategoriesRepository) { }

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

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}
export { ImportCategoryUseCase };
