import express from 'express';

const porta = 3000;
const host = '0.0.0.0';

const app = express();

//Indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'
app.use(express.static('./paginas'));

app.get('/', (requisicao, resposta) =>{
    resposta.end(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Menu do sistema</title>
    </head>
    <body>
        <h1>Menu</h1>
        <ul>
            <li><a href="/cadastrarUsuario.html"><button>Cadastrar Usuario</button></a></li>
        </ul>
    </body>
    </html>
    `)
})

app.listen(porta, host, () =>{
    console.log(`Servidor executando na URL http://${host}:${porta}`);
})