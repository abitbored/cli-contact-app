const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('./data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
};

const addContact = (nama, noHP, email) => {
    const contact = { nama, noHP, email };
    const contacts = loadContact()

    const duplikat = contacts.find((c) => c.nama === nama);
    if (duplikat) {
        console.log(
            chalk.red.inverse.bold('Kontak dengan nama tersebut sudah terdaftar, silahkan gunakan nama lain!')
        );
        return 0;
    }

    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(
            chalk.red.inverse.bold('Nomor handphone tidak valid, silahkan masukkan nomor yang benar!')
        );
        return 0;
    }

    if (email) {
        if (!validator.isEmail(email)) {
            console.log(
                chalk.red.inverse.bold('Email tidak valid, silahkan masukkan alamat email yang benar!')
            );
            return 0;
        }
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    return console.log(
        chalk.green.bold.inverse('Terima kasih sudah memasukkan data.'),
    );
};

const listContact = () => {
    const contacts = loadContact().sort((a, b) => {
        const nameA = a.nama.toLowerCase();
        const nameB = b.nama.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    
    console.log(
        chalk.cyan.inverse.bold('Daftar Kontak: ')
    );

    contacts.forEach((c, i) => {
        console.log(`${i + 1}. ${c.nama} - ${c.noHP}`);
    });
}

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((c) => c.nama.toLowerCase() === nama.toLowerCase());

    if (!contact) {
        console.log(
            chalk.red.inverse.bold(`Kontak dengan nama ${nama} tidak ditemukan`)
        );
        return 0;
    }

    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.noHP);
    if (contact.email) {
        console.log(contact.email);
    }

    return 0;
};

const deleteContact = (nama) => {
    const contacts = loadContact();

    const newContacts = contacts.filter((c) => c.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length === newContacts.length) {
        console.log(
            chalk.red.inverse.bold(`${nama} tidak ditemukan!`),
        );
        return false;
    }

    fs.writeFileSync('./data/contacts.json', JSON.stringify(newContacts));

    console.log(
        chalk.green.inverse.bold('Kontak berhasil dihapus!')
    );
};

module.exports = {
    addContact,
    listContact,
    detailContact,
    deleteContact,
};