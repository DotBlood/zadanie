async function ShowFormHtag() {
    form.innerHTML = ``
    try {
        const dataArray = await fetchData('/api/v1/fk');
        if (dataArray == false) {
            form.innerHTML = `
            <ul class="information__items"> 
                <li class="information__item">
                <p>У вас пока нет доступной области знаний.</p>
                <p>Чтобы исправить данную ошибку и создать #tag, сначала создайте область знаний.</p>
                </li>
            </ul>
        `;

        } else {
            form.innerHTML = `
        <form action="/api/v1/htag" method="post">
        <p>Создать tag<p>
        <select class="filds" name="fild_name">
            
        </select>
        <input type="text" name="tag_data" placeholder="Ваш #Tag">
          <button type="submit">Создать</button>
        </form>
        `
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