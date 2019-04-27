export default {
    getFromLocal,
    getFromSession,
    saveToLocal,
    removeFromLocal
}

function getFromLocal(key) {
    const res = localStorage.getItem(key)
    return res ? JSON.parse(localStorage.getItem(key)) : null
}
function getFromSession(key) {
    const res = sessionStorage.getItem(key)
    return res ? JSON.parse(sessionStorage.getItem(key)) : null
}

function saveToLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function removeFromLocal(key) {
    localStorage.removeItem(key);
}