const { Contact } = require("../../models/contact");

const { HttpError, isEmptyObj } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  if (isEmptyObj(req.body)) {
    throw HttpError(400, "Missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.json(result);
};

module.exports = updateStatusContact;
