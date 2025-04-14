import Exception from '../exceptions/Exception.js';
import { Student } from '../models/index.js';
import { faker } from '@faker-js/faker';


const getAllStudent = async ({
    page,
    size,
    searchString
}) => {
    page = parseInt(page)
    size = parseInt(size)
    //aggregate data for all students
    let filteredStudents = await Student.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: { $regex: `.*${searchString}.*`, $options: 'i' }
                    },
                    {
                        email: { $regex: `.*${searchString}.*`, $options: 'i' }
                    },
                    {
                        address: { $regex: `.*${searchString}.*`, $options: 'i' }
                    }
                ]
            }
        },
        { $skip: (page - 1) * size },
        { $limit: size },

    ])
    return filteredStudents;

}

const getDetailStudent = async (studentId) => {
    const student = await Student.findById(studentId)
    if (!student) {
        throw new Exception('Cannot find Student with id ' + studentId)
    }

    return student
}

const insertStudent = async ({
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address
}) => {
    //console.log(`Insert student with name: ${name}`);
    try {
        const student = await Student.create({
            name,
            email,
            languages,
            gender,
            phoneNumber,
            address
        })
        return student
    }
    catch (exception) {
        //Error from Validation
        if (!!exception.errors) {
            throw new Exception('Input error', exception.errors)
        }
    }

}

const updateStudent = async ({
    id,
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address
}) => {
    const student = await Student.findById(id)
    student.name = name ?? student.name
    student.email = email ?? student.email
    student.languages = languages ?? student.languages
    student.gender = gender ?? student.gender
    student.phoneNumber = phoneNumber ?? student.phoneNumber
    student.address = address ?? student.address
    await student.save()
    return student
}

async function generateFakeStudents() {
    let fakeStudents = [];
    for (let i = 0; i < 1000; i++) {
        let fakeStudent = {
            name: `${faker.person.fullName()}-fake`,
            email: faker.internet.email(),
            languages: [
                faker.helpers.arrayElement(['Englisch', 'Japanese', 'French']),
                faker.helpers.arrayElement(['Korean', 'Vietnamese', 'Chinese'])
            ],
            gender: faker.helpers.arrayElement(['Male', 'Female']),
            phoneNumber: faker.phone.number('+48 91 ### ## ##'),
            address: "235 nvc HCM city"
        };
        fakeStudents.push(fakeStudent);
    }
    await Student.insertMany(fakeStudents);
    // [...Array(1000).keys()].forEach(async(element) => {
    //     let fakeStudent = {
    //         name: `${faker.person.fullName()}-fake`,
    //         email: faker.internet.email(),
    //         languages: [
    //             faker.helpers.arrayElement(['Englisch', 'Japanese', 'French']),
    //             faker.helpers.arrayElement(['Korean', 'Vietnamese', 'Chinese'])
    //         ],
    //         gender: faker.helpers.arrayElement(['Male', 'Female']),
    //         phoneNumber: faker.phone.number('+48 91 ### ## ##'),
    //         address: "235 nvc HCM city"
    //     }
    //     await Student.create(fakeStudent);
    // });
}

export default {
    getAllStudent,
    insertStudent,
    generateFakeStudents,
    getDetailStudent,
    updateStudent
}