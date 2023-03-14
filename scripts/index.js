import {getAllCompanies, allSectors} from "./requests.js";

async function selectDepartament() {
    const selectDepartament = document.querySelector('#select_empresas')
    const companies = await allSectors()
    companies.forEach(element => {
        const option = document.createElement('option')
        option.classList.add('option')
        option.innerText = element.description
        option.value = element.uuid
        selectDepartament.append(option)
    })

}
selectDepartament()

async function filterDepartament() {
    const selectDepartament = document.querySelector('#select_empresas')
    

    selectDepartament.addEventListener('change', () => {
        renderCompanies(selectDepartament.value)
    })

}
filterDepartament()

async function renderCompanies(filterDepartaments) {
    const ul = document.querySelector('ul')
    ul.innerHTML = ''
    let companies = await getAllCompanies()

    if(filterDepartaments){
        companies = companies.filter(element => element.sectors.uuid === filterDepartaments)
    }

    companies.forEach(element => {
        const li = document.createElement('li')
        const h2 = document.createElement('h2')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')

        li.classList.add('li')

        h2.classList.add('h2')

        h3.classList.add('h3')

        p.classList.add('p')

        h2.innerText = element.name

        h3.innerText = element.opening_hours

        p.innerText = element.sectors.description

        li.append(h2, h3, p)
        ul.append(li)
    })

    return ul
}
renderCompanies()