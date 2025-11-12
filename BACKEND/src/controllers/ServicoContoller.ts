import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const servicoController = {

   async getAll(requisicao: Request, resposta: Response):Promise<any>{
        try {
            const servicos = await prisma.servico.findMany()
            return resposta.json(servicos);            
        } catch (error) {
            console.log(error)
            resposta.status(500).json({error: "Error ao buscar todos os servicos"})
        }
    },

    async create(requisicao: Request, resposta: Response):Promise<any>{
        try {
            const{
                idServico,
                descricao,
                freelancer_idFreelancer,
                categoria_idCategoria
            } = requisicao.body
            const servico = await prisma.servico.create({
                data: {
                    idServico,
                    descricao,
                    freelancer_idFreelancer,
                    categoria_idCategoria
                }
             })
             return resposta.json(servico)

        } catch (error) {
            console.log(error)
            resposta.status(500).json({error: "Error ao criar o servico"})
        }
    },

    async update(requesicao: Request, resposta: Response): Promise<any> {
        
        try {
            const { idServico } = requesicao.params
            const { descricao, categoria, freelancer, freelancer_idFreelancer, categoria_idCategoria } = requesicao.body
            const servicoBusca = prisma.servico.update({
                where: {
                    idServico: parseInt(idServico),
                },
                data: {
                    descricao,
                    categoria,
                    freelancer,
                    freelancer_idFreelancer,
                    categoria_idCategoria
                }
            })
            
        } catch (error) {
            console.log("Houve um erro " + error)   
        }

    },

     async delete(requisicao: Request, resposta: Response):Promise<any>{
        try {
            const idBusca:number = parseInt(requisicao.params.idServico)

            const servicoDeletado = await prisma.servico.delete({
                where: {
                    idServico: idBusca
                }
            })

            return resposta.json(servicoDeletado)
            
        } catch (error) {
            console.log(error)
            resposta.status(500).json({error: "Error ao deletar o aluno"})
        }
    }
}
