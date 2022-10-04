import Joi from 'joi';

const productSchema = Joi.object().keys({
	createAt: Joi.string().required(),
	name: Joi.string().required()
})

export const adapt = (results: any) => {
	const { createdAt, name } = results;
	const returnProduct = { createdAt, name };
	let { value } = productSchema.validate(returnProduct);
	return value;
};
