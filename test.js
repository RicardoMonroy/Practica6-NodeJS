const request = require('supertest');
const chai = require('chai');
const app = require('./server');
const { expect } = chai;

describe('Tasks API', () => {
    // it('should create a new task', (done) => {
    //     request(app)
    //         .post('/tasks')
    //         .send({ title: 'Test Task', description: 'Test Description' })
    //         .end((err, res) => {
    //             expect(res.status).to.equal(200);
    //             expect(res.body.title).to.equal('Test Task');
    //             done();
    //         });
    // });

    // Crear una tarea antes de la pruebas
    before((done) => {
        request(app)
            .post('/tasks')
            .send({ title: 'Test Task3', description: 'Test Description3' })
            .end((err, res) => {
                taskId = res.body.id;
                done();
            });
    });

    // Leer tareas
    it('should get all tasks', (done) => {
        request(app)
            .get('/tasks')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    // Actualizar tareas
    it('should update a task', (done) => {
        request(app)
            .put(`/tasks/${taskId}`)
            .send({ title: 'Updated Task', description: 'Updated Description' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.include('Changed');
                done();
            });
    });

    // Eliminar tareas
    it('should delete a task', (done) => {
        request(app)
            .delete(`/tasks/${taskId}`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.include('Deleted');
                done();
            });
    });
});