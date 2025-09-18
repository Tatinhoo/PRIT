import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

interface Cliente {
    readonly idCliente: number
    nome: string
    dataNasc: string
    email: string
    cpf: string
    senha: string
}

let clientes: Cliente[] = []

const prisma = new PrismaClient();

export const ClienteController = {

   async getAll(requisicao: Request, resposta: Response):Promise<any>{
        try {
            const clientes = await prisma.cliente.findMany();
            return resposta.json(clientes);            
        } catch (error) {
            console.log(error)
            resposta.status(500).json({error: "Error ao buscar todos os clientes"})
        }
    },

    async create(requisicao: Request, resposta: Response):Promise<any>{
        try {
            const{
                nome,
                cpf,
                dataNasc,
                email,
                senha,
                avaliacao
             } = requisicao.body
             const cliente = await prisma.cliente.create({
                data: {
                    nome,
                    cpf,
                    dataNasc,
                    email,
                    senha,
                    avaliacao
                }
             })
             return resposta.json(cliente)

        } catch (error) {
            console.log(error)
            resposta.status(500).json({error: "Error ao criar o cliente"})
        }
    },

    async getByNome(requisicao: Request, resposta: Response): Promise<any> {
        try {
            const nomeBusca: string = requisicao.params.nome;

            const resultados: any = await prisma.cliente.findMany({
                where: {
                    nome: {
                        contains: nomeBusca
                    }
                }
            })

            return resposta.json(resultados)
        } catch (error) {
            console.log(error)
            resposta.status(500).json({ error: "Error ao buscar cliente por nome." })
        }
    },

    async update(requesicao: Request, resposta: Response): Promise<any> {
        
        try {
            
        

        const { id } = requesicao.params
        const { nome, dataNasc, email, cpf, senha } = requesicao.body

        if (!id) {
            return resposta.status(400).json({ error: "Não há Cliente com esse id" })
        }
        else {
            const idBusca: number = parseInt(id)
            const ClienteBusca: number | undefined = clientes.findIndex(item => item.idCliente == idBusca)

            if (ClienteBusca == -1 || ClienteBusca == undefined) {
                return resposta.status(400).json({ error: "Id invalido" })
            }
            else {
                clientes[ClienteBusca] = {
                    idCliente: idBusca,
                    nome,
                    dataNasc,
                    email,
                    cpf,
                    senha
                }
                return resposta.status(200).json(clientes[ClienteBusca])
            }
        }
        } catch (error) {
            console.log("Houve um erro " + error)   
        }

    },

     async delete(requisicao: Request, resposta: Response):Promise<any>{
        try {
            const idBusca:number = parseInt(requisicao.params.idCliente)

            const clienteDeletado = await prisma.cliente.delete({
                where: {
                    idCliente: idBusca
                }
            })

            return resposta.json(clienteDeletado)
            
        } catch (error) {
            console.log(error)
            resposta.status(500).json({error: "Error ao deletar o aluno"})
        }
    },

    async getById(requisicao: Request, resposta: Response):Promise<any>{
        try {
            const idBusca:number = parseInt(requisicao.params.idCliente)

            const clienteResultado = await prisma.cliente.findUnique({
                where: {
                    idCliente: idBusca
                }
            })

            return resposta.json(clienteResultado)
            
        } catch (error) {
            console.log(error)
            resposta.status(500).json({error: "Error ao buscar o aluno pelo id"})
        }
    },
   async getByCPF(requisicao: Request, resposta: Response):Promise<any>{
        try {
            const cpfBusca:number =  parseInt(requisicao.params.cpf)

            const clienteResultado = await prisma.cliente.findUnique({
                where: {
                    cpf: cpfBusca
                }
            })

            return resposta.json(clienteResultado)
            
        } catch (error) {
            console.log(error)
            resposta.status(500).json({error: "Error ao buscar o aluno pelo id"})
        }
    },
}
