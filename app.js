const form = document.querySelector("form");
const eventList = document.querySelector("#event-list");
let events = [];
let registeredAttendees = {};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const eventName = document.querySelector("#event-name").value;
  const eventDate = document.querySelector("#event-date").value;
  const eventLocation = document.querySelector("#event-location").value;

  const newEvent = {
    name: eventName,
    date: eventDate,
    location: eventLocation,
    attendees: []
  };

  events.push(newEvent);
  const eventIndex = events.length - 1;
  const eventHTML = `<li data-index=${eventIndex}>${eventName} - ${eventDate} - ${eventLocation} <button class="register-btn">S'inscrire</button> <button class="attendees-btn">Participants</button></li>`;
  eventList.innerHTML += eventHTML;
});
eventList.addEventListener("click", (event) => {
  if (event.target.classList.contains("register-btn")) {
    const eventIndex = event.target.parentNode.dataset.index;
    const selectedEvent = events[eventIndex];
    const name = prompt("Entrez votre nom s'il vous plait:");
    const firstname = prompt("Entrez votre prénom s'il vous plait:");
    if (!registeredAttendees[name + firstname]) {
      registeredAttendees[name + firstname] = true;
      selectedEvent.attendees.push({name: name, firstname: firstname});
      alert(`Merci, ${name} ${firstname}, pour vous être inscrit pour ${selectedEvent.name}!`);
    } else {
      alert(`Désolé ${name} ${firstname}, vous êtes déjà inscrit à cet événement!`);
    }
  }
  if (event.target.classList.contains("attendees-btn")) {
    const eventIndex = event.target.parentNode.dataset.index;
    const selectedEvent = events[eventIndex];
    if (selectedEvent.attendees.length === 0) {
        alert("Personne n'est encore inscrit!");
    } else {
        let attendeesList = "";
        for (let i = 0; i < selectedEvent.attendees.length; i++) {
            attendeesList += `<tr><td>${selectedEvent.attendees[i].name} ${selectedEvent.attendees[i].firstname}</td></tr>`;
        }
        const attendeesHTML = `<table> <th>Participants</th> ${attendeesList} </table>`;
        event.target.parentNode.innerHTML = attendeesHTML;
    }
  }
});
