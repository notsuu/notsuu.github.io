let postSource = 'https://fouadcorp.cyclic.app'

let drag = {
    tvel: [0, 0],
    vel: [0, 0],
    pos: [0, 0],
    f: [0,0],
    fmul: 10,
    lerp_t: 0.02
}
let tabs = []; for (let i of $('.inner')) tabs.push(i.id)
let tabElements = {}
let tabLinks = []
for (let tab of tabs) {
    let elem = $('#'+tab)[0]
    tabElements[tab] = elem
    if (!elem.dataset.hidden) tabLinks.push(`<a class='link' onclick="nav('${tab}')">${elem.dataset.linkoverride || elem.dataset.header}</a>`)
}
$(".links")[0].innerHTML = tabLinks.join(" • ")

marked.use({
    "breaks": true,
    "gfm": true,
    "mangle": false,
    "headerIds": false
})

function nav(tab) {
    if (!tabs.find(t => t == tab)) return;
    for (let t in tabElements) { t == tab ? tabElements[t].classList.remove('hidden') : tabElements[t].classList.add('hidden') }
    $('.pageHeader')[0].innerHTML = tabElements[tab].dataset.header
    $('.pageSubheader')[0].innerHTML = tabElements[tab].dataset.subheader
}

window.addEventListener('mousemove', (event) => {
    if ((event.buttons & 1) == 1) {
        drag.f = [event.movementX*drag.fmul, event.movementY*drag.fmul]
    }
})

var lastUpdate = Date.now();
var update = setInterval(tick, 0);

function lerp (start, end, t) {
    return start * (1 - t) + end * t;
}

function tick() {
    var now = Date.now();
    var dt = now - lastUpdate;
    lastUpdate = now;
    var normalizedDt = dt/1000
    $('#f')[0].innerHTML = `force: ${drag.f[0]}, ${drag.f[1]}`
    drag.vel = [drag.vel[0]+drag.f[0], drag.vel[1]+drag.f[1]]; drag.f=[0,0]
    drag.vel = [lerp(drag.vel[0], drag.tvel[0], drag.lerp_t), lerp(drag.vel[1], drag.tvel[1], drag.lerp_t)]
    drag.pos = [drag.pos[0]+drag.vel[0]*normalizedDt,drag.pos[1]+drag.vel[1]*normalizedDt]
    let style = $('body')[0].style
    style.backgroundPositionX = drag.pos[0]+'px'
    style.backgroundPositionY = drag.pos[1]+'px'
    $('#pos')[0].innerHTML = `position: ${drag.pos[0].toFixed(4)}, ${drag.pos[1].toFixed(4)}`
    $('#vel')[0].innerHTML = `velocity: ${drag.vel[0].toFixed(4)}, ${drag.vel[1].toFixed(4)}`
    drag.tvel = [$('#tvelX')[0].value, $('#tvelY')[0].value]
    drag.fmul = $('#fmul')[0].value
    drag.lerp_t = $('#lerp_t')[0].value
}