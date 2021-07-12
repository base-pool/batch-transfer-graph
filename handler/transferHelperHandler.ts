import {log,dataSource, Bytes, Address, BigInt , ethereum, ipfs} from "@graphprotocol/graph-ts"

import { 
  TransferFromInfo, 
  BatchTransferInfo,
  TransactionInfo,
  TokenInfo,
} from "../generated/schema"

import {
  TransferFrom,
  BatchTransfer,
} from "../generated/TransferHelper/TransferHelper"

export function handleTransferFrom(event: TransferFrom): void {
  log.info("[TransferFrom]: ", []);
  let transactionInfo = TransactionInfo.load(event.transaction.hash.toHex());
  if (transactionInfo == null) {
    transactionInfo = new TransactionInfo(event.transaction.hash.toHex());
    transactionInfo.from = event.transaction.from;
    transactionInfo.to = <Bytes>event.transaction.to;
    transactionInfo.value = event.transaction.value;
    transactionInfo.gasUsed = event.transaction.gasUsed;
    transactionInfo.gasPrice = event.transaction.gasPrice;
    transactionInfo.timestamp = event.block.timestamp;
    transactionInfo.save();
  }
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let transferFromInfo = new TransferFromInfo(id);
  transferFromInfo.from = event.params.from;
  transferFromInfo.to = event.params.to;
  transferFromInfo.amount = event.params.amount;
  transferFromInfo.success = event.params.success;
  transferFromInfo.transaction = event.transaction.hash.toHex();
  transferFromInfo.token = event.params.token.toHex();
  transferFromInfo.save();
}

export function handleBatchTransfer(event: BatchTransfer): void {
  log.info("[BatchTransfer]: ", []);
  let transactionInfo = TransactionInfo.load(event.transaction.hash.toHex());
  if (transactionInfo == null) {
    transactionInfo = new TransactionInfo(event.transaction.hash.toHex());
    transactionInfo.from = event.transaction.from;
    transactionInfo.to = <Bytes>event.transaction.to;
    transactionInfo.value = event.transaction.value;
    transactionInfo.gasUsed = event.transaction.gasUsed;
    transactionInfo.gasPrice = event.transaction.gasPrice;
    transactionInfo.timestamp = event.block.timestamp;
    transactionInfo.save();
  }
  let tokenInfo = TokenInfo.load(event.params.token.toHex());
  if (tokenInfo == null) {
    tokenInfo = new TokenInfo(event.params.token.toHex());
    tokenInfo.symbol = event.params.symbol;
    tokenInfo.decimals = event.params.decimals;
    tokenInfo.save();
  }
  let batchTransferInfo = new BatchTransferInfo(event.transaction.hash.toHex());
  batchTransferInfo.from = event.params.from;
  batchTransferInfo.num = event.params.num;
  batchTransferInfo.gasCost = event.params.gasCost;
  batchTransferInfo.gasFee = event.params.gasFee;
  batchTransferInfo.transaction = event.transaction.hash.toHex();
  batchTransferInfo.token = event.params.token.toHex();
  batchTransferInfo.save();
}
