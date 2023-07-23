class Project {
    constructor(name, description, href) {
        this.name = name
        this.description = description
        this.href = href
    }
}

let projects = [
    new Project(`...this website`, `
    is it really a project though? sure ive spent some hours working on it but in the end its... just an html box
    `, ``),
    new Project(`b9k`, `
    an implementation of robot9000 in the form of a discord bot
    `, `https://github.com/notsuu/b9k`),
    new Project(`OneShot String Randomizer`,`
    randomizes all of OneShot's dialogue for a great new experience! (not)
    `, `https://github.com/notsuu/OneshotStringRandomizer`),
    new Project(`Announcer Game`,`
    the game where you announce stuff or something idk i havent played it
    `, `https://announcer-game.notsudake.repl.co`)
]

let projectIndex = $('#projects')[0]
for (let project of projects) {
    let div = document.createElement('div')
    div.innerHTML = `<a class="innerHeader" href="${project.href}">${project.name}</a><br><a>${project.description}</a>`
    projectIndex.appendChild(div)
}