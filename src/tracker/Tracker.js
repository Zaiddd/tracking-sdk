// Envoi des données à la base MongoDB à chaque action
export function sendEvent({tag, type, element, appId, createdAt, content}) {
    fetch("http://localhost:3000/kpi", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "App-Id": appId,
        },
        body: JSON.stringify({
            tag: tag,
            event: type,
            id_visitor: getVisitorId(),
            id_visit: getVisitId(),
            content: content,
            createdAt: createdAt
        }),
    }).then((r) => {
        console.log(
            "New KPI DATA Saved : TAG '" + tag + "', EVENT '" + type + "'."
        );
    });
}

export function saveUniqueUser(id_visitor) {
    fetch("http://localhost:3000/visitor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_visitor: id_visitor,
            createdAt: new Date()
        }),
    });
}

export function saveVisit(id_visit) {
    fetch("http://localhost:3000/visit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_visit: id_visit,
            createdAt: new Date()
        }),
    });
}

export function saveDurationTime(id_visit, id_visitor, totalSeconds) {
    fetch("http://localhost:3000/time", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_visit: id_visit,
            id_visitor: id_visit,
            seconds: totalSeconds,
            page: window.location.href,
            createdAt: new Date()
        }),
    });
}

export const trackElement = (appId, el, tag, type) => {
    const handleEvent = () => {
        sendEvent({
            tag: tag,
            type: type,
            element: el,
            appId: appId
        });
    };
    el.addEventListener(type, handleEvent);
    return () => {
        el.removeEventListener(type, handleEvent);
    };
};

// Liste des évènements
const eventListeners = {};
let startTime = null;
let endTime = null;

export default {
    install(app, options) {
        const {AppId} = options;
        let currentEventType = "";

        // Directive dynamique pouvant prendre plusieurs évènements (click, mouseover, ..) en précisant l'event en tant qu'argument sur un élément HTML
        app.directive("track", {
            mounted(el, binding) {
                currentEventType = binding.arg;
                const handleEvent = () => {
                    currentEventType = binding.arg;
                    sendEvent({
                        tag: binding.value,
                        type: currentEventType,
                        element: el,
                        appId: AppId,
                        content: el.outerHTML,
                        createdAt: Date.now()
                    });
                };
                eventListeners[binding.value] = handleEvent;
                el.addEventListener(currentEventType, eventListeners[binding.value]);
            },
            unmounted(el, binding) {
                el.removeEventListener(currentEventType, eventListeners[binding.value]);
            },
        });
    },
};

window.addEventListener("load", function (event) {
    startTime = new Date();
    saveUniqueUser(getVisitorId());
    saveVisit(getVisitId());
});

// Gestion des ID visiteur lorsque celui-ci quitte la page
window.addEventListener("beforeunload", function (event) {
    localStorage.removeItem("visitId");
    deleteCookie("visitId");
    endTime = new Date();

    // Sauvegarde de la durée de visite
    let totalSeconds = Math.abs(startTime - endTime) / 1000;
    saveDurationTime(getVisitId(), getVisitorId(), totalSeconds)
});

// Récupération du VISIT_ID / Création s'il n'existe pas
function getVisitId() {
    const visitId =
        localStorage.getItem("visitId") || getCookie("visitId");
    if (visitId) {
        return visitId;
    }

    const newVisitId = createUniqueId();
    localStorage.setItem("visitId", newVisitId);
    setCookie("visitId", newVisitId, 7);

    return newVisitId;
}

// Récupération du VISITOR_ID / Création s'il n'existe pas
function getVisitorId() {
    const visitorId =
        localStorage.getItem("visitorId") || getCookie("visitorId");
    if (visitorId) {
        return visitorId;
    }

    const newVisitorId = createUniqueId();
    localStorage.setItem("visitorId", newVisitorId);
    setCookie("visitorId", newVisitorId, 7);

    return newVisitorId;
}

// Création d'un cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Récupération d'un cookie
function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Suppression d'un cookie
function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

// Création d'un ID pour VISIT_ID et VISITOR_ID
function createUniqueId() {
    return (
        Date.now().toString(36) +
        Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(
            36
        )
    );
}
