const { prompt } = require('enquirer');
const { error, log, info } = require('pretty-console-logs');
const operations = require('./src/operations');

process.on('uncaughtException', (err) => {
  error('Unhandled error, immediate exiting!\n');
  info(err, '\n');
  log('Generating a core file\n'); 
  process.abort();
});

async function startCLI() {
  
  let menu = await prompt([
    {
      type: 'select',
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
    }
  ])
  console.log('Chosen:', menu.operation);

  switch(menu.operation) {
  case 'Add film':
    await operations.request_add_film();
    break;
  case 'Delete film':
    await operations.request_delete_film();
    break;
  case 'Show information about film':
    await operations.request_show_film();
    break;
  case 'Show films sorted in alphabetical order':
    operations.request_order_alpha();
    break;
  case 'Find film by name':
    await operations.request_find_film();
    break;
  case 'Find film by actors':
    await operations.request_find_actor();
    break;
  case 'Import films from file':
    await operations.request_import_file();
    break;
  case 'Exit':
    process.exit();
  }

  console.log('\n');
  await startCLI(); 
}

startCLI();