export function sendEvent({ tag, type, element, appId }) {
    fetch("http://localhost:3000/api", {
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
            content: element.outerHTML,
        }),
    }).then((r) => {
        console.log(
            "New KPI DATA Saved : TAG '" + tag + "', EVENT '" + type + "'."
        );
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

const eventListeners = {};

/**
 *
 * const ref = useTrack("my-tag", "click");
 *
 */

export default {
    install(app, options) {
        const { AppId } = options;
        app.directive("click-track", {
            mounted(el, binding) {
                // eventListeners[binding.value] = trackElement(el, binding.tag, binding.type);
                const handleEvent = () => {
                    sendEvent({
                        tag: binding.value,
                        type: "click",
                        element: el,
                        appId: AppId
                    });
                };
                eventListeners[binding.value] = handleEvent;
                el.addEventListener("click", eventListeners[binding.value]);
            },
            unmounted(el, binding) {
                el.removeEventListener("click", eventListeners[binding.value]);
            },
        });

        app.directive("mouseover-track", {
            mounted(el, binding) {
                // eventListeners[binding.value] = trackElement(el, binding.tag, binding.type);
                const handleEvent = () => {
                    sendEvent({
                        tag: binding.value,
                        type: "mouseover",
                        element: el,
                        appId: AppId
                    });
                };
                eventListeners[binding.value] = handleEvent;
                el.addEventListener("mouseover", eventListeners[binding.value]);
            },
            unmounted(el, binding) {
                el.removeEventListener("mouseover", eventListeners[binding.value]);
            },
        });
    },
};

window.addEventListener("beforeunload", function (event) {
    localStorage.removeItem("visitId");
    deleteCookie("visitId");
});

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

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

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

function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function createUniqueId() {
    return (
        Date.now().toString(36) +
        Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(
            36
        )
    );
}
