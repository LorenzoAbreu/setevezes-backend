module.exports = {
    invalid_apikey: {
        status: 403,
        error: "ApiKey inválida!"
    },
    user_not_found: {
        status: 403,
        error: "Usuário não encontrado!"
    },
    user_not_approved: {
        status: 403,
        error: "Sua conta ainda não foi aprovada por um administrador."
    },
    server_error: {
        status: 500,
        error: "Erro no servidor!"
    },
    invalid_token: {
        status: 403,
        error: "Token inválido."
    },
    token_not_found: {
        status: 403,
        error: "Token não fornecido."
    },
    user_have_not_permission: {
        status: 403,
        error: "Você não tem permissão para fazer isso."
    },
    fill_all_fields: {
        status: 401,
        error: "Preencha todos os campos!"
    },
    user_already_been_used: {
        status: 422,
        error: "Usuário já existente!"
    },
    email_already_been_used: {
        status: 422,
        error: "Já existe uma conta com este email!"
    },
    invalid_email: {
        status: 401,
        error: "Email inválido."
    },
    invalid_login_data: {
        status: 403,
        error: "Usuário e/ou senha inválidos."
    },
    url_already_been_created: {
        status: 422,
        error: "Já existe um site com esta URL!"
    },
    sitename_already_been_used_by_you: {
        status: 422,
        error: "Já existe um site seu utilizando este nome!"
    }
}