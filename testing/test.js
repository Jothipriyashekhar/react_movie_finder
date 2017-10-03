var app = require('../server')();
var expect = require('chai').expect;
var assert = require('chai').assert;
var request = require("supertest");
var should = require('should');
var supertest=require('supertest');
var sinon = require('sinon');
request = request(app);
var url=supertest("http://localhost:8000");
var token= '';

describe("Testing routes", function(err){
  it("should check  login", function(done){
      url
        .post('users/login')
        .send({"username": "joe", "password":"123"})
        .expect(200)
        .end(function(err,res){
          should.not.exist(err);
          token = res.body.token;
          done();
        });
        });

   it("add users",function(done){
     let user = {}
     user.Username = 'joedhana'
     user.Password = 'test123'
     user.Favourites = ['Fidaa']
     url
         .post('/users/newusers')
         .set({"Authorization":token})
         .send(user)
         .expect(200)
         .end(function(err, res){
           if (err) throw err;
           done();
      });
   });
 });
