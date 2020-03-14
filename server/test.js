let array = [ 'one', 'two', 'three', 'four', 'five' ];

let obj = {
  actors: [ 'one', 'two', 'three', 'four', 'five' ]
}

let obj2 = JSON.stringify(obj.actors);

console.log(array);

console.log(JSON.parse(obj2));