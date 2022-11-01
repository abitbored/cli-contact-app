const yargs = require('yargs');
const contacts = require('./contacts');

yargs.command({
    command: 'add',
    describe: 'Menambahkan kontak baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        noHP: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Alamat Email',
            demandOption: false,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.addContact(argv.nama, argv.noHP, argv.email);
    },
}).demandCommand();

yargs.command({
    command: 'list',
    describe: 'Menampilkan seluruh baru',
    handler() {
        contacts.listContact();
    },
});

yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    },
});

yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();