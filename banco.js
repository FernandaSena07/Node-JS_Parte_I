require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function(){
    console.log('Conectado com sucesso!');
}).catch(function(erro){
    console.log('Falha ao se conectar: ' + erro);
});

const DadosCadastrais = sequelize.define('dados_cadastrais', {
    nome: {
        type: Sequelize.STRING
    },
    endereco: {
        type: Sequelize.STRING
    },
    bairro: {
        type: Sequelize.STRING
    },
    cep: {
        type: Sequelize.STRING
    },
    cidade: {
        type: Sequelize.STRING
    },
    estado: {
        type: Sequelize.STRING
    },
    observacao: {
        type: Sequelize.TEXT
    }
});

// Sincronizar o modelo com o banco de dados
DadosCadastrais.sync({ force: true }).then(() => {
    console.log('Tabela DadosCadastrais criada com sucesso!');
    
    // Realizando três cadastros iniciais
    return DadosCadastrais.bulkCreate([
        {
            nome: 'João Silva',
            endereco: 'Rua A, 123',
            bairro: 'Centro',
            cep: '12345-678',
            cidade: 'São Paulo',
            estado: 'SP',
            observacao: 'Nenhuma observação'
        },
        {
            nome: 'Maria Souza',
            endereco: 'Rua B, 456',
            bairro: 'Vila Nova',
            cep: '23456-789',
            cidade: 'Rio de Janeiro',
            estado: 'RJ',
            observacao: 'Cliente prefere contato por e-mail'
        },
        {
            nome: 'Carlos Lima',
            endereco: 'Rua C, 789',
            bairro: 'Jardim das Flores',
            cep: '34567-890',
            cidade: 'Belo Horizonte',
            estado: 'MG',
            observacao: 'Entregar durante a tarde'
        }
    ]);
}).then(() => {
    console.log('Três registros de Dados Cadastrais cadastrados com sucesso');
}).catch((error) => {
    console.error('Erro ao criar tabela ou inserir registros:', error);
});

module.exports = { DadosCadastrais };
