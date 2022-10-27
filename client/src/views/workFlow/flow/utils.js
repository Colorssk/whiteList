export const calcuateProcessPercent = (config, index) => {
    let isShow = true,
        process = 0
    if(index===config.length-1){
        isShow = false;
    }else{
        if (config[index]['active']) {
            process += 50
            }
        if (config[index + 1]['active']) {
            process += 50
        }
    }
   
    return { isShow,  process: process + '%'}
}