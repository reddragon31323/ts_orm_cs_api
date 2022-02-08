import { app, setup } from "../../index";
import { afterAll, describe, expect, test, beforeAll } from "@jest/globals";
import supertest from "supertest";
import { getConnection } from "typeorm";

describe("project persistence test", () => {
  beforeAll(async () => {
    await setup()
  });
  afterAll(async () => {
    await getConnection().close()
  });
  it("/round e /objective", async () => {
    const agent = supertest(app);

    //passo 1: selecionar tds os registros da tabela round, e se for encontrado aparece o número de registros e se não há nenhum fica fica como default 0
    const listRounds = await agent.post("/round/list");
    expect(listRounds.statusCode).toEqual(200);
    console.log(`Found ${listRounds.body.length ?? 0} registered rounds`);

    //passo 1: selecionar tds os registros da tabela objetivo, e se for encontrado aparece o número de registros e se não há nenhum fica fica como default 0
    const listObjectives = await agent.post("/objective/list");
    expect(listObjectives.statusCode).toEqual(200);
    console.log(
      `Found ${listObjectives.body.length ?? 0} registered objectives`
    );

    //passo 2: se encontrar algum objetivo, lista no console o objeto ou objetos
    if (listObjectives.body.length > 0) {
      for (const objective of listObjectives.body) {
        console.log(objective);
      }
    }
    //passo 2: se encontrar algum round, list no console o objeto ou objetos
    if (listRounds.body.length > 0) {
      for (const round of listRounds.body) {
        console.log(round)
      }
    }



    //passo 3: após a impressão remove os dados da tabela objetivo e dps da tabela round
    if (listRounds.body.length > 0) {
      if (listObjectives.body.length > 0) {
        for (const objective of listObjectives.body) {
          const id = objective.id;
          const deleteObjective = await agent.post(`/objective/delete`).send({ id })
          expect(deleteObjective.statusCode).toEqual(204);
        }
        console.log(`all objectives were excluded`);
      }
      for (const round of listRounds.body) {
        const id = round.id;
        const deleteRound = await agent.post(`/round/delete`).send({ id })
        expect(deleteRound.statusCode).toEqual(204);
      }
      console.log(`all rounds were excluded`);
    }
    //passo 4: caso não encontre no passo 2, inserir novos registros de objetivo e de round
    if (!listObjectives.body.length) {
      console.log("Could not find any registered objectives, registering new objective...");
      const postCreateObjective = await agent.post('/objective/store').send({ "id": 1, "description": "Bomb", "points": "3" });
      expect(postCreateObjective.statusCode).toEqual(200);
      const postListObjective = await agent.post('/objective/list');
      expect(postListObjective.statusCode).toEqual(200)
      if (!listRounds.body.length) {
        console.log("Could not find any registered rounds, registering new round...");
        const data = { "id": 1, "number": 1, "begin": "2022-01-27", "end": "2022-01-27", "match_id": 1, "mode": "TERRORIST", "objectives": postListObjective.body };
        const postCreateRound = await agent.post('/round/store').send(data);
        expect(postCreateRound.statusCode).toEqual(200);
      }
    }

  });
});