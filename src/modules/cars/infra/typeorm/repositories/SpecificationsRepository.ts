/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";

import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { dataSource } from "@shared/infra/typeorm/dataSource";

import { Specification } from "../entities/Specification";



class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;
    constructor() {
        this.repository = dataSource.getRepository(Specification);
    }
   

    async create({
        name, 
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {

        const specification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);
        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOneBy({
            name
        });
        return specification;
    }

   async findByIds(ids: string[]): Promise<Specification[]> {
       const specifications = await this.repository.findByIds(ids)
       return specifications;
    }
}
export { SpecificationsRepository };
