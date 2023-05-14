function ShowFormFK() {
    return form.innerHTML = `
    <form action="/api/v1/fk" method="post">
    <p>Создать область знаний<p>
      <input type="text" name="fild_name" placeholder="Название области знаний">
      <button type="submit">Создать</button>
    </form>
    `
}

async function GetMyFk() {
    try {
        form.innerHTML = '';
        const information = document.createElement('ul');
        form.appendChild(information);
        information.className = 'information__items';

        const dataArray = await fetchData('/api/v1/fk');
        if (dataArray == false) {
            let block = `
        <li class="information__item">
            <p>У вас пока нет связей или произошла ошибка.</p>
        </li>
      `;
            information.insertAdjacentHTML('beforeend', block);
        } else {
            dataArray.forEach((item) => {
                let block = `
          <li class="information__item">
            <span id="${item.fild_id}">Id: <b>${item.fild_id}</b></span>
            <br>
            <span>Название: <b>${item.fild_name}</b></span>
            <br>
            <span>Создан в: <b>${item.created_at}</b></span>
            <br>
            <span>Обнавлен в: <b>${item.upadate_at}</b></span>
            <br>
          </li>
        `;
                information.insertAdjacentHTML('beforeend', block);
            });
        }
    } catch (error) {
        console.error(error);
    }
}


async function ShowFormFindHashTagOnFilds() {
    form.innerHTML = ``
    try {
        const dataArray = await fetchData('/api/v1/fk');
        if (dataArray == false) {
            form.innerHTML = `
            <ul class="information__items"> 
                <li class="information__item">
                <p>У вас пока нет доступной области знаний.</p>
                <p>Чтобы исправить данную ошибку, Вам необходимо создайте область знаний.</p>
                </li>
            </ul>
        `;

        } else {
            form.innerHTML =
                `
        <form class="filds_serach_tag" onsubmit="ESerachTagOnFilds(this);return false;">
            <p>Выберети область знаний</p>
            <select class="filds" name="fild_name">
            </select>
          <button type="submit">Найти</button>
        </form>`;
            const filds = document.querySelector('.filds')
            dataArray.forEach((item) => {
                let block = `<option value="${item.fild_name}"><b>${item.fild_name}</b></span>`;
                filds.insertAdjacentHTML('beforeend', block);
            });
        }
    } catch (error) {
        console.error(error);
    }
}