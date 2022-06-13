importCss('./src/Components/routes/Auth/cssAuth.css')
let requestType = 'login'

function routeAuth(){
    return /*html*/`
        <div class=main-login>
            <div class="box-login" onkeydown='requestInEnter(event)'>
                <div id='page-type-auth' class="page-sinout">
                    ${loginPage()}
                </div>
                <div class='selector-sinout'>
                    <button onclick='selectType("login")'>LOGAR</button>
                    <button onclick='selectType("register")'>CADASTRAR</button>
                </div>
                <div class='request-auth'>
                    <button onclick='requestAuth()'>REQUEST</button>
                </div>
            </div>
        </div>
    `
}

function requestInEnter(e){
    if(e.key == 'Enter'){
        requestAuth()
    }
}

function requestAuth(){
    if(requestType=='login'){
        let login = document.getElementById('login-field').value
        let pass = document.getElementById('pass-field').value
        console.log(login,pass)
    }
    else {
        let login = document.getElementById('login-field').value
        let pass = document.getElementById('pass-field').value
        let name = document.getElementById('name-field').value
        // console.log(login,pass,name)
        createUser(name,login,pass)
    }
}

function selectType(type){
    let authPage = document.getElementById('page-type-auth')
    if(type=='login'){
        authPage.innerHTML = loginPage()
        requestType='login'
        return
    }
    authPage.innerHTML = registerPage()
    requestType='register'
}

function loginPage(){
    return /*html*/`
        <div class="login-page">
            <label>Login: <input id='login-field' type="text"></label>
            <label>Senha: <input id='pass-field' type="text"></label>           
        </div>
`
}

function registerPage(){
    return /*html*/`
        <div class="register-page">
            <label>Nome: <input id='name-field' type="text"></label>
            <label>Login: <input id='login-field' type="text"></label>
            <label>Senha: <input id='pass-field' type="text"></label>         
        </div>
`
}