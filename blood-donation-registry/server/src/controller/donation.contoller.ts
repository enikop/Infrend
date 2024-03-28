import { AppDataSource } from "../data-source";
import { Donation } from "../entity/Donation";
import { Controller } from "./base.controller";

export class DonationController extends Controller {
  repository = AppDataSource.getRepository(Donation);
}
