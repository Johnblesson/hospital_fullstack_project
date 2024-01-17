import { Router } from "express";
import cssController from "../controllers/cssController.js";
// import auth from "../middleware/auth.js";
// import { authRole, ROLE } from "../middleware/authRole.js";

const router = Router();

// CSS Endpoint
router.post("/css-storage", 
	 cssController.createCSS);

router.get("/css-storage",
  
	cssController.getCSS);

// LS1 Sample Endpoint
router.post("/ls1-storage", 
	 
	cssController.createLs1);

router.get("/ls1-storage", 
	 cssController.getLs1);

// LS2 Sample Endpoint
router.post(
  "/ls2-storage",
  
  cssController.createLs2
);
router.get(
  "/ls2-storage",
  
  cssController.getLs2
);

export default router;
