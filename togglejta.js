const fs = require('fs');
const path = require('path');
const { argv } = require('process');

// Parse command-line arguments
const args = argv.slice(2);
let environment = 'dev'; // Default environment

// Parse arguments to get the environment
args.forEach(arg => {
    if (arg.startsWith('--env=')) {
        environment = arg.split('=')[1];
    }
});

//This file paths will depend on you directory configuration
const xmlDirectory = `${__dirname}/persistences`; 
const persistenceXmlPath = '/src/main/resources/META-INF/persistence.xml';
const parentDir = path.resolve(__dirname, "..");
const finalPath = path.resolve(parentDir + persistenceXmlPath);
// Check if the environment XML file exists
const xmlFilePath = path.resolve(xmlDirectory, `persistence_${environment}.xml`);
console.log({
    xmlFilePath,
    finalPath,
    dirName: __dirname,
    cwd: process.cwd(),
    parentDir,
})

if (!fs.existsSync(xmlFilePath)) {
    console.error(`Error: XML file for environment '${environment}' not found.`);
    process.exit(1);
}

// Read the content of the environment XML file
const xmlContent = fs.readFileSync(xmlFilePath, 'utf8');

// Write the content to the persistence.xml file
try {
    fs.writeFileSync(finalPath, xmlContent);
    console.log(`persistence.xml file for environment '${environment}' successfully updated.`);
} catch (err) {
    console.error('Error writing to persistence.xml file:', err);
}
