import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Round from "../models/Round";

class RoundController {
    async list(req: Request, res: Response) {
        const repository = getRepository(Round);
        const list = await repository.createQueryBuilder('tb_round').leftJoinAndSelect("tb_round.objectives", "objective").getMany();
        return res.json(list);
    }
    async store(req: Request, res: Response) {
        const repository = getRepository(Round);
        const { id, objectives } = req.body;
        const roundIdExists = await repository.findOne({ where: { "id": id } });
        if (roundIdExists) {
            return res.sendStatus(409);
        }
        if (!objectives) {
            return res.sendStatus(404);
        }
        const j = repository.create(req.body);
        await repository.save(j);
        return res.json(j);
    }
    async delete(req: Request, res: Response) {

        const repository = getRepository(Round);
        const { id } = req.body;
        const idExists = await repository.findOne({ where: { "id": id } });
        if (idExists) {
            console.log(idExists)
            await repository.remove(idExists);
            return res.sendStatus(204);
        } 
        else {
            return res.sendStatus(404);
        }


    }

}
export default new RoundController();