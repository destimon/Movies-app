const { prompt } = require('enquirer');
const { info, warn, log, error, indent } = require('pretty-console-logs');

module.exports = {
  output_formatted_info(obj1) {
    let dateObj = new Date(obj1.date);
  
    log.m('Title: ' + obj1.name);
    log.m(`Release Year: ${dateObj.getFullYear()}`);
    log.m('Format: ' + obj1.type);
    process.stdout.write('Stars: ');
    obj1.actors.forEach(obj2 => {
      process.stdout.write(` ${obj2.firstName} ${obj2.secondName}, `);
    })
  },
  
  // TODO: Find time and refactor this shitcode
  async get_actors() {  
  let array = [];

  while (true) {
    let obj = {};

    let response = await prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Print first name of the actor'
      }
    ])
    obj.firstName = response.firstName;

    response = await prompt([
      {
        type: 'input',
        name: 'secondName',
        message: 'Print second name of the actor'
      }
    ])
    obj.secondName = response.secondName;

    array.push(obj);
    response = await prompt([
      {
        type: 'confirm',
        name: 'question',
        message: 'Stop?'
      }
    ]);
    if (response.question)
      return array;
    }
  },

  get_film_name() {
    return prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Print name of the film'
      }
    ])
  },

  get_full_info() {
    return prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Print name of the film'
      },
      {
        type: 'input',
        name: 'date',
        message: 'Print date of the film'
      },
      {
        type: 'select',
        name: 'type',
        message: 'Select type of the film',
        choices: [
          'VHS', 'DVD', 'Blu-Ray'
        ]
      },
    ]);
  },

  async get_actor_name() {
    let actorObj = {};

    let response = await prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Print first name of the actor'
      }
    ])
    actorObj.firstName = response.firstName;

    response = await prompt([
      {
        type: 'input',
        name: 'secondName',
        message: 'Print second name of the actor'
      }
    ])
    actorObj.secondName = response.secondName;
    return (actorObj);
  },

  async get_file_name() {
    let response = await prompt([
      {
        type: 'input',
        name: 'file',
        message: 'Print name of the file(must be in same directory as CLI): '
      }
    ])
    return response.file
  }
}