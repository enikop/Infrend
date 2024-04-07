import { Between } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Donation } from '../entity/Donation';
import { Controller } from './base.controller';
import { Request, Response } from 'express';

export class DonationController extends Controller {
    repository = AppDataSource.getRepository(Donation);

    //Special filter method for date interval given in request body as startDate and endDate
    getAllFiltered = async (req: Request, res: Response) => {
        try {
            const filterParams = req.query;
            //If startDate and endDate are specified
            if ('startDate' in filterParams && 'endDate' in filterParams) {
                const startDate = filterParams.startDate as string;
                const endDate = filterParams.endDate as string;

                //Construct the new where condition, first add the interval
                var whereCondition = {
                    date: Between(startDate, endDate)
                };
                //Add the remaining conditions from request body
                for (const key in filterParams) {
                    if (key != 'startDate' && key != 'endDate') {
                        whereCondition[key] = filterParams[key];
                    }
                }
                const entities = await this.repository.find({
                    where: whereCondition,
                });

                res.json(entities);
            } else {
                const entities = await this.repository.find({
                    where: filterParams
                });

                res.json(entities);
            }
        } catch (err) {
            this.handleError(res, err);
        }
    };
}
