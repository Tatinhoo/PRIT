import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

interface Freelancer {
    readonly idFreelancer: number,
    nome: string,
    cpf: number,
    dataNasc: string,
    senha: string,
    email: string
}

let freelancers: Freelancer[] = []
const prisma = new PrismaClient();

export const FreelancerController = {
    async getAll(requisicao: Request, resposta: Response):Promise<any>{
        try{
            const freelancers = await prisma.freelancer.findMany();
            return resposta.json(freelancers);
        } catch (error){
            console.log(error);
            resposta.status(500).json({error: "Erro ao buscar todos os freelancers"})
        }
    },
    async create(requisicao: Request, resposta: Response):Promise<any>{
        try{
            const{
                nome,
                cpf,
                dataNasc,
                email,
                senha
                
            } = requisicao.body
            const cliente = await prisma.freelancer.create({
                data: {
                    nome,
                    cpf,
                    dataNasc,
                    email,
                    senha
                }
            })
            return resposta.json(cliente)
        } catch (error) {
            console.log(error);
            resposta.status(500).json({error: "Erro ao criar o freelancer"})
        }
    }
}