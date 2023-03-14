import { updateEmployeeInformation, loggedInEmployeeInformation, allEmployeesInTheSameDepartment, loggedinEmployeesCompanyDepartments } from "./requests.js";


function logout() {
    const button = document.querySelector('.logout')

    button.addEventListener('click', () => {
        localStorage.clear();
        window.location.replace('../index.html')
    })
}

logout()

function renderEditUserModal() {
    const dialogContainer = document.querySelector('#editar_usuario')
    dialogContainer.showModal()
    const botaoFechar = document.createElement('button')
    const divEditarUsuarios = document.createElement('div')
    const cardH4 = document.createElement('h4')
    const cardNome = document.createElement('input')
    const cardEmail = document.createElement('input')
    const cardSenha = document.createElement('input')
    const botaoEditar = document.createElement('button')

    divEditarUsuarios.classList.add('div_editar_usuario')

    cardH4.classList.add('h4')
    cardH4.innerText = 'Editar Perfil'

    cardNome.classList.add('input_nome')
    cardNome.type = 'name'
    cardNome.placeholder = 'Seu nome'

    cardEmail.classList.add('input_email')
    cardEmail.type = 'email'
    cardEmail.placeholder = 'Seu e-mail'

    cardSenha.classList.add('input_senha')
    cardSenha.type = 'password'
    cardSenha.placeholder = 'Sua senha'

    botaoEditar.classList.add('editar_usuario')
    botaoEditar.innerText = 'Editar perfil'
    botaoEditar.addEventListener('click', async () => {

        const data = {
            email: cardEmail.value,
            password: cardSenha.value,
            username: cardNome.value
        }
        updateEmployeeInformation(data)
        window.location.reload()
        dialogContainer.close();
        dialogContainer.innerHTML = ''

    })

    botaoFechar.classList.add('fechar_editar_usuario')
    botaoFechar.innerText = 'X'
    botaoFechar.addEventListener("click", () => {
        dialogContainer.close();
        dialogContainer.innerHTML = ''
    });

    divEditarUsuarios.append(cardH4, cardNome, cardEmail, cardSenha, botaoEditar)
    dialogContainer.append(botaoFechar, divEditarUsuarios)
}

async function renderUserData() {
    const token = localStorage.getItem('@doit:token')
    const user = await loggedInEmployeeInformation(token)
    const editar = document.querySelector('.editar')
    const divDados = document.querySelector('.box_dados')
    const divUsuario = document.querySelector('.box_usuario')
    const nomeUsuario = document.querySelector('.nome_usuario')
    const emailUsuario = document.querySelector('.email')
    const nivelUsuario = document.querySelector('.nivel')
    const trabalhoUsuario = document.querySelector('.trabalho')
    const { username, professional_level, email, kind_of_work } = user

    nomeUsuario.innerText = username

    emailUsuario.innerText = `Email: ${email}`

    nivelUsuario.innerText = professional_level

    if (kind_of_work === null) {
        trabalhoUsuario.innerText = 'Nenhum'
    } else {
        trabalhoUsuario.innerText = kind_of_work
    }

    editar.addEventListener('click', () => {
        renderEditUserModal()
    })

    divDados.append(emailUsuario, nivelUsuario, trabalhoUsuario)
    divUsuario.append(nomeUsuario, divDados, editar)

}
renderUserData()

async function SameDepartment() {
    const todosFuncionarios = await allEmployeesInTheSameDepartment()
    const employeeInformation = await loggedInEmployeeInformation()
    const h3 = document.querySelector('h3')
    const ul = document.querySelector('ul')
    const divTitulo = document.querySelector('.div_titulo')
    const h5 = document.createElement('h5')


    if (todosFuncionarios == 0) {
        h3.innerText = 'Você ainda não foi contratado.'

    } else {
        todosFuncionarios[0].users.forEach(element => {
            h5.classList.add('h5_titulo')
            h5.innerText = `${todosFuncionarios[0].name} - ${todosFuncionarios[0].description}`
            divTitulo.append(h5)
            const li = document.createElement('li')
            const h4 = document.createElement('h4')
            const p = document.createElement('p')

            li.classList.add('li')

            h4.classList.add('h4_nome')

            p.classList.add('p_nivel')

            h4.innerText = element.username

            p.innerText = element.professional_level


            li.append(h4, p)
            ul.append(li)

        });

    }

    return ul
}

SameDepartment()
