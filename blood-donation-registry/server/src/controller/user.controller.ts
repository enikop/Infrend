import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Controller } from './base.controller';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController extends Controller {
    repository = AppDataSource.getRepository(User);

    //Special create method with password encryption
    create = async (req: Request, res: Response) => {
        try {
            const entity = this.repository.create(req.body as object);
            entity.id = null;

            entity.password = await bcrypt.hash(entity.password, 12);

            const result = await this.repository.save(entity);
            delete result.password;

            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    //Login method (by email and password), returns JWT token in case of success,
    //401 Unauthorized if email or password are invalid
    login = async (req: Request, res: Response) => {
      try {
          const user = await this.repository.findOne({
              where: { email: req.body.email },
              select: [ 'id', 'password' ]
          });

          if (!user) {
              return this.handleError(res, null, 401, 'Incorrect email or password.');
          }

          const passwordMatches = await bcrypt.compare(req.body.password, user.password);
          if (!passwordMatches) {
              return this.handleError(res, null, 401, 'Incorrect email or password.');
          }

          const token = jwt.sign({ id: user.id }, 'mySecretKey', { expiresIn: '2w' });
          res.json({ accessToken: token });
      } catch (err) {
          this.handleError(res, err);
      }
  };
}
