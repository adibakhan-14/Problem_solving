function anagram(str1, str2) {

    var word1 = "It is anagram!";
    var word2 = "no it is NOT an anagram!!!!";
    var sent = "";
    var arr1 = [];
    var arr2 = [];
    for (let i = 0; i < str1.length; i++) {
        arr1.push(str1.slice(i, i + 1));
    }
    var sort1 = arr1.sort();
    console.log(sort1);

    for (let i = 0; i < str2.length; i++) {
        arr2.push(str2.slice(i, i + 1))
    }

    var sort2 = arr2.sort();
    console.log(sort2);



    let result = (sort1.length === sort2.length) && (sort1.every((element, index) => {
        return element === sort2[index];
    }))



    if (result === true) {
        sent = word1;
        //console.log("It is anagram!");
    } else {
        sent = word2;
        //console.log("no it is NOT an anagram!!!!");
    }
    return sent;
}

var str1 = "bleat";
var str2 = "table";

checker = anagram(str1, str2);
console.log(checker);