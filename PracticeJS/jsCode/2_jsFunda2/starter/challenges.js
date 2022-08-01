const jonas={
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYeah: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,

    ageCal: function (){
        this.age= 2022-this.birthYeah;
        return this.age
    }
}

// write Jonas is a 31 years old teacher, and has a/no driving licence.
console.log(`${jonas.firstName} is a ${jonas.ageCal()} years old ${jonas.job}, and has ${jonas.hasDriversLicense?"a":"no"} driving licence.`)