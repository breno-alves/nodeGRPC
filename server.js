const path = require('path')
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const protoPath = path.resolve(__dirname, 'server.proto');

var packageDefinition = protoLoader.loadSync(
  protoPath,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

const serverProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(serverProto.HelloWorldGRPC.service, {
  greeting: (call, callback) => {
    let data = { msg: 'Hello World!!' };
    callback(null, data);
  }
});

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at 127.0.0.1:50051!!');
server.start();