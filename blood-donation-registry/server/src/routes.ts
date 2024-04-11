import express from 'express';
import { DonorController } from './controller/donor.controller';
import { BeneficiaryController } from './controller/beneficiary.controller';
import { DonationCenterController } from './controller/donation.center.controller';
import { DonationController } from './controller/donation.contoller';
import { UserController } from './controller/user.controller';
import { checkUser } from './protect-routes';

export function getRoutes(){
  const router = express.Router();
  const donorController = new DonorController();
  const donationController = new DonationController();
  const donationCenterController = new DonationCenterController();
  const beneficiaryController = new BeneficiaryController();
  const userController = new UserController();

  router.get('/user', userController.getAll);
  router.get('/user/:id', userController.getOne);
  router.post('/user', userController.create);
  router.post('/user/login', userController.login);

  router.get('/donor', donorController.getAll);
  router.get('/donor/:id', donorController.getOne);
  router.post('/donor', checkUser, donorController.create);
  router.put('/donor', checkUser, donorController.update);
  //router.delete('/donor/:id', checkUser, donorController.delete);

  router.get('/donationCenter', donationCenterController.getAll);
  router.get('/donationCenter/filteredBy', donationCenterController.getAllFiltered);
  router.get('/donationCenter/:id', donationCenterController.getOne);
  router.post('/donationCenter', checkUser, donationCenterController.create);
  router.put('/donationCenter', checkUser, donationCenterController.update);
  //router.delete('/donationCenter/:id', checkUser, donationCenterController.delete);

  router.get('/donation', donationController.getAll);
  router.get('/donation/filteredBy', donationController.getAllFiltered);
  router.get('/donation/:id', donationController.getOne);
  router.post('/donation', checkUser, donationController.create);
  router.put('/donation', checkUser, donationController.update);
  //router.delete('/donation/:id', checkUser, donationController.delete);

  router.get('/beneficiary', beneficiaryController.getAll);
  router.get('/beneficiary/:id', beneficiaryController.getOne);
  router.post('/beneficiary', checkUser, beneficiaryController.create);
  router.put('/beneficiary', checkUser, beneficiaryController.update);
  //router.delete('/beneficiary/:id', checkUser, beneficiaryController.delete);

  return router;
}
