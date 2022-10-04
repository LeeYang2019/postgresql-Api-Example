import { validationResult } from "express-validator";

export const handleInputErrors = (req: any, res: any, next: () => void) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    } else {
        next();
    }
}