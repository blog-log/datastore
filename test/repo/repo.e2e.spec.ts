import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { SearchRepoDto } from 'src/repo/dto/search-repo.dto';

describe('RepoController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/search (POST)', () => {
    const body: SearchRepoDto = {
      repos: ['fake'],
    };

    return request(app.getHttpServer())
      .post('/repo/search')
      .send(body)
      .set('Accept', 'application/json')
      .expect(200);
  });
});
