const token = localStorage.getItem('@doit:token')
const baseUrl = 'http://localhost:6278'
const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
}
// const getToken = localStorage.getItem('@doit:token')


export async function loginRequest(loginBody) {
    const token = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginBody),
    })
    const response = token
    const responseJSON = await response.json()
    if (response.ok) {
        localStorage.setItem('@doit:token', responseJSON.token);

        const validate = await validateUser(responseJSON.token);

        if (validate.is_admin == true) {
            window.location.replace('./admin.html')
        } else {
            window.location.replace('./dashboard.html')
        }

        return responseJSON.token

    } else {
        response.json().then((resError) => console.log
            (resError));
    }

    return token
}

export async function registerRequest(registerBody) {
    const newUser = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(registerBody)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })
    return newUser
}

export async function validateUser(token) {
    const user = await fetch(`${baseUrl}/auth/validate_user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }

    })
    const validate = await user.json()

    return validate

}

export async function loggedInEmployeeInformation() {
    const usuario = await fetch(`${baseUrl}/users/profile`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })

    return usuario
}

export async function updateEmployeeInformation(body) {
    const users = await fetch(`${baseUrl}/users`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify(body)

    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })

    return users
}

export async function editUser(id, body) {
    const edit = await fetch(`${baseUrl}/admin/update_user/${id}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(body)

    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })


    return edit
}

export async function deleteUser(uuid) {
    await fetch(`${baseUrl}/admin/delete_user/${uuid}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            if (response.ok) {
                // response.json()
                //     .then((res) => {res});

            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })


}

export async function getAllDepartments() {
    const empresas = await fetch(`${baseUrl}/departments`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })

    return empresas
}

export async function getAllCompanies() {
    const empresas = await fetch(`${baseUrl}/companies`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })

    return empresas
}

export async function allDepartmentsOfCompany(uuid) {
    const company = await fetch(`${baseUrl}/departments/${uuid}`, {
        method: "GET",
        headers: requestHeaders
    })
        .then(async (response) => {
            if (response.ok) {

                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })

    return company
}

export async function getAllDepartmentsCompanies(departmentid) {
    const empresas = await fetch(`${baseUrl}/departments/${departmentid}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })

    return empresas
}

export async function createDepartament(body) {
    const departments = await fetch(`${baseUrl}/departments`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(body)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })
    return departments
}

export async function hireEmployee(employee) {
    const hire = await fetch(`${baseUrl}/departments/hire`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(employee)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })

    return hire
}

export async function dismissEmployee(id) {
    const employee = await fetch(`${baseUrl}/departments/dismiss/${id}`, {
        method: "PATCH",
        headers: requestHeaders,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })

    return employee
}

export async function editDepartaments(departmentid, data) {
    const edit = await fetch(`${baseUrl}/departments/${departmentid}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })

    return edit
}

export async function deleteDepartaments(uuid) {
    const edit = await fetch(`${baseUrl}/departments/${uuid}`, {
        method: "DELETE",
        headers: requestHeaders,
    })
        .then((response) => {
            if (response.ok) {
                return true
            } else {
                return response.json().then((resError) => console.log
                    (resError));
            }
        })

    return edit
}

export async function getAllUsers() {
    const users = await fetch(`${baseUrl}/users`, {
        method: "GET",
        headers: requestHeaders
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })

    return users
}

export async function usersWithoutDepartments() {
    const usersDepartments = await fetch(`${baseUrl}/admin/out_of_work`, {
        method: "GET",
        headers: requestHeaders,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })

    return usersDepartments
}

export async function allEmployeesInTheSameDepartment() {
    const allEmployees = await fetch(`${baseUrl}/users/departments/coworkers`, {
        method: "GET",
        headers: requestHeaders,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        }).catch(e => console.log(e))

    return allEmployees
}

export async function loggedinEmployeesCompanyDepartments (){
    const loggedin = await fetch(`${baseUrl}/users/departments`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        })

    return loggedin
} 

export async function allSectors(){
    const sectors = await fetch(`${baseUrl}/sectors`, {
        method: "GET",
        headers: requestHeaders,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then((resError) => console.log
                    (resError));
            }
        }).catch(e => console.log(e))

    return sectors
}