const request = require('supertest');
const app = require('./index'); // Assuming your main app file is index.js
const {User,Admin,Course} = require("./db/index")
const {hash} = require("./auth/index")
const mongoose = require("mongoose")
require("dotenv").config()

const connectionString = process.env.MONGO_URI;

beforeAll(async () => {
    await mongoose.connect(connectionString);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

describe('User Routes', () => {
    let userToken;
    let userId;
    let courseId;
    const username = "testuser"
    const password = "testpassword"
    const hashedPassword =  hash(password)
    beforeAll(async()=>{
        await User.deleteMany({})
        await Admin.deleteMany({})
        await Course.deleteMany({})
    })
    it('should signup a user', async () => {
      const response = await request(app)
        .post('/user/signup')
        .send({ username: username, password: password });
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ message: 'user registration successfull!' });
    });

    it('should signin a user', async () => {
      const response = await request(app)
        .post('/user/signin')
        .send({ username: username, password: password });
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('user signin successfull');
      userToken = response.body.token;
    });

    it('should create a course by admin', async () => {
        const adminUsername = "testadmin"
        const adminPassword = "testadminpassword"
        const adminHashedPassword = await hash(adminPassword)
        await Admin.create({
            username:adminUsername,
            password:adminHashedPassword
        })
        const adminSigninResponse = await request(app)
        .post('/admin/signin')
        .send({ username: adminUsername, password: adminPassword });
        const adminToken = adminSigninResponse.body.token;
        const response = await request(app)
          .post('/admin/courses')
          .set('Authorization', adminToken)
          .send({
            title: 'Test Course',
            description: 'Test Description',
            imageLink: 'https://test.com/image.jpg',
            price: 100,
          });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('course creation successfull!');
        const course = await Course.findOne({title:"Test Course"})
        courseId = course._id;
      });
    it('should get all courses', async () => {
        const response = await request(app)
          .get('/user/courses')
          .set('Authorization', userToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('courses fetched successfully!');
        expect(response.body.courses).toBeDefined();
      });
    it('should get a specific course by ID', async () => {
        const response = await request(app)
          .get(`/user/courses/${courseId}`)
          .set('Authorization', userToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('courses fetched successfully!');
        expect(response.body.course).toBeDefined();
      });
    it('should purchase a course', async () => {
        const response = await request(app)
          .post(`/user/courses/purchase/${courseId}`)
          .set('Authorization', userToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Course purchased successfully!');
      });
  });

  describe('Admin Routes', () => {
    let adminToken;
    const username = "testadmin"
    const password = "testadminpassword"
    beforeAll(async()=>{
        await User.deleteMany({})
        await Admin.deleteMany({})
        await Course.deleteMany({})
    })
    it('should signup an admin', async () => {
      const response = await request(app)
        .post('/admin/signup')
        .send({ username: username, password: password });
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ message: 'admin registration successfull!' });
    });

    it('should signin an admin', async () => {
      const response = await request(app)
        .post('/admin/signin')
        .send({ username: username, password: password });
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('admin signin successfull');
      adminToken = response.body.token;
    });

    it('should create a course', async () => {
      const response = await request(app)
        .post('/admin/courses')
        .set('Authorization', adminToken)
        .send({
          title: 'Test Course',
          description: 'Test Description',
          imageLink: 'https://test.com/image.jpg',
          price: 100,
        });
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('course creation successfull!');
    });

    it('should get all courses by admin', async () => {
        const response = await request(app)
          .get('/admin/courses')
          .set('Authorization', adminToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.courses).toBeDefined();
      });
  });
