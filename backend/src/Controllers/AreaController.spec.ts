

import request from "supertest"
import { app } from "../app";
import { IArea } from '../interfaces/IArea'

describe("Test Rotas Areas", () => {
    it('create area', async () => {
        const payload: IArea = {
            id: 1,
            name: 'teste',
            description: 'teste',
        };
        const response = await app.inject({
            method: 'post',
            url: "/v1/areas",
            payload,
            validate: false
        });
        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(response.payload)).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            description: expect.any(String),

        }))
    })
})