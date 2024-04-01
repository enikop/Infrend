import { AppDataSource } from '../data-source';
import { Beneficiary } from '../entity/Beneficiary';
import { Controller } from './base.controller';

export class BeneficiaryController extends Controller {
  repository = AppDataSource.getRepository(Beneficiary);
}
