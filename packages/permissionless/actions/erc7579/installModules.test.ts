import { encodeAbiParameters, encodePacked, isHash, zeroAddress } from "viem"
import { describe, expect } from "vitest"
import { testWithRpc } from "../../../permissionless-test/src/testWithRpc"
import { getCoreSmartAccounts } from "../../../permissionless-test/src/utils"
import { erc7579Actions } from "../erc7579"
import { installModules } from "./installModules"

describe.each(getCoreSmartAccounts())(
    "installModules $name",
    ({ getErc7579SmartAccountClient, name }) => {
        testWithRpc.skipIf(!getErc7579SmartAccountClient)(
            "installModules",
            async ({ rpc }) => {
                if (!getErc7579SmartAccountClient) {
                    throw new Error("getErc7579SmartAccountClient not defined")
                }

                const smartClientWithoutExtend =
                    await getErc7579SmartAccountClient({
                        entryPoint: {
                            version: "0.7"
                        },
                        ...rpc
                    })

                const smartClient = smartClientWithoutExtend.extend(
                    erc7579Actions()
                )

                const moduleData = encodePacked(
                    ["address"],
                    [smartClient.account.address]
                )

                const opHash = await installModules(smartClient, {
                    account: smartClient.account,
                    modules: [
                        {
                            type: "executor",
                            address:
                                "0xc98B026383885F41d9a995f85FC480E9bb8bB891",
                            context: name.startsWith("Kernel 7579")
                                ? encodePacked(
                                      ["address", "bytes"],
                                      [
                                          zeroAddress,
                                          encodeAbiParameters(
                                              [
                                                  { type: "bytes" },
                                                  { type: "bytes" }
                                              ],
                                              [moduleData, "0x"]
                                          )
                                      ]
                                  )
                                : moduleData
                        }
                    ]
                })

                expect(isHash(opHash)).toBe(true)

                const userOperationReceipt =
                    await smartClient.waitForUserOperationReceipt({
                        hash: opHash,
                        timeout: 100000
                    })
                expect(userOperationReceipt).not.toBeNull()
                expect(userOperationReceipt?.userOpHash).toBe(opHash)
                expect(
                    userOperationReceipt?.receipt.transactionHash
                ).toBeTruthy()

                const receipt = await smartClient.getUserOperationReceipt({
                    hash: opHash
                })

                expect(receipt?.receipt.transactionHash).toBe(
                    userOperationReceipt?.receipt.transactionHash
                )

                const isModuleInstalled = await smartClient.isModuleInstalled({
                    type: "executor",
                    address: "0xc98B026383885F41d9a995f85FC480E9bb8bB891",
                    context: "0x"
                })

                expect(isModuleInstalled).toBe(true)
            }
        )
        testWithRpc.skipIf(!getErc7579SmartAccountClient)(
            "installModules",
            async ({ rpc }) => {
                if (!getErc7579SmartAccountClient) {
                    throw new Error("getErc7579SmartAccountClient not defined")
                }

                const smartClientWithoutExtend =
                    await getErc7579SmartAccountClient({
                        entryPoint: {
                            version: "0.7"
                        },
                        ...rpc
                    })

                const smartClient = smartClientWithoutExtend.extend(
                    erc7579Actions()
                )

                const userOpHash = await smartClient.sendUserOperation({
                    calls: [
                        {
                            to: smartClient.account.address,
                            value: 0n,
                            data: "0x"
                        },
                        {
                            to: smartClient.account.address,
                            value: 0n,
                            data: "0x"
                        }
                    ]
                })

                await smartClient.waitForUserOperationReceipt({
                    hash: userOpHash
                })

                const moduleData = encodePacked(
                    ["address"],
                    [smartClient.account.address]
                )

                const opHash = await installModules(smartClient, {
                    account: smartClient.account,
                    modules: [
                        {
                            type: "executor",
                            address:
                                "0xc98B026383885F41d9a995f85FC480E9bb8bB891",
                            context: name.startsWith("Kernel 7579")
                                ? encodePacked(
                                      ["address", "bytes"],
                                      [
                                          zeroAddress,
                                          encodeAbiParameters(
                                              [
                                                  { type: "bytes" },
                                                  { type: "bytes" }
                                              ],
                                              [moduleData, "0x"]
                                          )
                                      ]
                                  )
                                : moduleData
                        }
                    ]
                })

                expect(isHash(opHash)).toBe(true)

                const userOperationReceipt =
                    await smartClient.waitForUserOperationReceipt({
                        hash: opHash,
                        timeout: 100000
                    })
                expect(userOperationReceipt).not.toBeNull()
                expect(userOperationReceipt?.userOpHash).toBe(opHash)
                expect(
                    userOperationReceipt?.receipt.transactionHash
                ).toBeTruthy()

                const receipt = await smartClient.getUserOperationReceipt({
                    hash: opHash
                })

                expect(receipt?.receipt.transactionHash).toBe(
                    userOperationReceipt?.receipt.transactionHash
                )

                const isModuleInstalled = await smartClient.isModuleInstalled({
                    type: "executor",
                    address: "0xc98B026383885F41d9a995f85FC480E9bb8bB891",
                    context: "0x"
                })

                expect(isModuleInstalled).toBe(true)
            }
        )
    }
)
