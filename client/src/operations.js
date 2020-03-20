const axios = require('./config').axiosInstance;
const moment = require('moment');
const prompt_met = require('./prompt_methods');
const { info, log, error, warn } = require('pretty-console-logs');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

module.exports = {
  async request_add_film() {
    const response = await prompt_met.get_full_info();
    let actors = await prompt_met.get_actors();

    if (!actors || !response.name || !response.date || !response.type) {
      await error('You should fill all possible fields!')
      return ;
    }
    try {
      let res = await axios.post('/add', null, {
        data: {
          actors,
          name: response.name,
          date: response.date,
          type: response.type,
        }
      });

      if (res.status == 200) {
        info('Success! Code: ', res.status);
      }
      else if (res.status == 202) {
        log('Already exists');
      }
      else {
        error('Failure! Code: ', res.status);
      }
    } catch (err) {
      error('Error occured, unable to send request');
      if (err.response)
        log(err.response.data.message);
    }
  },

  async request_delete_film() {
    let response = await prompt_met.get_film_name();

    try {
      let res = await axios.delete(`/delete/${response.name}`);
      if (res.status == 200) {
        info('Success! Code: ', res.status);
      }
      else if (res.status == 202) {
        log('Not found');
      } else {
        error('Failure! Code: ', res.status);
      }
    } catch (err) {
      error('Error occured, unable to send request');
    }
  },

  async request_show_film() {
    let response = await prompt_met.get_film_name();

    try {
      let res = await axios.get(`/films/${response.name}`);

      if (res.data) {
        prompt_met.output_formatted_info(res.data);
      } else {
        log('Not found');
      }
    } catch (err) {
      error('Error occured, unable to send request');
    }

  },

  request_order_alpha() {
    axios.get('/show?asc=alpha')
      .then(res => {
        res.data.forEach(obj1 => {
          prompt_met.output_formatted_info(obj1);
          info.m('\n');
        });
      })
      .catch(() => {
        error('Error occured, unable to send request');
      });
  },

  async request_find_film() {
    let response = await prompt_met.get_film_name();

    try {
      let res = await axios.get(`/films/${response.name}`);
      
      if (res.data) {
        prompt_met.output_formatted_info(res.data);
      } else {
        log('Not found');
      }
    } catch (err) {
      error('Error occured, unable to send request');
    }
  },

  async request_find_actor() {
    let response = await prompt_met.get_actor_name(); // actor object

    try {
      let res = await axios.get('/show', {
        data: {
          actor: response
        }
      });

      if (res.data.length) {
        res.data.forEach(element => {
          prompt_met.output_formatted_info(element);
          console.log('\n');
        });
      } else {
        log('Not found');
      }
    } catch (err) {
      error('Error occured, unable to send request');
    }
  },

  async request_import_file() {
    let filename = await prompt_met.get_file_name();
    
    try {
      let ext = path.extname(filename);

      if (ext != '.txt') {
        log('Incorrect extension of file')
        throw 'Extension';
      }
      
      let formData = new FormData();
      formData.append('file', fs.createReadStream(filename));
      
      await axios.post('/file', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        },
      })
        .then(res => {
          if (res.status == 200) {
            info('Success! Code: ', res.status);
          } else if (res.status == 204) {
            warn('Failure! Code: ', res.status);
            log('File is empty or damaged');
          }
        })
        .catch((err) => {
          error('Error occured, unable to send request');
        });
    } catch (err) {
      error('Error occured in file upload');
    }

  }
};
