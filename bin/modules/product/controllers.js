const wrapper = require('../../helpers/utils/wrapper');
const Models = require('./model');
const uuid = require('uuid/v4');

/* query */
const getProduct = async (req, res) => {
  const { productId } = req.params;
  const result = await Models.find({ productId });
  if(!result){
    wrapper.error(res, "Data that you\'re asking for is does\'nt exist");
  }

  wrapper.success(res, result, "Yeay, This is products that you\'re asking for");
};

const listProduct = async (req,res) => {
  const result = await Models.find();

  wrapper.success(res, result, "Yeay, This is products that you\'re asking for");
};

/* command */
const createProduct = async (req, res) => {
  const payload = req.body;
  const date = new Date().toISOString();
  const document = {
    productId: uuid(),
    modifiedAt: date,
    createdAt: date,
    ...payload
  };

  try{
    const models = new Models(document);
    const result = await models.save();
    wrapper.success(res, result, "Yeay, Product that you\'re asking for is Successfully Created!");
  } catch(err) {
    wrapper.error(res, String(err))
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const payload = req.body

  const product = await Models.findOne({ productId });
  if(!product){
    wrapper.error(res, "Cannot find Product!");
  }

  const date = new Date().toISOString();
  const document = {
    modifiedAt: date,
    ...payload
  };

  try {
    await Models.updateOne(
      { productId },
      { $set: document }
    );

    const result = await Models.findOne({ productId });
    wrapper.success(res, result, "Yeay, Product that you\'re asking for is Successfully Updated!");
  } catch (err) {
    wrapper.error(res, String(err))
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await Models.findOne({ productId });
  if (!product) {
    wrapper.error(res, "Cannot find Product!");
  }

  try {
    await Models.deleteOne({ productId });
    wrapper.success(res, product, "Yeay, Product that you\'re asking for is Successfully Deleted!");
  } catch (err) {
    wrapper.error(res, String(err))
  }
};

module.exports = {
  getProduct,
  listProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
