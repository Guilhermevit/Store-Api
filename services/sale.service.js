import saleRepository from "../repositories/sale.repository.js";
import ClientRepository from "../repositories/client.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import clientRepository from "../repositories/client.repository.js";
import productRepository from "../repositories/product.repository.js";

async function createSale(sale) {
  if (!(await clientRepository.getClient(sale.client_id))) {
    throw new Error("Cliente não encontrado!");
  }
  const product = await productRepository.getProduct(sale.product_id);
  if (!product) {
    throw new Error("Produto inexistente!");
  }

  if (product.stock > 0) {
    sale = await saleRepository.insertSale(sale);
    product.stock--;
    await ProductRepository.updateProduct(product);
    return sale;
  } else {
    throw new Error("Sem estoque garotinho");
  }
}
async function getSales() {
  return await saleRepository.getSales();
}

async function getSale(id) {
  return await saleRepository.getSale(id);
}

async function deleteSale(id) {
  const sale = await saleRepository.getSale(id);
  if (sale) {
    const product = await productRepository.getProduct(sale.product_id);
    await saleRepository.deleteSale(id);
    product.stock++;
    await productRepository.updateProduct(product);
  } else {
    throw new Error("Tem algo de errado que não esta certo");
  }
}

async function updateSale(sale) {
  if (!(await clientRepository.getClient(sale.client_id))) {
    throw new Error("Cliente não encontrado!");
  }
  if (!(await ProductRepository.getProduct(sale.product_id))) {
    throw new Error("Produto inexistente!");
  }
  return await saleRepository.updateSale(sale);
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
