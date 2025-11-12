import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

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

            
        const idCliente = requesicao.params.id
        const { nome, dataNasc, email, cpf, senha } = requesicao.body
        console.log(idCliente);
        const clienteBusca = await prisma.cliente.update({
            where: {
                idCliente: parseInt(idCliente),
            },
            data: {
                nome,
                dataNasc,
                email,
                cpf,
                senha
            }
        })
        return resposta.status(200).json(clienteBusca)

        } catch (error) {
            console.log("Houve um erro " + error)   
        }

    },

    async delete(requisicao: Request, resposta: Response): Promise<any> {
        try {
            const idCliente = requisicao.params.id; // Ensure you're using the correct id field name
            const idBusca: number = parseInt(idCliente); // Ensure it's a valid number
            console.log(idBusca)

            const clienteDeletado = await prisma.cliente.delete({
                where: {
                    idCliente: idBusca // Use idCliente to match your Prisma schema
                }
            });

            return resposta.json(clienteDeletado);
        } catch (error) {
            console.log(error);
            resposta.status(500).json({ error: "Error ao deletar o cliente" });
        }
    },

    async getById(requisicao: Request, resposta: Response):Promise<any>{
        try {
            const idCliente = requisicao.params.id
            const idBusca: number = parseInt(idCliente);

            const clienteResultado = await prisma.cliente.findUnique({
                where: {
                    idCliente: idBusca
                }
            })

            return resposta.json(clienteResultado)
            
        } catch (error) {
            console.log(error)
            resposta.status(500).json(error)
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
