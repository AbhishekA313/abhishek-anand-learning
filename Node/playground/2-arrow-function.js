// const square = (x) => x * x;

// console.log(square(3));

const event = {
    name: 'Birthday party',
    guestList: ['Name 1', 'Name 2', 'Name 3'],
    printGuestList() {
        console.log(`Guest list for ${this.name}`);

        this.guestList.forEach((guest) => console.log(`${guest} is attending ${this.name}!`));
    }
}

event.printGuestList();