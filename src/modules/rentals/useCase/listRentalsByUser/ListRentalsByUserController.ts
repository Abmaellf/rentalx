import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListRentalsByUserUseCase } from "./LIstRentalsByUserUseCase"


class ListRentalsByUserController {
  async handle(request: Request, response: Response):Promise<Response>{

    const { id } = request.user;
    
    const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase)

    const reltals = await listRentalsByUserUseCase.execute(id);
    return response.json(reltals);
  }
}
export {ListRentalsByUserController}