const User = require("../../models/users/user");

const UpdateCandidate = async (req, res) => {
  const { partyName, appliedAsCandidate, id, StartupDesc, Startuptype, UserAddress, StartupAddress } = req.body;
  const CNICFront = req.files['CNICFront'] ? req.files['CNICFront'][0].filename : "";
  const CNICBack = req.files['CNICBack'] ? req.files['CNICBack'][0].filename : "";
  const Electricitybill = req.files['Electricitybill'] ? req.files['Electricitybill'][0].filename : "";
  const Utilitybill = req.files['Utilitybill'] ? req.files['Utilitybill'][0].filename : "";
  try {
    const userId = id;
    await User.updateOne(
      { _id: userId },
      {
        appliedAsCandidate: appliedAsCandidate,
        partyName: partyName,
        CNICFront: CNICFront,
        CNICBack: CNICBack,
        Electricitybill: Electricitybill,
        Utilitybill: Utilitybill,
        StartupDesc: StartupDesc,
        Startuptype: Startuptype,
        UserAddress: UserAddress,
        StartupAddress: StartupAddress,

      }
    );
    res.status(200).json({ message: "Applied For Startup" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

module.exports = UpdateCandidate;
