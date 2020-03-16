const axios = require('axios');
const moment = require('moment');
const prompt_met = require('./prompt_methods');
const { info, warn, log, error } = require('pretty-console-logs');
const fs = require('fs');
const FormData = require('form-data');

module.exports = {
  async request_add_film() {
    const response = await prompt_met.get_full_info();
    let actors = await prompt_met.get_actors();

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
        info('Success! Code: ', res.status);
      } else {
        error('Failure! Code: ', res.status);
      }
    } catch (err) {
      error('Error occured, unable to send request');
      console.error(err);
    }
  },

  async request_delete_film() {
    let response = await prompt_met.get_film_name();

    try {
      let res = await axios.delete(`http://127.0.0.1:3000/delete/${response.name}`)
      if (res.status == 200) {
        info('Success! Code: ', res.status);
      } else {
        error('Failure! Code: ', res.status);
      }
    } catch (err) {
      error('Error occured, unable to send request');
      console.error(err);
    }
  },

  async request_show_film() {
    let response = await prompt_met.get_film_name();

    try {
      let res = await axios.get(`http://127.0.0.1:3000/films/${response.name}`)

      if (res.data) {
        prompt_met.output_formatted_info(res.data);
      } else {
        log('Not found');
      }
    } catch (err) {
      error('Error occured, unable to send request');
      console.error(err);
    }

  },

  request_order_alpha() {
    axios.get('http://127.0.0.1:3000/show?asc=alpha')
    .then(res => {
      info.m('-----------');
      res.data.forEach(obj1 => {
        prompt_met.output_formatted_info(obj1);
        info.m('\n-----------');
      })
    })
    .catch(err => {
      error('Error occured, unable to send request');
      console.error(err);
    })
  },

  async request_find_film() {
    let response = await prompt_met.get_film_name();

    try {
      let res = await axios.get(`http://127.0.0.1:3000/films/${response.name}`)
      
      if (res.data) {
        prompt_met.output_formatted_info(res.data);
      } else {
        log('Not found');
      }
    } catch (err) {
      error('Error occured, unable to send request');
      console.error(err);
    }
  },

  async request_find_actor() {
    let response = await prompt_met.get_actor_name(); // actor object

    try {
      let res = await axios.get(`http://127.0.0.1:3000/show`, {
        data: {
          actor: response
        }
      });

      if (res.data) {
        prompt_met.output_formatted_info(res.data);
      } else {
        log('Not found');
      }
    } catch (err) {
      error('Error occured, unable to send request');
      console.error(err);
    }
  },

  async request_import_file() {
    let filename = await prompt_met.get_file_name();
    
    try {
      let formData = new FormData();
      formData.append('file', fs.createReadStream(filename));
      
      await axios.post('http://127.0.0.1:3000/file', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        },
      })
      .then(res => {
        if (res.status == 200) {
          info('Success! Code: ', res.status);
        } else {
          error('Failure! Code: ', res.status);
        }
      })
      .catch(err => {
        error('Error occured, unable to send request');
        console.error(err);
      })
    } catch (err) {
      console.error(err);
      error('Error occured in file upload');
    }

  }
}
