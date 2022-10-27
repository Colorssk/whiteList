export let  processData = [
    {
        content: '1',
        title: '报价',
        active: true
    },
    {
        content: '2',
        title: '中标分配',
        active: true
    },
    {
        content: '3',
        title: '交易明细',
        active: false
    }
]

export const  editProcessData = (processData, index) => {
    return processData.map((el, i) => {
        if(i<=index){
            el.active = true
        }else{
            el.active = false
        }
        return el
    })
}