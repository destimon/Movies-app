const { Select } = require('enquirer');
const operations = require('./src/operations');

const prompt = new Select({
  name: 'operation',
  message: 'Choose operation',
  choices: [
    '1. Add film',
    '2. Delete film', 
    '3. Show information about film', 
    '4. Show films sorted in alphabetical order', 
    '5. Find film by name',
    '6. Find film by actors', 
    '7. Import films from file'
  ]
});

prompt.run()
  .then(answer => { 
    console.log('Chosen:', answer)

    switch(answer) {
      case '1. Add film':
        operations.request_add_film();
      break;
      case '2. Delete film':
        operations.request_delete_film();
      break;
      case '3. Show information about film':
        operations.request_show_film();
      break;
      case '4. Show films sorted in alphabetical order':
        operations.request_order_alpha();
      break;
      case '5. Find film by name':
        operations.request_find_film();
      case '8. Exit':
        return ;
    }
  })
  .catch(console.error);