const z = require("zod");

const adminSchema = z.object({
    username:z.string().min(3,"admin username must contain atleast 3 letters!"),
    password:z.string().min(6,"admin password must contain atleast 6 letters!")
})

const adminValidation = ({username,password}) =>{
    return adminSchema.safeParse({
        username:username,
        password:password
    });
}

const userSchema = z.object({
    username:z.string().min(3,"username must contain atleast 3 letters!"),
    password:z.string().min(6,"password must contain atleast 6 letters!")
})

const userValidation = ({username,password}) =>{
    return userSchema.safeParse({
        username:username,
        password:password
    });
}

const courseSchema = z.object({
    title:z.string().min(5,"course title should be atleast 5 letters!"),
    description:z.string().min(15,"course description should be at least 15 letters!"),
    price:z.number().gt(0,"price should be a positive number!")
})

const courseValidation = ({title,description,price})=>{
    return courseSchema.safeParse({
        title:title,
        description:description,
        price:price
    })
}


module.exports = {
    adminValidation,
    userValidation,
    courseValidation,
};
