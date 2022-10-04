import {Router} from 'express';
import {body, validationResult} from 'express-validator';
import { createProduct, deleteProduct, getUserProduct, getUserProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from './handlers/update';
import { handleInputErrors } from './modules/middleware';

const router = Router();

/**
 * PRODUCT
 */

router.get("/product", getUserProducts);

router.get("/product/:id", getUserProduct);
  
router.post("/product", createProduct);
  
router.put("/product/:id", body('name').isString(), handleInputErrors, updateProduct);
  
router.delete("/product/:id", deleteProduct); 

/**
 * UPDATE
 */

router.get("/update", getUpdates);

router.get("/update/:id", getUpdate);

router.post("/update", createUpdate);

router.put("/update/:id", updateUpdate);

router.delete("/update/:id", deleteUpdate);

/**
 * UPDATE POINT
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint", (req, res) => {});

router.put("/updatepoint/:id", (req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});

export default router;