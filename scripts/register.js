import { registerRequest } from "../scripts/requests.js";

function authentication() {
    const token = localStorage.getItem('@doit:token')

    if (token) {
        window.location.replace('../pages/dashboard.html')
    }
}


function handleRegister() {
    const inputs = document.querySelectorAll('.signup__input');
    const select = document.querySelector('select')
    const button = document.querySelector('.botao_cadastrar');
    const registerBody = {}
    let emptyInput = 0

    button.addEventListener('click', async (event) => {
        event.preventDefault()

        inputs.forEach(({ name, value }) => {
            if (value === '') {
                emptyInput++
            }

            registerBody[name] = value
        })

        if (select.value === '') emptyInput++

        registerBody.professional_level = select.value

        if (emptyInput !== 0) {
            return alert('por favor preencha todos os campos necessários para realizar o cadastro')
        } else {
            const newUser = await registerRequest(registerBody)

            if(newUser){
                window.location.replace('./login.html')
            }

        }

    })
}

handleRegister()
authentication()
