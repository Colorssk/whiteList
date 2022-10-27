export const leftLalbel = (data) => {
    let constList  = [
        {
            label: '债券简称',
            value: data[0]
        },
        {
            label: '债券期限',
            value: data[1]
        },
        {
            label: '本次发行',
            value: data[2]
        },
        {
            label: '可投比例(%)',
            value: data[3]
        },
    ]
    return constList
}