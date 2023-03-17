import { getAllDepartments, getAllUsers, getAllCompanies, allDepartmentsOfCompany, dismissEmployee, hireEmployee, allEmployeesInTheSameDepartment, createDepartament, editDepartaments, deleteDepartaments, editUser, deleteUser, usersWithoutDepartments } from "./requests.js";

const usuariosSemTrabalho = await usersWithoutDepartments()

function logout() {
    const button = document.querySelector('.logout')

    button.addEventListener('click', () => {
        localStorage.clear();
        window.location.replace('../index.html')
    })
}

logout()

const botaoCriar = document.querySelector('.criar')
botaoCriar.addEventListener('click', () => {
    createDepartamentModal()
})

async function renderDepartments(filterDepartaments) {
    const ul = document.querySelector('.lista_departamentos')
    ul.innerHTML = ''
    let departments = await getAllDepartments()

    if (filterDepartaments) {
        departments = departments.filter(element => element.companies.uuid === filterDepartaments)
    }
    departments.forEach(element => {
        const cardLi = document.createElement('li')
        const cardH4 = document.createElement('h4')
        const cardDescricao = document.createElement('p')
        const cardP = document.createElement('p')
        const divBotoes = document.createElement('div')
        const cardExibir = document.createElement('img')
        const cardEditar = document.createElement('img')
        const cardExcluir = document.createElement('img')

        cardLi.classList.add('li')

        cardH4.classList.add('h4')
        cardH4.innerText = element.name

        cardDescricao.classList.add('p')
        cardDescricao.innerText = element.description

        cardP.classList.add('p')
        cardP.innerText = element.companies.name

        divBotoes.classList.add('box_departamentos')

        cardExibir.classList.add('exibir')
        cardExibir.src = '../assets/exibir.png'
        cardExibir.alt = 'Icone de exibir'
        cardExibir.dataset.id = element.uuid
        cardExibir.addEventListener('click', () => {
            showDepartamentModal(element.name, element.description, element.companies.name, element.uuid)

        })

        cardEditar.classList.add('editar')
        cardEditar.src = '../assets/editar.png'
        cardEditar.alt = 'Icone de editar'
        cardEditar.addEventListener('click', () => {
            editDepartamentModal(element.uuid)

        })

        cardExcluir.classList.add('excluir')
        cardExcluir.src = '../assets/excluir.png'
        cardExcluir.alt = 'Icone de excluir'
        cardExcluir.name = element.name
        cardExcluir.dataset.id = element.uuid
        cardExcluir.addEventListener('click', (event) => {
            deleteDepartmentModal(element)
        })

        divBotoes.append(cardExibir, cardEditar, cardExcluir)
        cardLi.append(cardH4, cardDescricao, cardP, divBotoes)
        ul.append(cardLi)
    });

    return ul

}
await renderDepartments()

async function renderUsers() {
    const registeredUsers = await getAllUsers()
    const ul = document.querySelector('.lista_usuarios')


    ul.innerHTML = ''
    registeredUsers.filter(element => element.username !== 'ADMIN').forEach(element => {
        const cardLi = document.createElement('li')
        const cardH4 = document.createElement('h4')
        const cardDescricao = document.createElement('p')
        const cardP = document.createElement('p')
        const divBotoes = document.createElement('div')
        const cardEditar = document.createElement('img')
        const cardExcluir = document.createElement('img')

        const id = element.uuid

        cardLi.classList.add('li')

        cardH4.classList.add('h4')
        cardH4.innerText = element.username

        cardDescricao.classList.add('p')
        cardDescricao.innerText = element.professional_level

        cardP.classList.add('p')
        cardP.innerText = element.kind_of_work

        divBotoes.classList.add('box_usuarios')

        cardEditar.classList.add('editar')
        cardEditar.src = '../assets/editar.png'
        cardEditar.alt = 'Icone de editar'
        cardEditar.addEventListener('click', () => {
            editUsersModal(id)
        })

        cardExcluir.classList.add('excluir')
        cardExcluir.src = '../assets/excluir.png'
        cardExcluir.alt = 'Icone de excluir'
        cardExcluir.name = element.username
        cardExcluir.dataset.id = element.uuid
        cardExcluir.addEventListener('click', (event) => {
            deleteUsersModal(element)
        })

        divBotoes.append(cardEditar, cardExcluir)
        cardLi.append(cardH4, cardDescricao, cardP, divBotoes)
        ul.append(cardLi)

    });
    return ul

}
await renderUsers()

