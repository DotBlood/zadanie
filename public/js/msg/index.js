const showFormSerchSmsByMsg = () => {
    form.innerHTML = `
    <form action="/api/v1/fmbh" method="post" class="fmbh">
        <p>Поиск по tag<p>
        <input type="text" name="tag_data" placeholder="#Tag по которому ищем">
        <button type="submit">Создать</button>
    </form>
    `
    const fmbh = document.querySelector('.fmbh')

    fmbh.addEventListener('submit', (event) => {
        event.preventDefault()


        if (fmbh.tag_data.value.replaceAll(' ', '').length <= 0) {
            sAlert('Ошибка!', 'Вы не можете ничего ни исать.', 'error')
        }

        const payload = { tag_data: fmbh.tag_data.value }

        fetch('/api/v1/fmbh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                if (data == false) {
                    return sAlert('Ошибка!', 'Мы не смогли ничего найти ;/', 'error')
                }
                let information = document.createElement('ul')
                form.appendChild(information)
                information.className = `information__items`;

                data.forEach(item => {
                    let creaDate = new Date(item.created_at);

                    let block = `<li class="information__item">
                     <p> Message: ${item.message_text} </p>
                     <p> #Tag: ${item.tag_data} </p>
                     <p> Создан в: ${creaDate.toLocaleDateString()} </p>
                     <br>
                    </li>`;

                    information.insertAdjacentHTML('beforeend', block)

                })

            })
            .catch(error => {
                console.log(error)
                return sAlert('Ошибка!', 'Произошла непредвиденная ошибка ;/', 'error')
            })


    })



}

const showFormCreateChat = () => {
    return form.innerHTML = `
            <form action="/api/v1/chat" method="post">
              <input type="text" name="title" placeholder="Название чата">
              <input type="text" name="description" placeholder="Описание чата">
              <label>Только для вас?
                <input type="checkbox" name="isPrivate">
              </label>
              <button type="submit">Создать</button>
            </form>                
    `
}

const ShowMyChats = async () => {
    try {
        const dataArray = await fetchData('/api/v1/chat/private')

        if (dataArray == false) {
            form.innerHTML = `
        <ul class="information__items"> 
            <li class="information__item">
            <p>Пока не создано ни однаго чата.</p>
            <p>Чтобы исправить данную ошибку сперва создайте.</p>
            </li>
            </ul>`;
            return sAlert('Ошибка!', 'Тут еще совсем пусто...', 'error')

        } else {

            form.innerHTML = `<ul class="information__items"><ul>`
            let information = document.querySelector('.information__items')
            dataArray.forEach(item => {
                let creaDate = new Date(item.created_at);
                let vm;
                if (!item.isverify) {
                    vm = 'нет'
                }
                else {
                    vm = 'да'
                }
                let block = `<li class="information__item">
            <p> Название: ${item.title} </p>
            <p> Описание: ${item.description} </p>
            <p> Верефицикация: ${vm} </p>
            <p> Создан в: ${creaDate.toLocaleDateString()} </p>
            <span id="${item.cheanl_id}" onClick="ShowMeMore(this);" class="link">Посмотреть сообщения в группе.</span>
            <br>
           </li>`;
                information.insertAdjacentHTML('beforeend', block)
            })
        }
    } catch (error) {
        console.error(error)
        return sAlert('Ошибка!', 'Возникла непредвиденная ошибка, подробнее в консоле', 'error')
    }
}



