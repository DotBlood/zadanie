function ESerachTagOnFilds(form) {

    const fildName = form.fild_name.value;
    const payload = { fild_name: fildName };

    fetch('/api/v1/fk/findtags', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {

            if (document.querySelector('.information__items')) {
                let a = document.querySelector('.information__items')
                a.outerHTML = ``
            }

            const information = document.createElement('ul')
            form.appendChild(information);
            information.className = 'information__items';

            data.forEach(item => {
                let block = `
                <li class="information__item">
                  <span id="${item.tag_id}">Id: <b>${item.tag_id}</b></span>
                  <br>
                  <span>Область знания: <b>${item.fild_name}</b></span>
                  <br>
                  <span>#Tag: <b>${item.tag_data}</b></span>
                  <br>
                  <span id="${item.tag_id}" onClick="removeMe(this)" class="link">Удалить<span>
                </li>
            `;

                information.insertAdjacentHTML('beforeend', block);
            });
        })
        .catch(error => {
            sAlert('Ошибка!', 'Мы не смогли найти ни одной записи в данной области знаний.', 'error')
        });

}

const removeMe = (e) => {

    const payload = { tag_id: e.id }
    fetch('/api/v1/htag/remove', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    ).then(response => response.json())
        .then(data => {
            if (document.querySelector('.information__items')) {
                let a = document.querySelector('.information__items')
                a.outerHTML = ``
            }

            const information = document.createElement('ul')
            form.appendChild(information);
            information.className = 'information__items';

            data.forEach(item => {
                let block = `
                <li class="information__item">
                  <span id="${item.tag_id}">Id: <b>${item.tag_id}</b></span>
                  <br>
                  <span>Область знания: <b>${item.fild_name}</b></span>
                  <br>
                  <span>#Tag: <b>${item.tag_data}</b></span>
                  <br>
                  <span id="${item.tag_id}" onclick="removeMe(this)" class="link">Удалить<span>
                </li>
            `;

                information.insertAdjacentHTML('beforeend', block);
            });

        })


        .catch(error => {
            if (document.querySelector('.information__items')) {
                let a = document.querySelector('.information__items')
                a.outerHTML = ``
            }
            return sAlert('Ошибка!', 'Мы не согли удалить данный атрибут, Вы точно его не трогали?', 'error')
        });


}

