const { Select } = require('enquirer');
const { error, log, info } = require('pretty-console-logs');
const operations = require('./src/operations');

process.on('uncaughtException', (err) => {
  error('Unhandled error, immediate exiting!\n');
  info(err, '\n');
  log('Generating a core file\n'); 
  process.abort();
});

const prompt = new Select({
  name: 'operation',
  message: 'Choose operation',
  choices: [
    'Add film',
    'Delete film', 
    'Show information about film', 
    'Show films sorted in alphabetical order', 
    'Find film by name',
    'Find film by actors', 
    'Import films from file',
    'Exit'
  ]
});

function startCLI() {
  prompt.run()
    .then(answer => { 
      console.log('Chosen:', answer);
  
      switch(answer) {
      case 'Add film':
        operations.request_add_film();
        break;
      case 'Delete film':
        operations.request_delete_film();
        break;
      case 'Show information about film':
        operations.request_show_film();
        break;
      case 'Show films sorted in alphabetical order':
        operations.request_order_alpha();
        break;
      case 'Find film by name':
        operations.request_find_film();
        break;
      case 'Find film by actors':
        operations.request_find_actor();
        break;
      case 'Import films from file':
        operations.request_import_file();
        break;
      case 'Exit':
        return ;
      }
    })
    .catch(console.error);
}

startCLI();