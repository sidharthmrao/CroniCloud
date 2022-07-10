let backups = {};

function component_event(event) {
    let title = event.Name;
    let description = event.Description;
    let time = event.TimeStamp
    let status = event.Status
    let group = event.Category
    let id = event.id
    let element = document.createElement("div")
    element.classList.add("panel")
    element.innerHTML = `
        <h2>${title}</h2>
        <h5>${time}</h5>
        <h5>${description}</h5>
        <h3 style=${(status === "FAILED" || status==="Failed") ? `"color: red;"` : `"color: limegreen;"`}>${status}</h3>
    `
    if (status === "FAILED" || status==="Failed") {
        element.classList.add("panel_error")
    }
    return element;
}

function populate(backups) {
    let container = document.getElementById('event_list');

    container.replaceChildren();

    let sorted_events = [];

    for (let i=0; i<Object.keys(backups).length; i++) {
        let id = Object.keys(backups)[i];
        let event = backups[id];
        event.id = id;
        sorted_events.push(event);
    }

    sorted_events = sorted_events.reverse();

    for (let i = 0; i < sorted_events.length; i++) {
        let element = component_event(sorted_events[i]);
        container.appendChild(element);
    }
}

function start() {
    fetch("../data/backup.json")
        .then(response => response.json())
        .then(json=>{
            backups = json;
            populate(backups);
        });
}

function expand(id) {
    let element = document.getElementById(id);
    if (element.selectionStart > 0) {
        element.style.marginRight = -1.5 - (44 - element.selectionStart) + "ch";
    } else {
        element.style.marginRight = -1.5 - 44 + "ch";
    }

    update(element.value);
}

function update(text) {
    let sorted_backups = [];
    for (let i=0; i<Object.keys(backups).length; i++) {
        let id = Object.keys(backups)[i];
        let backup = backups[id];
        backup.id = id;
        if (backup.Description.includes(text) || backup.Name.includes(text) || backup.Status.includes(text) || backup.Category.includes(text) || backup.TimeStamp.includes(text) || backup.id.includes(text)) {
            sorted_backups.push(backup);
        }
    }
    populate(sorted_backups);
}