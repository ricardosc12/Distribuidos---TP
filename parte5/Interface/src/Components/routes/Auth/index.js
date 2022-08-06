importCss('./src/Components/routes/Auth/cssAuth.css')
let requestType = 'login'

function routeAuth(){
    requestType="login"
    return /*html*/`
        <div class=main-login>
            <div class="box-login" onkeydown='requestInEnter(event)'>
                <div id='page-type-auth' class="page-sinout">
                    ${loginPage()}
                </div>
                <!-- <div class='selector-sinout'>
                     <button onclick='selectType("login")'>LOGAR</button>
  
                    <button onclick='selectType("register")'>CADASTRAR</button>
                </div> -->
                <div class='request-auth'>
                    <button id="button-type" onclick='requestAuth()'>Entrar</button>
                </div>
                <div class="information_status">
                    ${renderInfoRegister()}
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

function renderInfoRegister(){
    return /*html*/`
        <span>Não possui uma conta ?</span>
        <a onclick="selectType('register')">Cadastre-se</a>
    `
}

function renderInfoLogin(){
    return /*html*/`
        <span>Já possui uma conta ?</span>
        <a onclick="selectType('login')">Logar-se</a>
    `
}

function requestAuth(){
    if(requestType=='login'){
        let login = document.getElementById('login-field').value
        let pass = document.getElementById('pass-field').value
        logarUser(login,pass).then(resolve=>{
            // console.log(resolve)
            if(resolve.status){
                console.log(resolve)
                let auth = resolve.dados[0]
                document.getElementById('user_name_profile').innerHTML = auth.name
                $AUTH = auth
                goRoute('cartas')
            }
            else{
                notify(resolve.mensagem || "Não foi possível logar !")
            }
        })
    }
    else {
        let login = document.getElementById('login-field').value
        let pass = document.getElementById('pass-field').value
        let name = document.getElementById('name-field').value
        if(!name || !login || !pass) {
            notify("Preencha todos os campos !")
            return
        }
        createUser(name,login,pass).then(resolve=>{
            // console.log(resolve)
            if(resolve.status){
                $AUTH = {login:login,name:name}
                document.getElementById('user_name_profile').innerHTML = name
                goRoute('cartas')
                notify("Gerando deck inicial...")
            }
            else{
                notify("Não foi possível cadastrar usuário !")
            }
        })
    }
}

function selectType(type){
    let authPage = document.getElementById('page-type-auth')
    if(type=='login'){
        authPage.innerHTML = loginPage()
        requestType='login'
        getClass('information_status').innerHTML = renderInfoRegister()
        getId('button-type').innerHTML = "Entrar"
        return
    }
    authPage.innerHTML = registerPage()
    getClass('information_status').innerHTML = renderInfoLogin()
    getId('button-type').innerHTML = "Cadastrar-se"
    requestType='register'
}

function loginPage(){
    return /*html*/`
        <div class="login-page">
            <label>Login <input oninput="mask$(event)" id='login-field' type="text"></label>
            <label>Senha <input oninput="mask$(event)" id='pass-field' type="text"></label>           
        </div>
`
}

function registerPage(){
    return /*html*/`
        <div class="register-page">
            <label>Nome <input oninput="mask$(event)" id='name-field' type="text"></label>
            <label>Login <input oninput="mask$(event)" id='login-field' type="text"></label>
            <label>Senha <input oninput="mask$(event)" id='pass-field' type="text"></label>         
        </div>
`
}

