const { prompt } = require('enquirer');
const { warn, error } = require('pretty-console-logs');
const chalk = require('chalk');

async function check_actor_dup(array, obj) {
  let bool = false;

  await array.forEach((el) => {
    if (JSON.stringify(el) === JSON.stringify(obj)) {
      bool = true;
      error('Duplicates in stars is forbidden');
    }
  })
  return bool;
}

module.exports = {
  output_formatted_info(obj1) {
    warn.m(`[ID ${obj1._id}]`);
    console.log(chalk.green('Title: ') + obj1.name);
    console.log(`${chalk.green('Release Year:')} ${obj1.date}`);
    console.log(chalk.green('Format: ') + obj1.type);
    process.stdout.write(chalk.green('Stars:'));
    obj1.actors.forEach(obj2 => {
      process.stdout.write(` ${obj2.firstName} ${obj2.secondName} ${chalk.green('|')}`);
    });
    process.stdout.write('\n');
  },
  
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
      ]);
      obj.firstName = response.firstName;

      response = await prompt([
        {
          type: 'input',
          name: 'secondName',
          message: 'Print second name of the actor'
        }
      ]);
      obj.secondName = response.secondName;

      let check = await check_actor_dup(array, obj);
      if (check === false) {
        array.push(obj);
      }
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
    ]);
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
    ]);
    actorObj.firstName = response.firstName;

    response = await prompt([
      {
        type: 'input',
        name: 'secondName',
        message: 'Print second name of the actor'
      }
    ]);
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
    ]);
    return response.file;
  }
};