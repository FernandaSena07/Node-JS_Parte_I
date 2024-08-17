const express = require('express');
const app = express();
const { DadosCadastrais } = require('./banco');

// Rota raiz
app.get('/', function(req, res) {
    res.send("Olá, Mundo!");
});

// Rota para cadastro com parâmetros na URL
app.get('/cadastro/:nome/:sobrenome/:idade', async function(req, res) {
    const { nome, sobrenome, idade } = req.params;

    try {
        const novoCadastro = await DadosCadastrais.create({
            nome: `${nome} ${sobrenome}`,
            endereco: 'Endereço Padrão', // Você pode adicionar mais parâmetros ou pegar do body se precisar
            bairro: 'Bairro Padrão',
            cep: '00000-000',
            cidade: 'Cidade Padrão',
            estado: 'SP',
            observacao: `Idade: ${idade}`
        });
        res.send(`Pessoa cadastrada: ${nome} ${sobrenome}, Idade: ${idade}`);
    } catch (error) {
        res.status(500).send("Erro ao cadastrar pessoa: " + error.message);
    }
});

app.listen(8088, function() {
    console.log("Servidor rodando na porta 8088");
});
