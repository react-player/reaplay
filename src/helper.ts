/**
 * convert time seconds to minutes : seconds
 * @function
 * @param {number} time
 * @description return the converted time like this = 03:14
 */

export const ConvertTimeToText = (time:number) => {
    if(!time) time = 0;
    var minutes:string = "0" + Math.floor(time / 60);
    var seconds:string = "0" +  Math.floor(time - (parseInt(minutes)) * 60);
    var result:string = minutes.substr(-2) + ":" + seconds.substr(-2);
    return result
}