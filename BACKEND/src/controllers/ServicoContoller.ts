import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface Servico {
    readonly idServico: number

}

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
                idservico,
                descricao,
            } = requisicao.body
            const servico = await prisma.servico.create({
                data: {
                    idservico,
                    descricao
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
            
        

        const { id } = requesicao.params
        const { nome, dataNasc, email, cpf, senha } = requesicao.body

        if (!id) {
            return resposta.status(400).json({ error: "Não há Cliente com esse id" })
        }
        else {
            const idBusca: number = parseInt(id)
            const ClienteBusca: number | undefined = clientes.findIndex(item => item.id == idBusca)

            if (ClienteBusca == -1 || ClienteBusca == undefined) {
                return resposta.status(400).json({ error: "Id invalido" })
            }
            else {
                clientes[ClienteBusca] = {
                    id: idBusca,
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
            const idBusca:number = parseInt(requisicao.params.id)

            const clienteDeletado = await prisma.cliente.delete({
                where: {
                    id: idBusca
                }
            })

            return resposta.json(clienteDeletado)
            
        } catch (error) {
            console.log(error)
            resposta.status(500).json({error: "Error ao deletar o aluno"})
        }
    }
},


    async getByName(requisicao: Request, resposta: Response): Promise<any>{

        try {
            
            const nomeBusca:   string = requisicao.params.nome

            if(nomeBusca!){
                return resposta.status(400).json({erro: "nome invalido"})
            }

            const clientesEncontrados: Cliente[] = clientes.filter(Cliente => 
                Cliente.nome.toLocaleUpperCase().includes(nome.toLocaleUpperCase())
            )
               
            if(clientesEncontrados.length > 0){
                return resposta.status(200).json(clientesEncontrados)
            }
            else{
                return resposta.status(400).json({error: "Não há clientes com este nome"})
            }
            } catch (error) {
                console.log("Houve um erro" + error)   
            
        }
    }
    
}