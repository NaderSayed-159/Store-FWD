export const generteUpdateQuerey = (data: [], table: string, id: String) => {
    let updateQuerey: string = `UPDATE ${table} SET `;
    data.forEach((el, index) => {

        if (data.length < 2 && data.length > 0) {
            for (const [key, value] of Object.entries(el)) {
                if (typeof value == 'string') {
                    updateQuerey += `${key}='${value}' `
                } else {
                    updateQuerey += `${key}=${value} `
                }
            }
        } else if (data.length > 1) {
            if (index != data.length - 1) {
                for (const [key, value] of Object.entries(el)) {
                    if (typeof value == 'string') {
                        updateQuerey += `${key}='${value}', `
                    } else {
                        updateQuerey += `${key}=${value}, `
                    }
                }
            } else {
                for (const [key, value] of Object.entries(el)) {
                    if (typeof value == 'string') {
                        updateQuerey += `${key}='${value}' `
                    } else {
                        updateQuerey += `${key}=${value} `
                    }
                }
            }
        }
    })
    updateQuerey += `WHERE id=${id}`;
    return updateQuerey;
}