async function selectDepartament() {
    const selectDepartament = document.querySelector('#empresa_departamento')
    const companies = await allDepartmentsOfCompany('')

    companies.forEach(element => {
        const option = document.createElement('option')
        option.classList.add('option')
        option.innerText = element.companies.name
        option.value = element.companies.uuid
        selectDepartament.append(option)
    })

}
selectDepartament()

async function filterDepartament() {
    const selectDepartament = document.querySelector('#empresa_departamento')

    selectDepartament.addEventListener('change', () => {
        renderDepartments(selectDepartament.value)
    })

}
filterDepartament()

async function createDepartamentModal() {
    const empresas = await getAllCompanies()
    const dialogContainer = document.querySelector('#criar_departamento')
    dialogContainer.showModal()
    const botaoFechar = document.createElement('button')
    const divModal = document.createElement('div')
    const cardH1 = document.createElement('h1')
    const cardDepartamento = document.createElement('input')
    const cardDescricao = document.createElement('input')
    const cardSelect = document.createElement('select')
    const selecionarEmpresa = document.createElement('option')
    const botaoCriarDepartamento = document.createElement('button')
    const body = {}

    divModal.classList.add('div_criar')

    cardH1.classList.add('h1_criar')
    cardH1.innerText = 'Criar Departamento'

    cardDepartamento.classList.add('input_nome')
    cardDepartamento.type = 'text'
    cardDepartamento.placeholder = 'Nome do departamento'

    cardDescricao.classList.add('input_descricao')
    cardDescricao.type = 'text'
    cardDescricao.placeholder = 'Descrição'

    cardSelect.append(selecionarEmpresa)
    selecionarEmpresa.innerText = 'Selecionar empresa'
    selecionarEmpresa.disabled = true


    empresas.forEach(element => {
        const option = document.createElement('option')
        option.classList.add('option_empresas')
        option.innerText = element.name
        option.id = element.uuid
        cardSelect.append(option)
    })
    cardSelect.classList.add('select_criar')

    botaoCriarDepartamento.classList.add('criar_departamento')
    botaoCriarDepartamento.innerText = "Criar o departamento"
    botaoCriarDepartamento.addEventListener('click', async () => {
        body.name = cardDepartamento.value
        body.description = cardDescricao.value
        body.company_uuid = cardSelect.options[cardSelect.options.selectedIndex].id
        await createDepartament(body)
        await renderDepartments()
        dialogContainer.close();
        dialogContainer.innerHTML = ''
    })

    botaoFechar.classList.add('fechar_criar')
    botaoFechar.innerText = 'X'
    botaoFechar.addEventListener("click", () => {
        dialogContainer.close();
        dialogContainer.innerHTML = ''
    });


    divModal.append(cardH1, cardDepartamento, cardDescricao, cardSelect, botaoCriarDepartamento)
    dialogContainer.append(botaoFechar, divModal)

}

async function showDepartamentModal(name, description, companies, uuid) {

    const dialogContainer = document.querySelector('#exibir_departamento')
    dialogContainer.showModal()
    const ul = await renderAllEmployeesInTheSameDepartment(uuid, companies)
    const botaoFechar = document.createElement('button')
    const cardH1 = document.createElement('h1')
    const cardH2 = document.createElement('h2')
    const cardP = document.createElement('p')
    const cardSelect = document.createElement('select')
    const selecionarUsuário = document.createElement('option')
    const botaoContratar = document.createElement('button')

    cardH1.classList.add('h1_departamento')
    cardH1.innerText = name

    cardH2.classList.add('h2_descricao')
    cardH2.innerText = description

    cardP.classList.add('p_empresa')
    cardP.innerText = companies

    cardSelect.classList.add('usuarios_sem_trabalho')
    cardSelect.append(selecionarUsuário)
    cardSelect.name = 'user_uuid'

    selecionarUsuário.innerText = 'Selecionar usuário'
    selecionarUsuário.disabled = true

    usuariosSemTrabalho.forEach(element => {
        const usuarios = document.createElement('option')
        usuarios.classList.add('option')
        usuarios.innerText = element.username
        usuarios.value = element.uuid
        cardSelect.append(usuarios)
    });

    botaoContratar.classList.add('contratar')
    botaoContratar.innerText = "Contratar"
    botaoContratar.addEventListener('click', async () => {
        const data = {
            user_uuid: cardSelect.value,
            department_uuid: uuid
        }
        const usuario = await hireEmployee(data)
        window.location.reload()
        dialogContainer.close();
        dialogContainer.innerHTML = ''
    })

    botaoFechar.classList.add('fechar_exibir')
    botaoFechar.innerText = 'X'
    botaoFechar.addEventListener("click", () => {
        dialogContainer.close();
        dialogContainer.innerHTML = ''
    });


    dialogContainer.append(botaoFechar, cardH1, cardH2, cardP, cardSelect, botaoContratar, ul)

}

