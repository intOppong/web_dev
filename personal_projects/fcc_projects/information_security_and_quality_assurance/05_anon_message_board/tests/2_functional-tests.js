/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      
      test('Test POST /api/threads/:board', function(done){
         chai.request(server)
          .post('/api/threads/:boards')
          .end(function(err, res){
            assert.equal(res.status, 200);
            done();
          });
      });
    });
    
    suite('GET', function() {
      test('Test GET /api/threads/:board', function(done){
         chai.request(server)
          .get('/api/threads/:boards')
          .end(function(err, res){
            assert.equal(res.status, 200);
            done();
          });
      });
    });
    
    suite('DELETE', function() {
      test('Test PUT /api/threads/:board', function(done){
         chai.request(server)
          .delete('/api/threads/:boards')
          .end(function(err, res){
            assert.equal(res.status, 200);
            done();
          });
      });
    });
    
    suite('PUT', function() {
      test('Test DELETE /api/threads/:board', function(done){
         chai.request(server)
          .put('/api/threads/:boards')
          .end(function(err, res){
            assert.equal(res.status, 200);
            done();
          });
      });
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      test('Test POST /api/replies/:board', function(done){
         chai.request(server)
          .post('/api/replies/:boards')
          .end(function(err, res){
            assert.equal(res.status, 500);
            done();
          });
      });
    });
    
    suite('GET', function() {
      test('Test GET /api/replies/:board', function(done){
         chai.request(server)
          .get('/api/replies/:boards')
          .end(function(err, res){
            assert.equal(res.status, 500);
            done();
          });
      });
    });
    
    suite('PUT', function() {
      test('Test PUT /api/replies/:board', function(done){
         chai.request(server)
          .put('/api/replies/:boards')
          .end(function(err, res){
            assert.equal(res.status, 200);
            done();
          });
      });
    });
    
    suite('DELETE', function() {
      test('Test DELETE /api/replies/:board', function(done){
         chai.request(server)
          .delete('/api/replies/:boards')
          .end(function(err, res){
            assert.equal(res.status, 200);
            
          });
        done();
      });
    });
    
  });

});
