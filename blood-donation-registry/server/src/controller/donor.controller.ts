import { AppDataSource } from "../data-source";
import { Donor } from "../entity/Donor";
import { Controller } from "./base.controller";

export class DonorController extends Controller {
  repository = AppDataSource.getRepository(Donor);
}
