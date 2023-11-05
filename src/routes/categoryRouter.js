import { Router } from "express";
import Category from "../schema/categorySchema/categorySchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const categoryRouter = Router();

categoryRouter.post("/", verifyToken, async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const result = await newCategory.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

categoryRouter.get("/", async (req, res) => {
  try {
    const results = await Category.find();
    res.send(results);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
categoryRouter.put("/:id", verifyToken, async (req, res) => {
  const _id = req.params.id;
  const filter = { _id };
  const updatedDoc = {
    $set: {
      ...req.body,
    },
  };
  try {
    const result = await Category.updateOne(filter, updatedDoc);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

categoryRouter.delete("/:id", verifyToken, async (req, res) => {
  const _id = req.params.id;
  const filter = { _id };
  try {
    const result = await Category.deleteOne(filter);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default categoryRouter;
