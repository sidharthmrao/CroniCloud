let events = [{
    title: "asdf",
    description: "this is a description",
    time: "Jan 4th 6:00 PM UTC",
    status: "SUCCESSFUL",
    id: 1
}, {title: "cron", description: "this is another description", time: "Jan 3rd 7:00 PM UTC", status: "FAILED", id: 0}

]


function component_event(event) {
    let title = event.title;
    let description = event.description;
    let time = event.time
    let status = event.status
    let element = document.createElement("div")
    element.classList.add("panel")
    element.innerHTML = `
        <h2>${title}</h2>
        <h5>${time}</h5>
        <h3>${description}</h3>
        <h3 style=${(status === "FAILED") ? `"color: red;"` : `"color: limegreen;"`}>${status}</h3>
    `
    return element;
}


function start() {
    let container = document.getElementById('event_list');
    let sorted_events = events.sort(function (a, b) {
        return b.id - a.id
    })
    for (let i = 0; i < sorted_events.length; i++) {
        let element = component_event(sorted_events[i]);
        container.appendChild(element);
        console.log(element)
    }
}

function populate(box_count) {
    for (let i = 0; i < box_count; i++) {
        console.log(i)
    }
}

populate(5);

function expand(id) {
    let element = document.getElementById(id);
    console.log(element)
    console.log(element.selectionStart);
    if (element.selectionStart > 0) {
        element.style.marginRight = -1.5 - (44 - element.selectionStart) + "ch";
    } else {
        element.style.marginRight = -1.5 - 44 + "ch";
    }
}