import productRepository from "../repositories/product.repository.js";
import supplierRepository from "../repositories/supplier.repository.js";

async function createProduct(product) {
  if (await supplierRepository.getSupplier(product.supplier_id)) {
    return await productRepository.insertProduct(product);
  }
  throw new Error("Fornecedor inexistente!");
}

async function getProducts() {
  return await productRepository.getProducts();
}

async function getProduct(id) {
  return await productRepository.getProduct(id);
}

async function deleteProduct(id) {
  await productRepository.deleteProduct(id);
}

async function updateProduct(product) {
  if (await supplierRepository.getSupplier(product.supplier_id)) {
    return await productRepository.updateProduct(product);
  }
  throw new Error("Fornecedor inexistente!");
}

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
