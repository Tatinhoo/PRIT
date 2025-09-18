import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

interface Categoria {
    readonly id: number
    nome: string
}


let categorias: Categoria[] = []
const prisma = new PrismaClient();

export const CategoriaController = {
    async getAll(requisicao: Request, resposta: Response):Promise<any>{
        try{
            const categorias = await prisma.categoria.findMany();
            return resposta.json(categorias);
        } catch (error){
            console.log(error);
            resposta.status(500).json({error: "Erro ao buscar todos as categorias"})
        }
    },
    async create(requisicao: Request, resposta: Response):Promise<any>{
        try{
            const{
                nome
            } = requisicao.body
            const cliente = await prisma.categoria.create({
                data: {
                    nome
                }
            })
            return resposta.json(cliente)
        } catch (error) {
            console.log(error);
            resposta.status(500).json({error: "Error ao criar a categoria"})
        }
    },
    async getByNome(requisicao: Request, resposta: Response):Promise<any>{
        try{
            const nomeBusca: string = requisicao.params.nome;
            const resultados: any = await prisma.categoria.findMany({
                where: {
                    nome: {
                        contains: nomeBusca
                    }
                }
            })

            return resposta.json(resultados)
        } catch (error) {
            console.log(error);
            resposta.status(500).json({ error: "Error ao buscar categoria por nome." })
        }
    },
    async update(requisicao: Request, resposta: Response): Promise<any> {
            try {
                const idBuscas: number = parseInt(requisicao.params.id)
                const {
                    nome
                } = requisicao.body

                const categoriaAtualizada = await prisma.categoria.update({
                    where: {
                        idCategoria: idBuscas
                    },
                    data: {
                        nome
                    }
                })

                return resposta.json(categoriaAtualizada);

            } catch (error) {
                console.log(error)
                resposta.status(500).json({ error: "Error ao atualizar a categoria" })
            }
        },
    async delete(requisicao: Request, resposta: Response):Promise<any>{
        try {
            const idBusca: number = parseInt(requisicao.params.id)

            const categoriaDeletada = await prisma.categoria.delete({
                where: {
                    idCategoria: idBusca
                }
            })
            return resposta.json(categoriaDeletada)
        } catch (error) {
            console.log(error);
            resposta.status(500).json({error: "Error ao deletar a categoria"})
        }
    }
}