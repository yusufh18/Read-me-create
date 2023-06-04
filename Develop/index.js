// TODO: Include packages needed for this application
var fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    "What's your project title: ",
    "Provide a description Description: ",
    "Provide a description Installation Instructions: ",
    "Provide a description Usage Info: ",
    "Provide a description Contribution Guidelines: ",
    "Provide a description Test Instructions: ",
    "Choose a License: ",
    "GitHub username: ",
    "GitHub email: ",
];

let sequence = ["Title",
"Description",
"Table of Contents",
"Installation",
"Usage",
"Credits",
"Badges",
"License",
"entiteled questions",
"Tests",
]

readmeObj = {
    "Title": "",
    "Description": "",
    "Table of Contents": "",
    "Installation": "",
    "Usage": "",
    "Credits": "",
    "Badges": "",
    "License": "",
    "entiteled questions": {
        "username": "",
        "email": ""
    },
    "Tests": "",
}
// TODO: Create a function to write README file
function writeToFile(fileName, readline, questions) {

    function questionCall(readline, q = 0){
        let question = questions[q];
        readline.question(question, name => {

            if(q == 0){
                readmeObj["Title"] = name
            }
            else if(q == 1){
                readmeObj["Description"] = name
            }
            else if(q == 2){
                readmeObj["Installation"] = name
            }
            else if(q == 3){
                readmeObj["Usage"] = name
            }
            else if(q == 4){
                readmeObj["Credits"] = name
            }
            else if(q == 5){
                readmeObj["Tests"] = name
            }
            else if(q == 6){
                readmeObj["License"] = name
                readmeObj["Badges"] = name
            }
            else if(q == 7){
                readmeObj["entiteled questions"].username = name
            }
            else if(q == 8){
                readmeObj["entiteled questions"].email = name
            }

            q++;
            
            
            if(q <= 8){
                questionCall(readline, q);
            }
            else if(q > 8){
                readline.close();
                makeReadMe();
            }
            
        });
    }

    questionCall(readline)

    async function makeReadMe(){

        async function writeSection(i = 0)
        {
            let item = sequence[i];

            if(item == undefined ){
                return;
            }

            let key = item;
            let value = readmeObj[item];

            i++;

            let section = ``;
            if(typeof value == "object"){
                let count = 0;
                section = `
### ${key}
`;
                Object.entries(value).forEach(async ([key, subItem])  => { 
                    
                        section = section +
                        `
##### ${key}
                
${subItem}
                        `;
                        count++;
                    });
                await fs.appendFile(fileName, section, function (err) {
                    if (err) throw err;
                });

                if(Object.keys(value).length  == count){
                    count = 0;
                    writeSection(i);
                    return;
                }
            }
            else{
                if(key == "Table of Contents"){
                    section = 
                    `
##### ${key}
                    `;
                    await fs.appendFile(fileName, section, async function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                        let counter = 0;
                        section = ``;
                        sequence.forEach(async (item, index) => { 
                            let value = item;
                            let key = readmeObj[item];
    
                            if(value != "Table of Contents"){
                                section = section+`
${counter+1}. [${value}](#${value})
                                `;
                                counter++;
                            }
                        });
                        await fs.appendFile(fileName, section, function (err) {
                            if (err) throw err;
                                writeSection(i);
                        });
                    });

                }
                else{
                    section = 
                    `
### ${key}
            
${value}
                    `;
                    await fs.appendFile(fileName, section, function (err) {
                        if (err) throw err;
                        writeSection(i);
                    });
                }
            }

        }

        writeSection();

    }

}

// TODO: Create a function to initialize app
function init() {

    
    fs.writeFile('README.md', '', function (err) {
          const readline = require('readline').createInterface({
              input: process.stdin,
              output: process.stdout
            });
        if (err) throw err;
        writeToFile("README.md", readline, questions)
      });

}

// Function call to initialize app
init();


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
