
const supertest = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const querystring = require("querystring");
const {app} = require("./app");
const models = require("./db/models");
const userSamples = require("./testing/user-samples");

const request = supertest(app); 
const server = app.listen(3001);

let mongoServer;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    const opts = {useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useCreateIndex: true}
    
        await mongoose.connect(mongoUri,opts , (err) => {
        if (err) console.error(err);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    server.close();
  });


describe("Tesiting ID Endpoints", () =>{
    it("Testing UUID generation",  async () => {
        const response = await request.get('/id');
        expect(response.body.uuid.length).toBe(36);
    });    
});

describe('Testing User Endpoints', () => {
    it('add a single user', async () => {
        data = querystring.stringify(userSamples.singleUser);
        const response =  await request.post("/user")
            .send(data);
        expect(response.statusCode).toBe(201);

    });

    it('attempt to add duplicate id', async () => {
        data = querystring.stringify(userSamples.singleUser);
        await request.post("/user").send(data);
        const response = await request.post("/user").send(data);
        expect(response.statusCode).toBe(400);
    });
  });