import saleRepository from "../repositories/sale.repository.js";
import saleService from "../services/sale.service.js";

async function createSale(req, res, next) {
  try {
    let sale = req.body;
    if (!sale.client_id || !sale.product_id || !sale.value || !sale.date) {
      throw new Error(
        "Id do cliente, ID do produto, valor e data são obrigatorios"
      );
    }
    res.send(await saleService.createSale(sale));
    logger.info(`POST /sale - ${JSON.stringify(sale)}`);
  } catch (err) {
    next(err);
  }
}

async function getSales(req, res, next) {
  try {
    res.send(await saleService.getSales());
    logger.info("GET/sale");
  } catch (err) {
    next(err);
  }
}

async function getSale(req, res, next) {
  try {
    res.send(await saleService.getSale(req.params.id));
    logger.info("GET/sale");
  } catch (err) {
    next(err);
  }
}

async function deleteSale(req, res, next) {
  try {
    await saleService.deleteSale(req.params.id);
    res.end();
    logger.info("DELETE/sale");
  } catch (err) {
    next(err);
  }
}

async function updateSale(req, res, next) {
  try {
    let sale = req.body;
    if (
      !sale.sale_id ||
      !sale.client_id ||
      !sale.product_id ||
      !sale.value ||
      !sale.date
    ) {
      throw new Error(
        "ID da venda, Id do cliente, ID do produto, valor e data são obrigatorios"
      );
    }
    sale = await saleService.updateSale(sale);
    res.send(sale);
    logger.info(`PUT /sale - ${JSON.stringify(sale)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
