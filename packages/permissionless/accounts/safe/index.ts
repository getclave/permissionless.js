import {
    type SafeSmartAccountImplementation,
    type SafeVersion,
    type ToSafeSmartAccountParameters,
    type ToSafeSmartAccountReturnType,
    toSafeSmartAccount
} from "./toSafeSmartAccount"

import { signUserOperation } from "./signUserOperation"

const SafeSmartAccount = {
    toSafeSmartAccount,
    signUserOperation
}

export {
    type SafeSmartAccountImplementation,
    type SafeVersion,
    type ToSafeSmartAccountParameters,
    type ToSafeSmartAccountReturnType,
    SafeSmartAccount
}
