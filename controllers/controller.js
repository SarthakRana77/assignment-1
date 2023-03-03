
const Agencies=require('../model/agencies_clients');
exports.getAgent_client = (req, res, next) => {
  res.render('firstPage', {
    pageTitle: 'Enter Agency/Client',
    path: '/',
    activeShop: true,
    productCSS: true
  });
};


exports.postUpdateClient = (req, res, next) => {
  const input = JSON.parse(JSON.stringify(req.body));
  // console.log(input);
  const output = {
    agencyId:input.agencyId,
    agencyName: input.agencyName,
    address1: input.address1,
    address2: input.address2,
    state: input.state,
    city: input.city,
    phone: input.phone,
    clients: []
  };
  for (const key in input) {
    if (key.startsWith('clients[')) {
      const matches = key.match(/\[(\d+)\]\[(.+)\]/);
      const index = parseInt(matches[1]);
      const field = matches[2];
      if (!output.clients[index]) {
        output.clients[index] = {};
      }
      output.clients[index][field] = input[key];
    }
  }
  console.log(output.clients);
  const agency=new Agencies({
    agencyId:output.agencyId,
    agencyName:output.agencyName,
    address1:output.address1,
    address2:output.address2,
    state:output.state,
    city:output.city,
    phone:output.phone,
    clients:output.clients,
  })
  agency
  .save()
  .then(result=>{
    console.log("Data Added");
    res.render('secondPage', {
      pageTitle: 'Update Client',
      path: '/check-client',
      activeShop: true,
      productCSS: true
    });
  })
  .catch
    (err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }); 
  
};

exports.getFp=(req,res,next)=>{
  res.render('secondPage',{
    pageTitle: 'Update Client',
    path: '/check-client',
    activeShop: true,
    productCSS: true
  })
}

exports.postUc=(req,res,next)=>{
  var emailtocheck=req.body.semail;
  Agencies.find({"clients.email" : emailtocheck})
  .then(result=>{
  
    console.log(result[0].clients[0]);
    res.render('duplicate',{
      pageTitle: 'Updating Client',
      path: '/check-client',
      activeShop: true,
      productCSS: true,
      oldInput:{
        email:result[0].clients[0].email,
        name:result[0].clients[0].name,
        number:result[0].clients[0].number,
        bill:result[0].clients[0].bill,
        oldemail:emailtocheck
      }
    })  
  })
  .catch
    (err => {
      res.render('noclient',{
        path:'/noclient'
      });
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}


exports.postClientSuccessupdated=(req,res,next)=>{
console.log(req.body);
const updatedname=req.body.name;
const updatedemail=req.body.email;
const updatednumber=req.body.number;
const updatedbill=req.body.bill;
const oldemail=req.body.oldemail;
Agencies.updateMany({"clients.email" : oldemail}, {$set: {"clients.$": {name: updatedname, email: updatedemail, number: updatednumber, bill: updatedbill}}})
  .then(result => {
    console.log('Updated clients!');
    res.render('thanks',{
      path:'/maxbilling'
    });
  })
  .catch
    (err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
   });
}

