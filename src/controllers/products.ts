import { Request, Response } from "express";
import { prismaClient } from "..";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await prismaClient.product.create({
      data: {
        ...req.body,
        tags: req.body.tags.join(","),
      },
    });
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};
