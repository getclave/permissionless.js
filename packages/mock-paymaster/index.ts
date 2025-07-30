import cors from "@fastify/cors"
import Fastify from "fastify"
import { defineInstance } from "prool"
import { http, createPublicClient } from "viem"
import { createBundlerClient } from "viem/account-abstraction"
import { deployErc20Token } from "./helpers/erc20-utils"
import { getAnvilWalletClient, getChain } from "./helpers/utils"
import { createRpcHandler } from "./relay"
import { deployPaymasters } from "./singletonPaymasters"

export const paymaster = defineInstance(
    ({
        anvilRpc,
        altoRpc,
        port: _port,
        host: _host = "localhost"
    }: {
        anvilRpc: string
        port: number
        altoRpc: string
        host?: string
    }) => {
        const app = Fastify({})

        return {
            _internal: {},
            host: _host,
            port: _port,
            name: "mock-paymaster",
            start: async ({ port = _port }) => {
                const chain = await getChain(anvilRpc)
                const walletClient = await getAnvilWalletClient({
                    anvilRpc,
                    addressIndex: 1
                })
                const publicClient = createPublicClient({
                    transport: http(anvilRpc),
                    chain
                })
                const bundler = createBundlerClient({
                    chain,
                    transport: http(altoRpc)
                })

                await deployPaymasters({ walletClient, publicClient })
                await deployErc20Token(walletClient, publicClient)

                app.register(cors, {
                    origin: "*",
                    methods: ["POST", "GET", "OPTIONS"]
                })

                const rpcHandler = createRpcHandler({
                    bundler,
                    publicClient,
                    paymasterSigner: walletClient
                })
                app.post("/", {}, rpcHandler)

                app.get("/ping", async (_request, reply) => {
                    return reply.code(200).send({ message: "pong" })
                })

                await app.listen({ host: _host, port })
            },
            stop: async () => {
                app.close()
            }
        }
    }
)
