import prisma from "../db"
import Joi from 'joi';
import {adapt} from '../adapters/product';

const productSchema = Joi.object().keys({
    name: Joi.string().required()
});

/**
 * Return all a user's products
 * @param req 
 * @param res 
 * @param next 
 */
export const getUserProducts = async (req: any, res: any, next: () => void) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            include: {
                products: true,
            },
        });

        res.json({ data: user?.products });
    } catch (error) {
        next();
    }
}

/**
 * Return a user's product
 * @param req 
 * @param res 
 * @param next 
 */
export const getUserProduct = async (req: any, res: any, next: () => void) => {
    const { id } = req.params;

    try {
        const product = await prisma.product.findFirst({
            where: {
                id,
                belongsToId: req.user.id,
            },
        });
    
        const updatedProduct = adapt(product);
        res.status(200).json({ data: updatedProduct });
    } catch (error) {
        next();
    }
}

export const createProduct = async (req: any, res: any, next: () => void) => {
    
    const { value, error } = productSchema.validate(req.body);

    if (error) return res.status(401).json({msg: error.details[0].message});
    
    try {
        const product = await prisma.product.create({
            data: {
                name: value.name,
                belongsToId: req.user.id
            }
        })
    
        res.json({data: product});
    } catch (error) {
        next();
    }
}

export const updateProduct = async (req: any, res: any, next: () => void) => {
    const { value, error } = productSchema.validate(req.body);
    if (error) return res.status(401).json({msg: error.details[0].message});

    try {
        const updated = await prisma.product.update({
            where: {
                // compound index
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id
                }
            },
            data: {
                name: value.name
            }
        })
    
        res.json({data: updated});
    } catch (error) {
        next();
    }
}

export const deleteProduct = async (req: any, res: any, next: () => void) => {
    try {
        const deleted = await prisma.product.delete({
            where: {
                // compound index
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id
                }
            }
        })
    
        res.json({data: deleted});
    } catch (error) {
        next();
    }
}