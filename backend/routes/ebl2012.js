import { Router } from "express";
import ebl2012Controller from "../controllers/ebl2012Controller.js";
import auth from "../middleware/auth.js";
// import { authRole, ROLE } from "../middleware/authRole.js";

const router = Router();

// Sample Receipt Endpoint
router.post("/sample-receipt", 
	auth, ebl2012Controller.createSampleReceipt);

router.get("/sample-receipt", 
	auth, ebl2012Controller.getSampleReceipt);

// PBMC Sample Endpoint
router.post("/pbmc-sample", 
	auth, 
	ebl2012Controller.createPBMCSample);

router.get("/pbmc-sample", 
	auth, ebl2012Controller.getPBMCSample);

// PBMC Humoral Sample Endpoint
router.post(
  "/humoral-sample-storage",
  auth,
  ebl2012Controller.createHumoralsSampleStorage
);
router.get(
  "/humoral-sample-storage",
  auth,
  ebl2012Controller.getHumoralsSampleStorage
);

export default router;
