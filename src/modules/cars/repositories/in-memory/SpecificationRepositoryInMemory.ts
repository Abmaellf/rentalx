import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

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
   const specification = this.specifications.find((specification) => specification.name === name);
      if(!specification){
        throw new AppError("category already not exists");
      }	
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allspecifications = this.specifications.filter((specification) =>
    ids.includes(specification.name)  //alteração: [antes] specification.id || [Depois] specification.name
    ); 

    if(!allspecifications){
      throw new AppError("allspecifications already not exists");
    }	
    return allspecifications;
  }
}

export { SpecificationRepositoryInMemory };