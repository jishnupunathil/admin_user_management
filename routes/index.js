var express = require('express');
var router = express.Router();
const user_helper = require('../helpers/user_helper');

/* GET home page. */


router.get('/', function(req, res, next) {
  let user=req.session.user
  let products = [{ name: "Iphone 13", category: "Smart Phone", description: "The biggest Pro camera system upgrade ever. Super Retina XDR display with Pro - Motion for a faster, more responsive feel.", Image: "https://m.media-amazon.com/images/I/315vs3rLEZL.jpg" },
  { name: "Samsung s22 ultra", category: "Smart Phone", description: "The Galaxy S22 Ultra is slim and bold, with a polished frame that surrounds the extruded shape for elegant symmetry.", Image: "https://m.media-amazon.com/images/I/71PvHfU+pwL._SL1500_.jpg" },
  { name: "Mi 12 pro", category: "Smart Phone", description: "The smartphone has an AMOLED display,measures 6.73 inches and has a 1440x3200 pixel resolution", Image: "https://specifications-pro.com/wp-content/uploads/2021/10/Xiaomi-Mi-12-Pro-1.jpg" },
  { name: "Iquoo 8", category: "Smart Phone", description: "Features 6.78″ display, Snapdragon 888+ 5G chipset, 4500 mAh battery, 512 GB storage, 12 GB RAM.", Image: "https://www.gizmochina.com/wp-content/uploads/2021/08/vivo-iqoo-8-01.jpg" }

  ]

  res.render('index',{products,Action1:'login',Name:'Home',user})
});

router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render("login", { loginErr: req.session.userLoginErr });
    req.session.userLoginErr = false;
  }
})

router.get('/signup',(req,res)=>{
  res.render('signup')
})

router.post('/signup',(req,res)=>{
  console.log(req.body)
  user_helper.doSignup(req.body).then((response)=>{
    console.log(response);
  })
  res.redirect('/')
})

router.post('/login', function (req, res) {

  user_helper.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.userLoginErr="invalid user name or password"
      res.redirect('/login')
    }
  })

})

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
})


module.exports = router;
