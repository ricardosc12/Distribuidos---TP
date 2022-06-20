let $TIMER_NOTIFY = null

function renderNotify(message){
    return /*html*/`
        <div class="notify-main">${message}</div>
    `
}

function notify(message){
    clearTimeout($TIMER_NOTIFY)
    let ntfy = getClass('notify-main')
    if(ntfy) {
        ntfy.remove()
    }
    document.body.insertAdjacentHTML('beforebegin',renderNotify(message))
    setTimeout(() => {
        getClass('notify-main').classList.add("show")
    });
    $TIMER_NOTIFY = setTimeout(() => {
        getClass('notify-main')?.remove()
    }, 3500);
}