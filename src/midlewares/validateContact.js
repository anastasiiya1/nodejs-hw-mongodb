export const validateContact = (req, res, next) => {
  const { name, phoneNumber } = req.body;
  if (!name || !phoneNumber) {
    return res.status(400).json({
      status: 400,
      message: 'Missing required fields: name or phoneNumber',
    });
  }
  next();
};
