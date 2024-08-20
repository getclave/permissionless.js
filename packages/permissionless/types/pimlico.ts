import type { Address, Hash, Hex, OneOf, PartialBy } from "viem"
import type {
    UserOperation,
    entryPoint06Address,
    entryPoint07Address
} from "viem/account-abstraction"

type PimlicoUserOperationGasPriceWithBigIntAsHex = {
    slow: {
        maxFeePerGas: Hex
        maxPriorityFeePerGas: Hex
    }
    standard: {
        maxFeePerGas: Hex
        maxPriorityFeePerGas: Hex
    }
    fast: {
        maxFeePerGas: Hex
        maxPriorityFeePerGas: Hex
    }
}

export type PimlicoUserOperationStatus = {
    status:
        | "not_found"
        | "not_submitted"
        | "submitted"
        | "rejected"
        | "reverted"
        | "included"
        | "failed"
    transactionHash: Hash | null
}

export type PimlicoRpcSchema<
    entryPointAddress extends
        | typeof entryPoint06Address
        | typeof entryPoint07Address = typeof entryPoint07Address,
    entryPointVersion extends "0.6" | "0.7" = "0.7"
> = [
    {
        Method: "pimlico_getUserOperationGasPrice"
        Parameters: []
        ReturnType: PimlicoUserOperationGasPriceWithBigIntAsHex
    },
    {
        Method: "pimlico_getUserOperationStatus"
        Parameters: [hash: Hash]
        ReturnType: PimlicoUserOperationStatus
    },
    {
        Method: "pimlico_sendCompressedUserOperation"
        Parameters: [
            compressedUserOperation: Hex,
            inflatorAddress: Address,
            entryPoint: Address
        ]
        ReturnType: Hash
    },
    {
        Method: "pm_sponsorUserOperation"
        Parameters: [
            userOperation: OneOf<
                | (entryPointVersion extends "0.6"
                      ? PartialBy<
                            UserOperation<"0.6", Hex>,
                            | "callGasLimit"
                            | "preVerificationGas"
                            | "verificationGasLimit"
                        >
                      : never)
                | (entryPointVersion extends "0.7"
                      ? PartialBy<
                            UserOperation<"0.7", Hex>,
                            | "callGasLimit"
                            | "preVerificationGas"
                            | "verificationGasLimit"
                            | "paymasterVerificationGasLimit"
                            | "paymasterPostOpGasLimit"
                        >
                      : never)
            >,
            entryPoint: entryPointAddress,
            metadata?: {
                sponsorshipPolicyId?: string
            }
        ]
        ReturnType: entryPointAddress extends "0.6"
            ? {
                  paymasterAndData: Hex
                  preVerificationGas: Hex
                  verificationGasLimit: Hex
                  callGasLimit: Hex
                  paymaster?: never
                  paymasterVerificationGasLimit?: never
                  paymasterPostOpGasLimit?: never
                  paymasterData?: never
              }
            : {
                  preVerificationGas: Hex
                  verificationGasLimit: Hex
                  callGasLimit: Hex
                  paymaster: Address
                  paymasterVerificationGasLimit: Hex
                  paymasterPostOpGasLimit: Hex
                  paymasterData: Hex
                  paymasterAndData?: never
              }
    },
    {
        Method: "pm_validateSponsorshipPolicies"
        Parameters: [
            userOperation: UserOperation<entryPointVersion, Hex>,
            entryPoint: entryPointAddress,
            sponsorshipPolicyIds: string[]
        ]
        ReturnType: {
            sponsorshipPolicyId: string
            data: {
                name: string | null
                author: string | null
                icon: string | null
                description: string | null
            }
        }[]
    }
]
