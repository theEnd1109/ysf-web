export const setLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocal = (key) => {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
};

export const removeLocal = (key) => {
    localStorage.removeItem(key);
};

export const setSession = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSession = (key) => {
    const val = sessionStorage.getItem(key);
    return val ? JSON.parse(val) : null;
};

export const removeSession = (key) => {
    sessionStorage.removeItem(key);
};