const ShowAllChats = async () => {
    try {
        const dataArray = await fetchData('/api/v1/chats')

        if (dataArray == false) {
            form.innerHTML = `
        <ul class="information__items"> 
            <li class="information__item">
            <p>Пока не создано ни однаго чата.</p>
            <p>Чтобы исправить данную ошибку сперва создайте.</p>
            </li>
            </ul>`;
            return sAlert('Ошибка!', 'Тут еще совсем пусто...', 'error')

        } else {
            form.innerHTML = `<ul class="information__items"><ul>`
            let information = document.querySelector('.information__items')
            dataArray.forEach(item => {
                let creaDate = new Date(item.created_at)
                let vm;
                if (!item.isverify) {
                    vm = 'нет'
                }
                else {
                    vm = 'да'
                }

                let block = `<li class="information__item">
            <p> Название: ${item.title} </p>
            <p> Описание: ${item.description} </p>
            <p> Верефицикация: ${vm} </p>
            <p> Создан в: ${creaDate.toLocaleDateString()} </p>
            <span id="${item.cheanl_id}" onClick="ShowMeMore(this);" class="link">Посмотреть сообщения в группе.</span>
            <br>
           </li>`;
                information.insertAdjacentHTML('beforeend', block)
            })
        }
    } catch (error) {
        console.error(error)
        return sAlert('Ошибка!', 'Возникла непредвиденная ошибка, подробнее в консоле', 'error')
    }
}

const ShowMeMore = (e) => {
    const payload = { cheanl_id: e.id }

    fetch('/api/v1/chat/data', {
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
                let creaDate = new Date(item.created_at)
                let block = `
                    <li class="information__item">
                        <span>Сообщение: ${item.message_text}</span>
                        <br>
                        <span>Создано в: ${creaDate.toLocaleDateString()}</span>
                        <br>
                    </li>
                `;

                information.insertAdjacentHTML('beforeend', block);
            });
        })
        .catch(error => {
            form.innerHTML = `
        <ul class="information__items"> 
            <li class="information__item">
                <p>В данном нет ни одного сообщения.</p>
                <p>Чтобы исправить данную ошибку сперва создайте новое сообщение, с привязкой к данному чату).</p>
            </li>
        </ul>`;
            return sAlert('Ошибка!', 'Тут еще совсем пусто...', 'error')
        });

}



const ShowFormSendNewMsgOnChat = async () => {
    const NewDataArray = [];
    const dataArrayPrivate = await fetchData('/api/v1/chat/private');
    const dataArray = await fetchData('/api/v1/chats');
    const DataFild = await fetchData('/api/v1/fk');

    if (dataArrayPrivate !== false) {
        NewDataArray.push(...dataArrayPrivate);
    }

    if (dataArray !== false) {
        NewDataArray.push(...dataArray);
    }

    if (NewDataArray.length === 0) {
        return sAlert('Ошибка!', 'Похоже, что чатов еще не существует!', 'error');
    }

    if (DataFild === false) {
        return sAlert('Ошибка!', 'У вас нет доступных #Tag-ов или областей знаний!', 'error');
    }

    if (NewDataArray.length > 0) {
        form.innerHTML = `<form action="/api/v1/chat/send" class="sendMSG" method="post">
        <p>Выберети чат</p>
        <select class="focus_cheanl" name="chat_id">
        </select>
        <br>
        
        <p>Выберите #TAG</p>
        <select class="focus_Tag" name="tag_id">
        </select>   

        <br>
        <input type="text" name="message_text" placeholder="Сообщение">
        <button type="submit">Отправить</button>
        </form>
        `
        let foc = document.querySelector('.focus_cheanl')
        let fot = document.querySelector('.focus_Tag')

        NewDataArray.forEach(item => {
            console.log(item)
            block = `<option value="${item.cheanl_id}" >${item.title}</otion>`
            foc.insertAdjacentHTML('beforeend', block);
        })

        DataFild.forEach(item => {
            fetch('/api/v1/fk/findtags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fild_name: item.fild_name })
            })
                .then(response => response.json())
                .then(data => {
                    data.forEach(item => {
                        block = `<option value="${item.tag_id}" >${item.tag_data}</otion>`
                        fot.insertAdjacentHTML('beforeend', block);
                    })
                })
                .catch(errr => {
                    sAlert('Ошибка!', 'сообщение не можиет быит пустым.', 'error')
                })
        })


        const smform = document.querySelector('.sendMSG')

        smform.addEventListener('submit', (e) => {
            e.preventDefault()
            if (smform.chat_id.value && smform.message_text.value.replaceAll(' ', '').length > 0 && smform.tag_id) {
                e.stopPropagation()
                return smform.submit()
            }
            else {
                return sAlert('Ошибка!', 'сообщение не можиет быит пустым.', 'error')
            }

        })

    }
}

