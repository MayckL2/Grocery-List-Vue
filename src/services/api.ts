
const url = 'https://good-swamp-coil.glitch.me/'

// Retorna todos os itens da lista
export async function getAll() {
    // caso lista nao exita, ela é criada
    if (!localStorage.grocery) {
        localStorage.grocery = JSON.stringify([])
    }

    return JSON.parse(localStorage.grocery)
}

// Adiciona item na lista
export async function addItem(name: string, price: number) {
    // caso lista nao exita, ela é criada
    if (!localStorage.grocery) {
        localStorage.grocery = JSON.stringify([])
    }

    // Adiciona item no array e salva no localstorage
    let grocery = JSON.parse(localStorage.grocery)
    let lastIndex = grocery.length > 0 ? grocery[grocery.length - 1].id + 1 : 1
    grocery.push({
        id: lastIndex,
        item: name,
        marked: false,
        preco: price
    })
    localStorage.grocery = JSON.stringify(grocery)

    return grocery
}


// Marca item e salva como marcado
export async function mark(id: string | number | undefined, isMarked: boolean) {
    let grocery = JSON.parse(localStorage.grocery)
    let elementMarked: { id: string | number | undefined, item: string, marked: boolean, preco: number } = {
        id: undefined,
        item: "",
        marked: false,
        preco: 0
    }

    // Filtra entre itens do array e marca oque tiver o id correspondente
    grocery.forEach((element: {
        id: string | number | undefined
        item: string
        marked: boolean
        preco: number
    }) => {
        // se ids são iguais
        if (element.id == id && id) {
            // cria novo item como marcado
            elementMarked = {
                id: element.id,
                item: element.item,
                marked: !isMarked,
                preco: element.preco
            }
            // apaga item antigo
            grocery = grocery.filter((value: { id: number | string }) => value.id != element.id)
            // ordena por id e salva no localstorage
            grocery.push(elementMarked)
            grocery.sort(function (a: { id: number }, b: { id: number }) { return a.id - b.id });
            localStorage.grocery = JSON.stringify(grocery)
            console.log(grocery)
        }
    });

    return elementMarked

}

// Deleta item
export async function deleteItem(id: string | number) {
    let grocery = JSON.parse(localStorage.grocery)
    // Filtra pelo array removendo pelo determinado id
    grocery = grocery.filter((value: { id: string | number }) => value.id != id)
    localStorage.grocery = JSON.stringify(grocery)

    return ''

}

// Edita Item
export async function editItem(id: string | number, name: string, price: number) {
    let grocery = JSON.parse(localStorage.grocery)
    let elementEdit = {}
    // Filtra entre itens do array e edita oque tiver o id correspondente
    grocery.forEach((element: {
        id: string | number | undefined
        item: string
        marked: boolean
        preco: number
    }) => {
        // se ids são iguais
        if (element.id == id && id) {
            // cria novo item editado
            elementEdit = {
                id: element.id,
                item: name,
                marked: element.marked,
                preco: price
            }
            // apaga item antigo
            grocery = grocery.filter((value: { id: number | string }) => value.id != element.id)
            // ordena por id e salva no localstorage
            grocery.push(elementEdit)
            grocery.sort(function (a: { id: number }, b: { id: number }) { return a.id - b.id });
            localStorage.grocery = JSON.stringify(grocery)
            console.log(grocery)
        }
    });

    return elementEdit

}

// apaga todos os itens
export async function clearAll() {
    localStorage.removeItem('grocery')

    return 'List cleaned'
}