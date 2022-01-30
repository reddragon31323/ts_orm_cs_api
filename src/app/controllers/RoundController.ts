import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Round from "../models/Round";
import Objective from "../models/Objective";

class RoundController{
    async list(req: Request, res: Response){
        const repository = getRepository(Round);
        const list = await repository.find({relations: ["roundId", "objectiveId"]})
        return res.json(list);
    }
    async store(req: Request, res: Response){
        const repository = getRepository(Round);
        const repositoryObjective = getRepository(Objective)
        const {roundId, objectiveId} = req.body;
        const roundIdExists = await repository.findOne({where: {"id": roundId}});
        const objectiveIdExists = await repositoryObjective.findOne({where: {"id": objectiveId}});
        if(roundIdExists){
            return res.sendStatus(409);
        }
        if(!objectiveIdExists){
            return res.sendStatus(404);
        }
        const list = await repository.createQueryBuilder('tb_round').leftJoinAndSelect("objectives", "objective", "objective.roundId = tb_round.id").getMany();
        const j = repository.create(req.body);
        await repository.save(list)
        await repository.save(j);
        return res.json(j);
    }
    async delete(req: Request, res: Response){
        const repository = getRepository(Round);
        const{id} = req.body;
        const idExists = await repository.findOne({where: {"id": id}});
        if(idExists){
            await repository.remove(id);
            return res.sendStatus(204);
        }else{
            return res.sendStatus(404);
        }
        
    }
    
}
export default new RoundController();