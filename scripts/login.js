import { loginRequest } from "./requests.js";

function authentication() {
    const token = localStorage.getItem('@doit:token')

    if (token) {
        window.location.replace('../pages/dashboard.html')
    }
}

function handleLogin() {
    const inputs = document.querySelectorAll('.login__input')
    const button = document.querySelector('.login')
    const loginBody = {}
    let count = 0

    
    button.addEventListener('click', async (event) => {
        
        event.preventDefault()
        inputs.forEach(({ name, value }) => {
            if (value === '') {
                count++
            }
            loginBody[name] = value
        })

        if (count !== 0) {
            return alert('por favor preencha os campos e tente novamente')
        } else {
            const token = await loginRequest(loginBody)

            return token
        }
        
    })
}

handleLogin()
authentication()