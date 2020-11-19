const wrapper = require('../../helpers/utils/wrapper');
const Models = require('./model');
const uuid = require('uuid/v4');

// const commandHandler = ;

const getProduct = async (req, res) => {
  const { productId } = req.params;
  const result = await Models.findById(productId);
  if(!result){
    wrapper.error(res, "Data that you\'re asking for is does\'nt exist");
  }

  wrapper.success(res, result, "Yeay, This is products that you\'re asking for");
};

const listProduct = async (req,res) => {
  const result = await Models.find();

  wrapper.success(res, result, "Yeay, This is products that you\'re asking for");
};

const createProduct = async (req, res) => {
  const payload = req.body;
  const document = {
    productId: uuid(),
    ...payload
  };

  const models = new Models(document);
  if(models.validateSync()){
    wrapper.error(res, models.validateSync().message);
  }

  const result = await models.save();
  wrapper.success(res, result, "Yeay, Product that you\'re asking for is Successfully Created!");
};

module.exports = {
  getProduct,
  listProduct,
  createProduct
};
