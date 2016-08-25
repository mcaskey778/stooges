function person(name, age) {
    function sayHi() {
        return 'Hello ' + this.name + '!';
    }

    function askAge() {
        return (this.age>40) ? 'It is a rude thing to ask.' : this.age;
    }

    function job() {
        return 'I do not work.'
    }

    function noAccess() {
        return 'You cannot access this function because it is not exported';
    }

    return {
        name: name,
        age: age,
        sayHi: sayHi,
        askAge: askAge,
        job: job
    }
}

// we add the Person function to the exports object module.exports = person; 
module.exports = person;
