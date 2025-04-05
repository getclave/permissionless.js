import type { Account, Chain, Client, Transport } from "viem"
import {
    type GetCredentialsParameters,
    type GetCredentialsReturnType,
    getCredentials
} from "../../actions/passkeyServer/getCredentials"
import {
    type StartRegistrationParameters,
    type StartRegistrationReturnType,
    startRegistration
} from "../../actions/passkeyServer/startRegistration"
import {
    type VerifyRegistrationParameters,
    type VerifyRegistrationReturnType,
    verifyRegistration
} from "../../actions/passkeyServer/verifyRegistration"
import type { PasskeyServerRpcSchema } from "../../types/passkeyServer"

export type PasskeyServerActions = {
    startRegistration: (
        args: StartRegistrationParameters
    ) => Promise<StartRegistrationReturnType>
    verifyRegistration: (
        args: VerifyRegistrationParameters
    ) => Promise<VerifyRegistrationReturnType>
    getCredentials: (
        args: GetCredentialsParameters
    ) => Promise<GetCredentialsReturnType>
}

export const passkeyServerActions = (
    client: Client<
        Transport,
        Chain | undefined,
        Account | undefined,
        PasskeyServerRpcSchema
    >
): PasskeyServerActions => ({
    startRegistration: (args) => startRegistration(client, args),
    verifyRegistration: (args) => verifyRegistration(client, args),
    getCredentials: (args) => getCredentials(client, args)
})
