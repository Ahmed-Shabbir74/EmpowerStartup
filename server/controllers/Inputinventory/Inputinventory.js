const Inputinventory = require('../../models/Inputinventory/Inputinventory');

const inputinventory = async (req, res) => {
  const { productName1, quantity1, userId,productName2 ,quantity2,productName3,quantity3,productName4,quantity4} = req.body;
      
  try {
    // Assuming you have an Order model or schema defined
    const Inputinventory_1 = new Inputinventory();

    Inputinventory_1.selectedProducts.push({
      productName1,
      quantity1,
      productName2,
      quantity2,
      productName3,
      quantity3,
      productName4,
      quantity4,
    })

    Inputinventory_1.userId=userId;
    await Inputinventory_1.save();

    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order' });
  }
};

module.exports = inputinventory;
