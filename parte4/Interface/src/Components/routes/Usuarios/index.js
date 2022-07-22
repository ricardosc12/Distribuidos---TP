importCss('./src/Components/routes/Usuarios/cssUser.css')

function routeUsuarios(){
    initRouteUser()
    return /*html*/`
        <div class="route-users">
            <div class="route-users-list">

            </div>
            <div class="route-users-filter">
                <div class="search-filter-users">
                    <!-- <input oninput="" type="text"> -->
                </div>
            </div>
        </div>
    `
}

function specUser(login){
    let user = $USUARIOS.filter(user=>user.login==login)[0]
    // console.log(user)
    openModalProposta(user)
}


function initRouteUser(){
    setTimeout(() => {
        getUsers().then(resolve=>{
            if(resolve.status){
                console.log(resolve)
                $USUARIOS = resolve.dados
                renderUsers($USUARIOS)
            }
            else{
                notify("Não foi possível carregar usuários")
            }
        })
        // renderUsers($USUARIOS)
    });
}

function cardUser(user){
    return /*html*/`
        <div onclick="specUser('${user.login}')" class='card-user'>
            <div class="icon_person">
                <img width="30px" height="30px" src="${$PATH}/assets/images/person.png" alt="">
            </div>
            <p>${user.name}</p>
        </div>
    `
}

function renderUsers(users){
    let inner = ''
    let listUsers = document.getElementsByClassName('route-users-list')[0]
    if(Array.isArray(users)){
        users.forEach(user => {
            if(user.login!=$AUTH.login)
            inner+=cardUser(user)
        });
        listUsers.innerHTML = inner
    }
}