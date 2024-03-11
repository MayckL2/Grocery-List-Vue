

const url = 'https://good-swamp-coil.glitch.me/'

export async function getAll(){
    try {
        let response = await fetch(url + 'shoplist')
        let data = await response.json()
        
        if(response.status == 200){
            return data
        }else{
            return 'error'
        }
    } catch (error) {
        return 'error'
    }
}

export async function addItem(name: string, price: number){
    let response = await fetch(url + 'shoplist', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            item: name,
            preco: Number(price),
            marked: false
        })
    })
    let data = await response.json()

    if(response.status == 201){
        return data
    }else{
        return 'error'
    }
}


export async function mark(id: string|number|undefined, isMarked: boolean){
    let response = await fetch(url + 'shoplist/' + id, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            marked: !isMarked
        })
    })
    let data = await response.json()

    if(response.status == 200){
        return data
    }else{
        return 'error'
    }
}

export async function deleteItem(id: string|number){
    let response = await fetch(url + 'shoplist/' + id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    })
    let data = await response.json()

    if(response.status == 200){
        return data
    }else{
        return 'error'
    }
}

export async function editItem(id: string|number, name: string, price: number){
    let response = await fetch(url + 'shoplist/' + id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            item: name,
            preco: price
        })
    })
    let data = await response.json()

    if(response.status == 200){
        return data
    }else{
        return 'error'
    }
}

export async function clearAll(){
    let all = await getAll()

    for (let i = 0; i < all.length; i++) {
        deleteItem(all[i].id)        
    }
    
    return 'List cleaned'
}