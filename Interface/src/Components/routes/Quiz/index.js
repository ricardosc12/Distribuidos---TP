importCss('./src/Components/routes/Quiz/quizcss.css')

function routeQuiz(){
    return /*html*/`
    <div class="quiz-list">
        <h3>Qual é o personagem ?</h3>
        ${Card(CARDS[0],'epic')}
        <div class="filter_atom">
            <input type="text" />
        </div>
    </div>
`
}