const getProduct = async (req, res) => {
  res.send(
    {
      success: true,
      data: {},
      message: "berhasil pake api handler",
      code: 200
    });
};

module.exports = {
  getProduct
};
