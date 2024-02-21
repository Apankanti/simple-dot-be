import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/User/user.model';
import { UserRepository } from './user.repository';

const repositories = [UserRepository];

@Global()
@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
