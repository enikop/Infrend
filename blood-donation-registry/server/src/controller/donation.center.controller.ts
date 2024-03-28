import { AppDataSource } from "../data-source";
import { DonationCenter } from "../entity/DonationCenter";
import { Controller } from "./base.controller";

export class DonationCenterController extends Controller {
  repository = AppDataSource.getRepository(DonationCenter);
}
