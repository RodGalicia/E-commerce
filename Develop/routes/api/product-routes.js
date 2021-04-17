const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const { restore } = require('../../models/Product');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products

  try {
    const products = await Product.findAll({
      include: [Category, Tag],
    })
    
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`

  try {
    const products = await Product.findByPk(req.params.id)
    

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }

});

// create new product
router.post('/', async (req, res) => {
  // req.body should look like this...

  try {
    const products = await Product.create(req.body)
    if (!products) {
      return res.status(404).json({ message: "No such product" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }

});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    const productsData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if (!productsData) {
      return res.status(404).json({ message: "No such product" });
    }
    res.status(200).json(productsData);
  } catch (err) {
    res.status(500).json(err);

  }

});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productsData = await Product.destroy({
      where: {
        id: req.params.id,
      }
    })

    if (!productsData) {
      return res.status(404).json({ message: "No such product" });
    } 
    res.status(200).json(productsData);
  } catch (err) {
    res.status(500).json(err);
  }

});




module.exports = router;
