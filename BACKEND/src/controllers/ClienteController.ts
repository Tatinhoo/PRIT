import { Request, Response } from "express";

interface Cliente {
    readonly id: number
    nome: string
    dataNasc: string
    email: string
    cpf: string,
    senha: string
}

let clientes: Cliente[] = []
let proxId: number = 1

export const ClienteController = {

    async getAll(requesicao: Request, resposta: Response): Promise<any> {
        return resposta.json(clientes)
    },
    async create(requesicao: Request, resposta: Response): Promise<any> {
        const { nome, dataNasc, email, senha, cpf } = requesicao.body

        if (!nome || !dataNasc || !email || !senha || !cpf) {
            return resposta.status(400).json({ error: "Todos os campos são obrigatorios" })

        }
        else {
            const Cliente: Cliente = {
                id: proxId++,
                nome,
                dataNasc,
                email,
                senha,
                cpf
            }
            clientes.push(Cliente)
            return resposta.status(201).json(Cliente)
        }
    },
    async getById(requesicao: Request, resposta: Response): Promise<any> {
           
        try {

        const { id } = requesicao.params
        if (!id) {
            return resposta.status(400).json({ error: "O id é necessario." })
        }
        else {
            let idBusca: number = parseInt(id)
            let ClienteBusca: Cliente | undefined = clientes.find(item => item.id == idBusca)

            if (ClienteBusca) {
                return resposta.status(200).json(ClienteBusca)
            }
            else {
                return resposta.status(400).json({ error: "Não há Cliente com esse id" })
            }
        }
        
    } catch (error) {
              console.log("Houve um erro " + error)   
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

    async delete(requesicao: Request, resposta: Response): Promise<any>{

        try {
            
        
        const {id} = requesicao.params;

        if(!id){
            return resposta.status(400).json({error: "O id é invalido."})
        }

        const idBusca = parseInt(id)
        const indice = clientes.findIndex(Cliente => Cliente.id == idBusca)

        if(indice == -1 || indice == undefined){
            return resposta.status(400).json({error: "O id é invalido."})
        }

        clientes.splice(indice, 1)
        return resposta.status(200).json({mensagem: "Cliente removido com sucesso"})
        } 

        catch (error) {
         console.log("Houve um erro" + error)   
        }
    },

    async getByName(requisicao: Request, resposta: Response): Promise<any>{

        try {
            
            const {nome} = requisicao.params

            if(!nome){
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
    },

    async getByCPF(requisicao: Request, resposta: Response): Promise<any>{

        try {
            
            const {cpf} = requisicao.params

            if(!cpf){
                return resposta.status(400).json({erro: "nome invalido"})
            }

            const clientesEncontrados: Cliente[] = clientes.filter(Cliente => 
                Cliente.cpf.toLocaleUpperCase().includes(cpf.toLocaleUpperCase())
            )

            if(clientesEncontrados.length > 0){
                return resposta.status(200).json(clientesEncontrados)
            }
            else{
                return resposta.status(400).json({error: "Não há clientes com este cpf"})
            }
            } catch (error) {
            
        }
    }
    
}