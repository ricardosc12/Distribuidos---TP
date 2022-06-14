importCss('./src/Components/routes/Usuarios/cssUser.css')

function routeUsuarios(){
    initRouteUser()
    return /*html*/`
        <div class="route-users">
            <div class="route-users-list">

            </div>
            <div class="route-users-filter">
                <div class="search-filter-users">
                    <input oninput="" type="text">
                </div>
            </div>
        </div>
    `
}

function specUser(login){
    let user = $USUARIOS.filter(user=>user.login==login)[0]
    console.log(user)
}


function initRouteUser(){
    setTimeout(() => {
        getUsers().then(resolve=>{
            if(resolve.status){
                console.log(resolve)
                $USUARIOS = resolve.dados
                renderUsers($USUARIOS)
            }
        })
    });
}

function cardUser(user){
    return /*html*/`
        <div onclick="specUser('${user.login}')" class='card-user'>${user.name}</div>
    `
}

function renderUsers(users){
    let inner = ''
    let listUsers = document.getElementsByClassName('route-users-list')[0]
    if(Array.isArray(users)){
        users.forEach(user => {
            inner+=cardUser(user)
        });
        listUsers.innerHTML = inner
    }
}