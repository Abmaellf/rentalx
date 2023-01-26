**RF** => Requisitos Funcionais
**RNF** => Requisitos Não Funcionais
**RN** => Regra de Negócio


#Cadastro de carros
  **RF**
    Deve ser possível cadastrar um novo carro
   
  **RN**
    Não deve ser possível cadastrar um carro com uma placa já existente.
    O carro deve ser cadastrado por padrão, com disponibilidade
    * O usuário responsável pelo cadastro dever ser um administrador

#Listagem de carro
   
  **RF**
    Deve ser possível listar todos carros disponíveis
    Deve ser possível listar todos carros disponíveis pelo nome da categoria
    Deve ser possível listar todos carros disponíveis pelo nome da marca
    Deve ser possível listar todos carros disponíveis pelo nome do carro

  **RN**
    O usuário não precisa esta logado no sistema

  #Cadastro de specificação no carro

  ***RF**
    Deve ser possível cadastrar uma especificação para um carro
    Deve ser possível listar todas as especificaçãoes
  
  **RN**
    Não deve ser possível cadastrar uma especificação parar um carro não cadastrado
    Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
    O usuário responsável pelo cadastro dever ser um administrador

##Cadastro de imagem do carro

  **RF**
    Deve ser possível cadastrar a imagem do carro
    Deve ser possível listar todos os carros

  **RNF**
    Utilizar o multer para o upload de arquivo

  **RN**
    O usuário deve poder cadastrar mais de uma imagem  para o mesmo carro
    O usuário responsável pelo cadastro deve ser uma administrador


##Aluguel de carroa##

  **RF**
    Deve ser possível cadastrar uma aluguel
  
  **RN**
    O aluguel deve ter duração minima de 24 horas
    Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
    Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
