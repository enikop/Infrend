import express from 'express';
import { DonorController } from './controller/donor.controller';
import { BeneficiaryController } from './controller/beneficiary.controller';
import { DonationCenterController } from './controller/donation.center.controller';
import { DonationController } from './controller/donation.contoller';

export function getRoutes(){
  const router = express.Router();
  const donorController = new DonorController();
  const donationController = new DonationController();
  const donationCenterController = new DonationCenterController();
  const beneficiaryController = new BeneficiaryController();

  router.get('/donor', donorController.getAll);
  router.get('/donor/:id', donorController.getOne);
  router.post('/donor', donorController.create);
  router.put('/donor', donorController.update);
  //router.delete('/donor/:id', donorController.delete);

  router.get('/donationCenter', donationCenterController.getAll);
  router.get('/donationCenter/:id', donationCenterController.getOne);
  router.post('/donationCenter', donationCenterController.create);
  router.put('/donationCenter', donationCenterController.update);
  //router.delete('/donationCenter/:id', donationCenterController.delete);

  router.get('/donation', donationController.getAll);
  router.get('/donation/filteredBy', donationController.getAllFiltered);
  router.get('/donation/:id', donationController.getOne);
  router.post('/donation', donationController.create);
  //router.put('/donation', donationController.update);
  //router.delete('/donation/:id', donationController.delete);

  router.get('/beneficiary', beneficiaryController.getAll);
  router.get('/beneficiary/:id', beneficiaryController.getOne);
  router.post('/beneficiary', beneficiaryController.create);
  router.put('/beneficiary', beneficiaryController.update);
  //router.delete('/beneficiary/:id', beneficiaryController.delete);

  return router;
}
