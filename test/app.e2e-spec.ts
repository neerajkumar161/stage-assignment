import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CallHandler,
  ExecutionContext,
  INestApplication,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as request from 'supertest';
import { User } from '../src/my-list/schemas/user.schema';
import { AppModule } from './../src/app.module';

describe('MyListController (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(ConfigService)
    .useValue({
      get: jest.fn().mockImplementation((key: string) => {
        if (key === 'MONGO_URI') {
          return mongoUri;
        }
        // Mock other configuration values here...
      }),
    })
      // .overrideModule(MongooseModule)
      // .use
      .overrideProvider(CACHE_MANAGER)
      .useValue({
        // Mock Redis methods here...
        get: jest.fn().mockImplementation(() => Promise.resolve(null)),
        set: jest.fn().mockImplementation(() => Promise.resolve()),
      })
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalInterceptors({
      intercept: async (context: ExecutionContext, next: CallHandler) => {
        const request = context.switchToHttp().getRequest();
        request.currentUser = new User({
          _id: '664f4cfd69ec4de4005ab432',
          username: 'user1',
        });

        return next.handle();
      },
    });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongoServer.stop();
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
      .set('Content-Type', 'application/json')
      .send({
        contentId: '664f4db44ed13f80fdb1babf',
        contentType: 'TVShow',
      });

    const response = await request(app.getHttpServer()).get(
      '/my-list/user/list?page=1&limit=10',
    );

    expect(response.statusCode).toBe(200);
    expect(response.body[0].contentId).toEqual(contentId);
    expect(response.body[0].contentType).toEqual(contentType);
    expect(response.body).toHaveLength(1);
  });
});

describe('MyListController (e2e) Error user case', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(ConfigService)
    .useValue({
      get: jest.fn().mockImplementation((key: string) => {
        if (key === 'MONGO_URI') {
          return mongoUri;
        }
      }),
    })
    .overrideProvider(CACHE_MANAGER)
      .useValue({
        get: jest.fn().mockImplementation(() => Promise.resolve(null)),
        set: jest.fn().mockImplementation(() => Promise.resolve()),
      })
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalInterceptors({
      intercept: async (context: ExecutionContext, next: CallHandler) => {
        const request = context.switchToHttp().getRequest();
        request.currentUser = { _id: null };

        return next.handle();
      },
    });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongoServer.stop();
  });

  it('/ Expect Status 400 when adding the item in the list', async () => {
    const response = await request(app.getHttpServer())
      .post('/my-list/add/list')
      .set('userId', '664f4cfd69ec4de4005ab432')
      .set('Content-Type', 'application/json')
      .send({
        contentId: '664f4db44ed13f80fdb1babf',
        contentType: 'TVShow',
      });
    expect(response.status).toBe(400);
  });

  it('/ Expect Status 400 when removing the item in the list', async () => {
    const response = await request(app.getHttpServer())
      .post('/my-list/remove/list')
      .set('userId', '664f4cfd69ec4de4005ab432')
      .set('Content-Type', 'application/json')
      .send({
        contentId: '664f4db44ed13f80fdb1babf',
      });
    expect(response.status).toBe(400);
  });

  it('/ Expect Status 400 when fetching the list items of the user', async () => {
    const response = await request(app.getHttpServer()).get(
      '/my-list/user/list?page=1&limit=10',
    );

    expect(response.statusCode).toBe(400);
  });
});
