import {app, setup} from "../../index";
import {afterAll, describe, expect, test, beforeAll} from "@jest/globals";
import supertest from "supertest";
import {getConnection} from "typeorm";

describe("project persistence test", () =>{
    beforeAll(async () => {
        await setup()
    });
    afterAll(async () =>{
        await getConnection().close()
    });

    it('test /objective/list e /objective/delete', async () =>{
        var agent = supertest(app);
        const postList = await agent.post('/objective/list');
        expect(postList.statusCode).toEqual(200);
        console.log('Found ${postList.body.length} registered objectives..')
        if(postList.body.length > 0){
            for(const o of postList.body){
                console.log(o)
                const data = {"id": o.id};
                const postDeleteObjective = await agent.post('/objective/delete').send(data);
                expect(postDeleteObjective.statusCode).toEqual(204);
            }
        }else{
            console.log('Did not find any registered objectives, registering new objective...')
            const data = { "description": "Bomb", "points": "3"};
            const postCreateObjective = await agent.post('/objective/store').send(data);
            expect(postCreateObjective.statusCode).toEqual(200);
        }
    });
    it('test /round/list e /round/delete', async () =>{
        var agent = supertest(app);
        /*const h = await agent.post('/objective/list');
            expect(h.statusCode).toEqual(200)
            if(h.body.length > 0){
                console.log('Found ${h.body.length} registered Objectives');
                for(const g of h.body){
                    console.log(g)
                    const data = {"id": g.id};
                    console.log('Removing the objective ${data.id}');
                    const postDeleteObjective = await agent.post('/objective/delete').send(data);
                    expect(postDeleteObjective.statusCode).toEqual(204);
                }
            }*/
        const ret = await agent.post('/round/list');
        expect(ret.statusCode).toEqual(200);
        if(ret.body.length > 0){
            console.log('Found $(ret.body.length} registered Rounds');
            for(const r of ret.body){
                console.log(r)
                const data = {"id": r.id};
                console.log('Removing the round ${data.id}');
                const postDeleteRound = await agent.post('/round/delete').send(data);
                expect(postDeleteRound.statusCode).toEqual(204);
                console.log('Removing the round ${r.objective.id}');
                const postDeleteObjective = await agent.post('/objective/delete').send({"id": r.objective.id})
                expect(postDeleteObjective.statusCode).toEqual(204)
            }
        }else{
            console.log("Could not find any registered rounds, registering new round and new objective...");
            const postCreateObjective = await agent.post('/objective/store').send({"id": 1,"description": "Bomb", "points": "3"});
            expect(postCreateObjective.statusCode).toEqual(200);
            const postFindObjective = await agent.post('/objective/find').send({"description": "Bomb"})
            expect(postFindObjective.statusCode).toEqual(200)
            //const postListObjectives = await agent.post('/objective/list')
           // const y = await agent.post('/round/list');
           // expect(y.statusCode).toEqual(200)
            
            const data = {"id": 1, "number": 1, "begin": "2022-01-27", "end": "2022-01-27", "match_id": 1, "mode": "TERRORIST", "objectives": postFindObjective.body};
            const postCreateRound = await agent.post('/round/store').send(data);
            expect(postCreateRound.statusCode).toEqual(200);
           /* for(const i of y.body){
               const data = {"objectives": postListObjectives.body(i)};
               console.log(data);
            }*/
        }
    });
});