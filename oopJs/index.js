class User {
    constructor(data) {
        this.lastName = data.lastName;
        this.frstName = data.frstName;
        this.age = data.age;
        this.status = data.status;


    }
    // set weight(paramsUs) {
    //     this.weight = paramsUs;
    //     return this.weight;
    // }
    get getAge() {
        return this.age

    }
    set setAge(a) {
        this.age = a;
        return this.age;
    }
    updataUser(params) {
        params.frstName && (this.frstName = params.frstName);
        params.lastName && (this.lastName = params.lastName);
        params.age && (this.age = params.age);
        params.status && (this.status = params.status);


    }

}
class ManUser extends User {
    static gander = { value1: 'man' };
    constructor(params) {
        super(params)
        this.gender2 = this.gander
        this.militaryBookletNumber = params.militaryBookletNumber;
        this.pasportNumber = params.pasportNumber;
    }
}
const manUserObj = new ManUser({
    lastName: "Artashes",
    frstName: "Margaryan",
    age: 25,
    status: true,
    militaryBookletNumber: 254582542121,
    pasportNumber: 3255225254,
})
console.log(manUserObj.frstName);
manUserObj.updataUser({
    lastName: "Arsen",
    frstName: "Pityan",
})

console.warn(manUserObj);