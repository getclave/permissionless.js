import type { Account, Address } from "viem"
import { deepHexlify, transactionReceiptStatus } from "./deepHexlify"
import { getAddressFromInitCodeOrPaymasterAndData } from "./getAddressFromInitCodeOrPaymasterAndData"
import {
    type GetRequiredPrefundReturnType,
    getRequiredPrefund
} from "./getRequiredPrefund"
import { isSmartAccountDeployed } from "./isSmartAccountDeployed"
import { providerToSmartAccountSigner } from "./providerToSmartAccountSigner"
import { walletClientToSmartAccountSigner } from "./walletClientToSmartAccountSigner"

export function parseAccount(account: Address | Account): Account {
    if (typeof account === "string")
        return { address: account, type: "json-rpc" }
    return account
}
import { decodeNonce } from "./decodeNonce"
import { encodeNonce } from "./encodeNonce"

import { getPackedUserOperation } from "./getPackedUserOperation"

export {
    transactionReceiptStatus,
    deepHexlify,
    getRequiredPrefund,
    walletClientToSmartAccountSigner,
    type GetRequiredPrefundReturnType,
    isSmartAccountDeployed,
    providerToSmartAccountSigner,
    getAddressFromInitCodeOrPaymasterAndData,
    getPackedUserOperation,
    encodeNonce,
    decodeNonce
}
