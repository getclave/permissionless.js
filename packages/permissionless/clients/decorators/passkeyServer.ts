import type { Account, Chain, Client, Transport } from "viem"
import {
    type GetCredentialsParameters,
    type GetCredentialsReturnType,
    getCredentials
} from "../../actions/passkeyServer/getCredentials"
import {
    type StartAuthenticationReturnType,
    startAuthentication
} from "../../actions/passkeyServer/startAuthentication"
import {
    type StartRegistrationParameters,
    type StartRegistrationReturnType,
    startRegistration
} from "../../actions/passkeyServer/startRegistration"
import {
    type VerifyAuthenticationParameters,
    type VerifyAuthenticationReturnType,
    verifyAuthentication
} from "../../actions/passkeyServer/verifyAuthentication"
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
    startAuthentication: () => Promise<StartAuthenticationReturnType>
    verifyAuthentication: (
        args: VerifyAuthenticationParameters
    ) => Promise<VerifyAuthenticationReturnType>
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
    getCredentials: (args) => getCredentials(client, args),
    startAuthentication: () => startAuthentication(client),
    verifyAuthentication: (args) => verifyAuthentication(client, args)
})