function editDepartamentModal(id) {
    const dialogContainer = document.querySelector('#editar_departamento')
    dialogContainer.showModal()
    const botaoFechar = document.createElement('button')
    const divModal = document.createElement('div')
    const cardH1 = document.createElement('h5')
    const cardDescricao = document.createElement('input')
    const botaoSalvarDepartamento = document.createElement('button')
    const body = {}

    divModal.classList.add('div_modal')

    cardH1.classList.add('h5_editar')
    cardH1.innerText = 'Editar Departamento'

    cardDescricao.classList.add('editar_input')
    cardDescricao.type = 'text'
    cardDescricao.placeholder = 'Valores anteriores da descrição'

    botaoSalvarDepartamento.classList.add('salvar_departamento')
    botaoSalvarDepartamento.innerText = "Salvar alterações"
    botaoSalvarDepartamento.addEventListener('click', async () => {
        body.description = cardDescricao.value
        await editDepartaments(id, body)
        await renderDepartments()
        dialogContainer.close();

    })

    botaoFechar.classList.add('fechar_editar')
    botaoFechar.innerText = 'X'
    botaoFechar.addEventListener("click", () => {
        dialogContainer.close();
        dialogContainer.innerHTML = ''
    });

    divModal.append(cardH1, cardDescricao, botaoSalvarDepartamento)
    dialogContainer.append(botaoFechar, divModal)
}

function deleteDepartmentModal({ name, uuid }) {
    const dialogContainer = document.querySelector('#excluir_departamento')
    dialogContainer.showModal()
    const botaoFechar = document.createElement('button')
    const cardH1 = document.createElement('h5')
    const botaoConfirmar = document.createElement('button')

    cardH1.classList.add('h5_deletar')
    cardH1.innerText = `Realmente deseja deletar o ${name} e demitir seus funcionários?`

    botaoFechar.classList.add('fechar_excluir')
    botaoFechar.innerText = 'X'
    botaoFechar.addEventListener("click", () => {
        dialogContainer.close();
        dialogContainer.innerHTML = ''
    });

    botaoConfirmar.classList.add('confirmar_deletar')
    botaoConfirmar.innerText = 'Confirmar'
    botaoConfirmar.addEventListener('click', async () => {
        await deleteDepartaments(uuid)
        await renderDepartments()
        dialogContainer.innerHTML = ''
        dialogContainer.close();

    })

    dialogContainer.append(botaoFechar, cardH1, botaoConfirmar)

}

