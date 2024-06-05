import { Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Product } from "@prisma/client";
import { prismaClient } from "..";

export const addItemToCart = async (req: Request, res: Response) => {
  const validatedData = CreateCartSchema.parse(req.body);

  let product;
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: { id: validatedData.productId },
    });
  } catch (err) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }

  const existingCartItem = await prismaClient.cartItem.findFirst({
    where: {
      userId: req.user.id,
      productId: validatedData.productId,
    },
  });

  let cartItem;
  if (existingCartItem) {
    cartItem = await prismaClient.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + validatedData.quantity },
    });
  } else {
    cartItem = await prismaClient.cartItem.create({
      data: {
        userId: req.user.id,
        productId: validatedData.productId,
        quantity: validatedData.quantity,
      },
    });
  }

  res.json(cartItem);
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
  const cartItem = await prismaClient.cartItem.findFirst({
    where: {
      id: +req.params.id,
      userId: req.user.id,
    },
  });

  if (!cartItem) {
    throw new NotFoundException(
      "Cart item not found",
      ErrorCode.CART_ITEM_NOT_FOUND
    );
  }

  await prismaClient.cartItem.delete({
    where: { id: +req.params.id },
  });

  res.json({ success: true });
};

export const changeQuantity = async (req: Request, res: Response) => {
  const validatedData = ChangeQuantitySchema.parse(req.body);

  const cartItem = await prismaClient.cartItem.findFirst({
    where: {
      id: +req.params.id,
      userId: req.user.id,
    },
  });

  if (!cartItem) {
    throw new NotFoundException(
      "Cart item not found",
      ErrorCode.CART_ITEM_NOT_FOUND
    );
  }

  const updatedCartItem = await prismaClient.cartItem.update({
    where: { id: +req.params.id },
    data: { quantity: validatedData.quantity },
  });

  res.json(updatedCartItem);
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      product: true,
    },
  });
  res.json(cart);
};
