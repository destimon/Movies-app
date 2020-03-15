const { prompt } = require('enquirer');
const axios = require('axios');
const moment = require('moment');

function output_formatted_info(obj1) {
  let dateObj = new Date(obj1.date);

  console.log('Name: ' + obj1.name);
  console.log(`Date: ${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`);
  console.log('Type: ' + obj1.type);
  console.log('Actors: ');
  obj1.actors.forEach(obj2 => {
    console.log(` ${obj2.firstName} ${obj2.secondName}`);
  })
}

// TODO: Find time and refactor this shitcode
async function get_actors() {
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
}

function get_film_name() {
  return prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Print name of the film'
    }
  ])
} 

function get_full_info() {
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
}

module.exports = {
  async request_add_film() {
    const response = await get_full_info();
    let actors = await get_actors();

    console.log(actors);
    try {
      let res = await axios.post('http://127.0.0.1:3000/add', null, {
        data: {
          actors,
        },
        params: {
          name: response.name,
          date: moment(response.date, 'YYYY-MM-DD').toDate(),
          type: response.type,
        }
      })

      if (res.status == 200) {
        console.log('Success! Code: ', res.status);
      } else {
        console.log('Failure! Code: ', res.status);
      }
    } catch (err) {
      console.log('Error occured, unable to send request');
      console.error(err);
    }
  },

  async request_delete_film() {
    let response = await get_film_name();

    try {
      let res = await axios.post(`http://127.0.0.1:3000/delete/${response.name}`)
      if (res.status == 200) {
        console.log('Success! Code: ', res.status);
      } else {
        console.log('Failure! Code: ', res.status);
      }
    } catch (err) {
      console.log('Error occured, unable to send request');
      console.error(err);
    }
  },

  async request_show_film() {
    let response = await get_film_name();

    try {
      let res = await axios.get(`http://127.0.0.1:3000/films/${response.name}`)

      if (res.data) {
        output_formatted_info(res.data);
      } else {
        console.log('Not found');
      }
    } catch (err) {
      console.log('Error occured, unable to send request');
      console.error(err);
    }

  },

  request_order_alpha() {
    axios.get('http://127.0.0.1:3000/show?asc=alpha')
    .then(res => {
      console.log('-----------');
      res.data.forEach(obj1 => {
        output_formatted_info(obj1);
        console.log('-----------');
      })
    })
    .catch(err => {
      console.log('Error occured, unable to send request');
      console.error(err);
    })
  },

  // request_find_film() {
  //   axios.
  // }
}
