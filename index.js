import express from 'express';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta){
    // processar os parâmetros da url em http://localhost:3000/cadastrarUsuario.html?nome=Victor&sobrenome=Hugo&nomeUsuario=vitao&cidade=Sao+Paulo&UF=SP&cep=01153-000
    const usuario = {
                        nome: requisicao.query.nome,
                        sobrenome: requisicao.query.sobrenome,
                        nomeUsuario: requisicao.query.nomeUsuario,
                        cidade: requisicao.query.cidade,
                        UF: requisicao.query.UF,
                        cep: requisicao.query.cep
                    }
    //Adiciona um novo usuário na lista de usuários já cadastrados
    listaUsuarios.push(usuario);
    // returnar a lista de usuários
    let conteudoResposta =`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <title>Document</title>
        </head>
        <body>
            <h1>Lista de usuários cadastrados</h1>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Nome Usuário</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>CEP</th>
                    </tr>
                </thead>
                <tbody>`;
                for(const usuario of listaUsuarios){
                    conteudoResposta += `
                        <tr>
                            <td>${usuario.nome}</td>
                            <td>${usuario.sobrenome}</td>
                            <td>${usuario.nomeUsuario}</td>
                            <td>${usuario.cidade}</td>
                            <td>${usuario.UF}</td>
                            <td>${usuario.cep}</td>
                            
                        </tr>
                    `
                }

                conteudoResposta+=`
                </tbody>
            </table>
            <a class="btn btn-primary" href="/" role="button">Voltar para o menu</a>
            <a class="btn btn-primary" href="/cadastrarUsuario.html" role="button">Cadastrar usuario</a>
        </tbody>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </html>
                `;
    resposta.end(conteudoResposta);
}
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
            <li><a href="/cadastrarUsuario.html"><button type="button" class="btn btn-primary">Primary</button></a></li>
        </ul>
    </body>
    </html>
    `)
})

// rota para processar o cadastro de usuários endpoint = '/cadastrarUsuario'

app.get('/cadastrarUsuario', processarCadastroUsuario);

app.listen(porta, host, () =>{
    console.log(`Servidor executando na URL http://${host}:${porta}`);
})