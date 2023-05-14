var menus = document.querySelectorAll('.menu-items');
var form = document.querySelector('.forms');

menus.forEach((key) => {
    if (key.id == 1) {
        key.addEventListener('click', () => ShowFormFK())
    }

    else if (key.id == 2) {
        key.addEventListener('click', async () => {
            return await GetMyFk();
        });
    }

    else if (key.id == 3) {
        key.addEventListener('click', async () => {
            await ShowFormHtag();
        });

    }

    else if (key.id == 4) {
        key.addEventListener('click', () => {
            return showFormSerchSmsByMsg();
        })
    }

    else if (key.id == 5) {
        key.addEventListener('click', () => {
            return showFormCreateChat()
        })
    }

    else if (key.id == 6) {
        key.addEventListener('click', async (e) => {
            await ShowAllChats()
        })
    }

    else if (key.id == 7) {
        key.addEventListener('click', async (e) => {
            await ShowMyChats()
        })
    }

    else if (key.id == 8) {
        key.addEventListener('click', async () => {
            return await ShowFormSendNewMsgOnChat()
        })
    }
    else if (key.id == 10) {
        key.addEventListener('click', () => {
            return ShowFormFindHashTagOnFilds()
        })
    }
})