function editUsersModal(id) {
    const dialogContainer = document.querySelector('#editar_usuario')
    dialogContainer.showModal()
    const botaoFechar = document.createElement('button')
    const divEditarUsuarios = document.createElement('div')
    const cardH1 = document.createElement('h1')
    const cardModalidade = document.createElement('select')
    const selecionar = document.createElement('option')
    const nivel = document.createElement('option')
    const estagio = document.createElement('option')
    const junior = document.createElement('option')
    const pleno = document.createElement('option')
    const senior = document.createElement('option')
    const cardNivel = document.createElement('select')
    const presencial = document.createElement('option')
    const homeoffice = document.createElement('option')
    const hibrido = document.createElement('option')
    const botaoEditar = document.createElement('button')
    const body = {}

    divEditarUsuarios.classList.add('div_Editar_Usuarios')

    cardH1.classList.add('h1')
    cardH1.innerText = 'Editar Usuário'

    cardModalidade.classList.add('select_modalidade')

    cardNivel.classList.add('select_nivel')

    selecionar.classList.add('option')
    selecionar.innerText = 'Selecionar modalidade de trabalho'

    nivel.classList.add('option')
    nivel.innerText = 'Selecionar nível profissional'

    estagio.classList.add('option')
    estagio.innerText = 'Estágio'
    estagio.value = 'estágio'

    junior.classList.add('option')
    junior.innerText = 'Júnior'
    junior.value = 'júnior'

    pleno.classList.add('option')
    pleno.innerText = 'Pleno'
    pleno.value = 'pleno'

    senior.classList.add('option')
    senior.innerText = 'Sênior'
    senior.value = 'sênior'

    presencial.classList.add('option')
    presencial.innerText = 'Presencial'
    presencial.value = 'presencial'

    homeoffice.classList.add('option')
    homeoffice.innerText = 'Home Office'
    homeoffice.value = 'home office'

    hibrido.classList.add('option')
    hibrido.innerText = 'Hibrído'
    hibrido.value = 'hibrido'

    botaoEditar.classList.add('editar_usuario')
    botaoEditar.innerText = 'Editar'
    botaoEditar.addEventListener('click', async () => {
        renderUsers(id)
        body.kind_of_work = cardModalidade.value
        body.professional_level = cardNivel.value
        await editUser(id, body)
        window.location.reload();
        dialogContainer.close();
        dialogContainer.innerHTML = ''
    })

    botaoFechar.classList.add('fechar_editar_user')
    botaoFechar.innerText = 'X'
    botaoFechar.addEventListener("click", () => {
        dialogContainer.close();
        dialogContainer.innerHTML = ''
    });


    cardNivel.append(nivel, estagio, junior, pleno, senior)
    cardModalidade.append(selecionar, presencial, homeoffice, hibrido)
    divEditarUsuarios.append(cardH1, cardModalidade, cardNivel, botaoEditar)
    dialogContainer.append(botaoFechar, divEditarUsuarios)
}

function deleteUsersModal({ username, uuid }) {
    const dialogContainer = document.querySelector('#excluir_usuario')
    dialogContainer.showModal()
    const botaoFechar = document.createElement('button')
    const divUser = document.createElement('div')
    const cardH1 = document.createElement('h1')
    const botaoDeletar = document.createElement('button')

    divUser.classList.add('div_usuario_excluir')

    cardH1.classList.add('h1_remover')
    cardH1.innerText = `Realmente deseja remover o usuário ${username}?`

    botaoFechar.classList.add('fechar_usuario')
    botaoFechar.innerText = 'X'
    botaoFechar.addEventListener("click", () => {
        dialogContainer.close();
        dialogContainer.innerHTML = ''
    });

    botaoDeletar.classList.add('deletar_departamento')
    botaoDeletar.innerText = 'Deletar'
    botaoDeletar.addEventListener('click', async () => {
        await deleteUser(uuid)
        await renderUsers()
        dialogContainer.innerHTML = ''
        dialogContainer.close();

    })

    divUser.append(cardH1, botaoDeletar)
    dialogContainer.append(botaoFechar, divUser)
}

async function renderAllEmployeesInTheSameDepartment(uuid, companies) {
    let employee = await getAllUsers()
    employee = employee.filter(element => element.department_uuid === uuid)

    const ul = document.createElement('ul')
    const div = document.createElement('div')
    if (employee.length) {
        employee.forEach(element => {
            const li = document.createElement('li')
            const h4 = document.createElement('h4')
            const nivel = document.createElement('p')
            const compania = document.createElement('p')
            const button = document.createElement('button')

            ul.classList.add('ul_contratados')

            div.classList.add('box_contratados')

            li.classList.add('li_usuario')

            h4.classList.add('h4_usuario')
            h4.innerText = element.username

            nivel.classList.add('nivel_usuario')
            nivel.innerText = element.professional_level

            compania.classList.add('compania_usuario')
            compania.innerText = companies

            button.classList.add('botao_desligar')
            button.innerText = 'Desligar'
            button.addEventListener('click', () => {
                dismissEmployeeModal(element.uuid)
                window.location.reload()
            })


            li.append(h4, nivel, compania, button)
            ul.append(li)
            div.appendChild(ul)
        })
    }


    return div
}

async function dismissEmployeeModal(id) {
    const dismiss = await dismissEmployee(id)
}
