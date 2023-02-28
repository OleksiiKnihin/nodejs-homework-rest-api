const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  console.log(result);
  if (!result) {
    throw HttpError(400, "Not found");
  }
  res.json({ message: "Delete success" });
};

module.exports = removeContact;
