/**
 *  
 */
var words = ['死','坏','废材'];
var customWords = []

function censor(inStr){
    for(let index in words){
        inStr = inStr.replace(words[index],'***');
    }
    for(let index in customWords){
        inStr = inStr.replace(customWords[index],'***')
    }
    return inStr;
}

function addCensoredWord(word){
    customWords.push(word);
}
function getCensoredWords(){
    return words.concat(customWords);
}
//导出三个方法
exports.censor = censor;
exports.addCensoredWord = addCensoredWord;
exports.getCensoredWords = getCensoredWords;