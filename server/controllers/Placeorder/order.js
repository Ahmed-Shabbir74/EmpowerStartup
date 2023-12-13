const Order = require('../../models/placeorder/userplaceorder');

const placeOrder = async (req, res) => {
  const { productName, quantity, userId,productname2 ,quantity2,productname3,quantity3,productname4,quantity4} = req.body;
      console.log(productName);
  try {
    // Assuming you have an Order model or schema defined
    const order = new Order();

    order.selectedProducts.push({
      productName,
      quantity,
      productname2,
      quantity2,
      productname3,
      quantity3,
      productname4,
      quantity4,
    })

    order.userId=userId;
    await order.save();

    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order' });
  }
};

module.exports = placeOrder;
