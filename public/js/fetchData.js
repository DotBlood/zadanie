const fetchData = (url, params = {}) => {
    const controller = new AbortController();
    const { signal } = controller;

    const timeout = setTimeout(() => {
        controller.abort();
        reject(new Error('Request timed out.'));
    }, 5000);

    return new Promise((resolve, reject) => {
        fetch(url, {
            params,
            signal
        })
            .then((response) => {
                clearTimeout(timeout);
                if (response.ok) {
                    return response.json();
                } else if (response.status === 406) {
                    resolve(false);
                } else {
                    throw new Error('Request failed.');
                }
            })
            .then((dataArray) => {
                resolve(dataArray);
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log('Запрос был отменен.');
                } else {
                    reject(error);
                }
            });
    });
};