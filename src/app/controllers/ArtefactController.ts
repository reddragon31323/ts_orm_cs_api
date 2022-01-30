import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Player from "../models/Player";
import Weapon from "../models/Weapon";
import Ammunition from "../models/Ammunition";
import Artefact from "../models/Artefact";

class ArtefactController{
    async store(req: Request, res: Response){
        const {type} = req.body;
        if(type == "Weapon"){
            const repository = getRepository(Weapon);
            const j = repository.create(req.body);

            await repository.save(j);
            return res.json(j)
        }else if(type == "Ammunition"){
            const repository = getRepository(Ammunition);
            const j = repository.create(req.body);

            await repository.save(j);
            return res.json(j);
        }else{
            return res.sendStatus(404);
        }
    }
    async update(req: Request, res: Response){
        const {id, type} = req.body;
        if(id){
            if(type == "Weapon"){
                const repository = getRepository(Weapon);
                const j =repository.create(req.body);

                await repository.save(j);
                return res.json(j);
            }else if(type == "Ammunition"){
                const repository = getRepository(Ammunition);
                const j = repository.create(req.body);

                await repository.save(j);
                return res.json(j);
            }else{
                return res.sendStatus(404);
            }
        }else{
            return res.sendStatus(404);
        }
    }
    async list(req: Request, res: Response){
        const repository = getRepository(Artefact);
        const list = await repository.createQueryBuilder('tb_artefact').getMany();
        return res.json(list);
    }
}
export default new ArtefactController();