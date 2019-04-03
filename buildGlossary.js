var fs = require('fs');

var termbase = fs.readFileSync('termbase.json');

var termsObj = JSON.parse(termbase);

function capitalize(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertToDefinitionList (termsObj) {
    var newFile = fs.createWriteStream('glossary-definition-list.md');

    newFile.write('# Glossary\r\n\r\n**This glossary contains definitions of terms that are used in IOTA.**\r\n\r\nTerms are listed in alphabetical order.\r\n');

    // Access categories, terms, and definitions
    for(var i = 0; i < termsObj.length; i++){

        newFile.write('\r\n## ' + capitalize(termsObj[i].cat) + '\r\n\r\n' )

        for(term in termsObj[i].terms ){
            newFile.write('<dl><dt>' + term + '</dt>' + '<dd>' + termsObj[i].terms[term] + '</dd>' + '</dl>' + '\r\n');
        }
    }
}

convertToDefinitionList(termsObj);

