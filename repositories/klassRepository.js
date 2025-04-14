import Exception from '../exceptions/Exception.js';
import { Klass } from '../models/index.js';

const getAllKlass = async ({
    page,
    size,
    searchString
}) => {
    page = parseInt(page)
    size = parseInt(size)
    //aggregate data for all students
    let filteredKlass = await Klass.aggregate([
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
    return filteredKlass;

}

const getDetailKlass = async (klassId) => {
    const klass = await Klass.findById(klassId)
    if (!klass) {
        throw new Exception('Cannot find Class with id ' + klassId)
    }

    return klass
}

const insertKlass = async ({
    name
}) => {
    try {
        debugger
        const klass = await Klass.create({
            name
        })
        return klass
    }
    catch (exception) {
        //Error from Validation
        if (!!exception.errors) {
            throw new Exception('Input error', exception.errors)
        }
    }

}

const updateKlass = async ({
    id,
    name
}) => {
    const klass = await Klass.findById(id)
    klass.name = name ?? klass.name
    await klass.save()
    return klass
}


export default {
    getAllKlass,
    getDetailKlass,
    insertKlass,    
    updateKlass
}