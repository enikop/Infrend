import { Between } from "typeorm";
import { AppDataSource } from "../data-source";
import { Donation } from "../entity/Donation";
import { Controller } from "./base.controller";
import { Request, Response } from 'express';

export class DonationController extends Controller {
  repository = AppDataSource.getRepository(Donation);

  getAllFiltered = async (req:Request, res:Response) => {
    try {
        const filterParams = req.query;
        if ('startDate' in filterParams && 'endDate' in filterParams){
          const startDate = filterParams.startDate as string;
          const endDate = filterParams.endDate as string;
          var whereCondition = {date: Between(startDate, endDate)};
          for (const key in filterParams) {
            if (filterParams.hasOwnProperty(key) && key !== 'startDate' && key !== 'endDate') {
              whereCondition[key] = filterParams[key];
            }
          }
          const entities = await this.repository.find({
            where: whereCondition,
          });
          res.json(entities);
        } else {
          const entities = await this.repository.find({where: filterParams});
          res.json(entities);
        }
    } catch (err) {
        this.handleError(res, err);
    }
 };
}
