const fs = require("fs");
const generateHTML = require("./generateHTML");
const axios = require("axios");
const inquirer = require("inquirer");
var pdf = require('html-pdf');


const questions = [
  
];

function writeToFile(fileName, data) {
  fs.writeFileSync(fileName, data, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

init();

function init() {
  inquirer.prompt([{
    message: "Github Username:",
    name: "Username",
    type: "input"
  },
  {message: "Color:",
  name: "Color",
  type: "list",
  choices:["green","blue","pink","red"]
}])
  .then(function(answer){
    console.log("username", answer);
    getUser(answer.Username, answer.Color);
  })
}

function getUser(username, color){
  const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res) {
      console.log("res" , res.data);
      // const repoNames = res.data.map(function(repo) {
      //   return repo.name;
      // });
      const input = {...res.data, ...{color}};
      console.log("input" , input);
      
      writeToFile("MyNewFile.html", generateHTML(input));
      createPDF();
      
})
}

function createPDF(){
  var html = fs.readFileSync('MyNewFile.html', 'utf8');
var options = { format: 'Letter' };
 
pdf.create(html, options).toFile('./MyNewFile.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});
}





// var fs = require('fs');

// var fileName = 'NewHTML.html';
// var stream = fs.createWriteStream(fileName);

// stream.once('open', function(fd) {
//   var html = generateHTML("green");

//   stream.end(html);
// });




// inquirer
//   .prompt({
//     message: "Enter your GitHub username:",
//     name: "username"
//   })
//   .then(function({ username }) {
//     const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

//     axios.get(queryUrl).then(function(res) {
//       const repoNames = res.data.map(function(repo) {
//         return repo.name;
//       });

//       const repoNamesStr = repoNames.join("\n");

//       fs.writeFile("repos.txt", repoNamesStr, function(err) {
//         if (err) {
//           throw err;
//         }

//         console.log(`Saved ${repoNames.length} repos`);
//       });
//     });
//   });
