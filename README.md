**RF** => Requisitos Funcionais
**RNF** => Requisitos Não Funcionais
**RN** => Regra de Negócio


#Cadastro de carros
  **RF**
    Deve ser possível cadastrar um novo carro - FEITO
   
  **RN**
    Não deve ser possível cadastrar um carro com uma placa já existente. FEITO
    O carro deve ser cadastrado por padrão, com disponibilidade FEITO
    * O usuário responsável pelo cadastro dever ser um administrador FEITO

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
    O usuárui deve esta logado na aplicação
    Ao realizar o aluguel, o status do carro deverá  ser alterado para indisponível.

    ##Devolução de carro##

    **RF**
      Deve ser possível realizar a devolução de um carro

    **RN**
      Se o carro for devolvido em menos de 24 horas, deverár ser cobrado a diaria completa
      Ao realizar a devolução o carro deverá ser libarado para outro aluguel.
      Ao realizar a devolução o usuario deverá ser libarado para outro aluguel.
      Ao realizar a devolução, deverá ser calculado o total do aluguel.
      Caso o horário de devoluçã seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional ao dias de atraso.

      Caso haja multa deverá ser somado ao total do aluguel.

      O usuárui deve esta logado na aplicação


      # LISTAGEM DE ALUGUEIS PARA USUARIO #

      ****  RF ****

      Deve saer possível realizar a busca de todos os alugueis para os usuarios

     **** RN ****
      O usuario deve esta logado na aplicação