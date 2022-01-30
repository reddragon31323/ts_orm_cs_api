import {app, setup} from "../../index";
import { afterAll, describe, expect, test, beforeAll } from "@jest/globals";
import supertest from "supertest";
import { getConnection } from "typeorm";

describe("persistence test", () =>{
    beforeAll(async () => {
        await setup()
    });
    afterAll(async () =>{
        await getConnection().close()
    });
    
    it('test /address/list e /address/delete', async () =>{
        var agent = supertest(app);
        const postList = await agent.post('/address/list');
        expect(postList.statusCode).toEqual(200);
        console.log('Found ${postList.body.length} registered addresses')
        if(postList.body.length > 0){
            for(const e of postList.body){
                const data = { "id": 1};
                const postDelete = await agent.post('/address/delete').send(data);
                expect(postDelete.statusCode).toEqual(204);
            }
        }else{
            console.log("Did not find registered addresses, registering new...")
            const data = {"id": "1", "cep": "99010250", "complement": "402"};
            const postCreate = await agent.post('/address/store').send(data);
            expect(postCreate.statusCode).toEqual(200);
        }
    });
    it('test /player/list e /player/delete', async () => {
        var agent = supertest(app);
        const ret = await agent.post('/player/list');
        expect(ret.statusCode).toEqual(200);
        if(ret.body.length > 0){
            console.log('Found ${ret.body.length} registered Players');
            for(const p of ret.body){
                const data = {"nickname": p.nickname};
                console.log('Removing the player ${data.nickname}');
                const postDeletePlayer = await agent.post('/player/delete').send(data);
                expect(postDeletePlayer.statusCode).toEqual(204);
                console.log('Removing the address ${p.address.id}');
                const postDeleteAddress = await agent.post('/address/delete').send({"id": p.address.id});
                expect(postDeleteAddress.statusCode).toEqual(204);
            }
        }else{
            console.log("Could not find any registered players, registering new player and address.");
            const postCreateAddress = await agent.post('/address/store').send({"id": 2,"cep": "99010010"});
            expect(postCreateAddress.statusCode).toEqual(200);
            const postFindAddress = await agent.post('/address/find').send({"cep": "99010010"});
            expect(postFindAddress.statusCode).toEqual(200);
            const data = {
                "nickname": "t@gl.com",
                "password": "11111",
                "points": 10,
                "address": postFindAddress.body
            };
            const postCreatePlayer = await agent.post('/player/store').send(data);
            expect(postCreatePlayer.statusCode).toEqual(200)
        }
    });
});