import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {

  specifications: Specification[]=[];

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {

    const specifications = new Specification();

    Object.assign(specifications,{
      description,
      name
    })

    this.specifications.push(specifications)
    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
   return this.specifications.find((specification) => specification.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allspecifications = this.specifications.filter((specification) =>
    ids.includes(specification.id)
    ); 
    return allspecifications;
  }
}

export { SpecificationRepositoryInMemory };