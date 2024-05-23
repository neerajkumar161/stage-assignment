import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

/**
 * This is a simple test, although we could write more tests, but due to time limitation, not able to write more tests.
 * Note: Run npm run add:users, add:movies, add:tvshows before running the test. 
 * stage-bharat-assignment/src/scripts/add-users.ts
 */
describe('MyListController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await app.close();
  });

  it('/ Expect Status 201 when adding the item in the list', async () => {
    const response = await request(app.getHttpServer())
      .post('/my-list/add/list')
      .set('userId', '664f4cfd69ec4de4005ab432')
      .set('Content-Type', 'application/json')
      .send({
        contentId: '664f4db44ed13f80fdb1babf',
        contentType: 'TVShow',
      });
    expect(response.status).toBe(201);
  });

  it('/ Expect Status 201 when removing the item in the list', async () => {
    const response = await request(app.getHttpServer())
      .post('/my-list/remove/list')
      .set('userId', '664f4cfd69ec4de4005ab432')
      .set('Content-Type', 'application/json')
      .send({
        contentId: '664f4db44ed13f80fdb1babf',
      });
    expect(response.status).toBe(201);
  });

  it('/ Expect Status 200 when fetching the list items of the user', async () => {
    const contentId = '664f4db44ed13f80fdb1babf';
    const contentType = 'TVShow';
    await request(app.getHttpServer())
      .post('/my-list/add/list')
      .set('userId', '664f4cfd69ec4de4005ab432')
      .set('Content-Type', 'application/json')
      .send({
        contentId: '664f4db44ed13f80fdb1babf',
        contentType: 'TVShow',
      });

    const response = await request(app.getHttpServer())
      .get('/my-list/user/list?page=1&limit=10')
      .set('userId', '664f4cfd69ec4de4005ab432');

    expect(response.statusCode).toBe(200);
    expect(response.body[0].contentId).toEqual(contentId);
    expect(response.body[0].contentType).toEqual(contentType);
    expect(response.body).toHaveLength(1);
  });

  it('/ Expect Status 400 when fetching the list items of the user when pass wrong user id', async () => {
    const contentId = '664f4db44ed13f80fdb1babf';
    const contentType = 'TVShow';
    await request(app.getHttpServer())
      .post('/my-list/add/list')
      .set('userId', '664f4cfd69ec4de4005ab432')
      .set('Content-Type', 'application/json')
      .send({
        contentId: '664f4db44ed13f80fdb1babf',
        contentType: 'TVShow',
      });


    const response = await request(app.getHttpServer())
      .get('/my-list/user/list?page=1&limit=10')
      .set('userId', '664f4cfd69ec4de4005ab431');

    expect(response.statusCode).toBe(400);
  });
});
