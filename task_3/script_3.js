import { LastVisit, LastVisitStorage, formatDate, formatTime } from './classes.js';

document.addEventListener('DOMContentLoaded', () => {
    const lastVisit = LastVisitStorage.getLastVisit();
    
    function setClickHandler(selector, handler) {
        document.querySelector(selector).addEventListener('click', handler);
    }

    setClickHandler('#btn-save', act_save);
    setClickHandler('#btn-forget', act_forget);

    showState(lastVisit);
});

function showState(lastVisit) {
    const visitorForm = document.querySelector("#visitor_form");
    const visitorMessage = document.querySelector("#visitor_message");
    const visitorHeader = document.querySelector("#visitor_header");
    const visitorText = document.querySelector("#visitor_text");

    if (!lastVisit.isEmpty()) {
        const dt = lastVisit.getDate();
        visitorHeader.textContent = `Здравствуйте, ${lastVisit.getName()}!`;
        visitorText.textContent = `В последний раз вы были у нас ${formatDate(dt)} г. в ${formatTime(dt)}`;
        
        visitorForm.classList.add('page__content--hidden');
        visitorMessage.classList.remove('page__content--hidden');

        lastVisit.setNow();
        LastVisitStorage.save(lastVisit);
    } else {
        visitorMessage.classList.add('page__content--hidden');
        visitorForm.classList.remove('page__content--hidden');
    }
}

function act_save(event) {
    event.preventDefault();
    const name = document.querySelector("#visitor_name").value.trim() || 'Аноним';
    const lastVisit = LastVisitStorage.getLastVisit();
    
    lastVisit.setVisit(name);
    LastVisitStorage.save(lastVisit);
    showState(lastVisit);
}

function act_forget() {
    const lastVisit = LastVisitStorage.getLastVisit();
    lastVisit.clear();
    LastVisitStorage.save(lastVisit);
    showState(lastVisit);
}
