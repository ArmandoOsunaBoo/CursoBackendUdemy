const action = require('../models').action;
 const User = require('../models').User;

module.exports = {
  see: function(req,res){
    action.findAll().then((actions)=>{
      res.render('actions/index',{miObj:req.user.actions});
    })
  },
  pick: function(req,res){
    action.findByPk(req.params.id,{
      include: [{
        model: User,
        as: 'user'
      }]
    }).then(function(actions){
      res.render('actions/pick',{actions:actions});
    })
  },
  change: function(req,res){
    action.findByPk(req.params.id).then(function(actions){
      res.render('actions/change',{actions:actions});
    })
  },
  destroy:function(req,res){
action.destroy({
  where: {
    id: req.params.id
    }
  }).then(function(contEliminados){
    res.redirect('/actions');
  })
  },
  update:function(req,res){
    action.update( {nombre:req.body.nombre} , { where:{id:req.params.id} } ).then(function(){
     res.redirect('/actions');
    });
  //  action.findByPk(req.params.id).then(action=>{
    //  action.nombre = req.body.nombre;
    //  action.save().then(function(actions){
    //    res.render('actions/pick',{actions:actions});
    //  });
  //  })
  },
   create: function(req,res){
     action.create({
       nombre: req.body.nombre,
       userId: req.user.id
     }).then(result=>{
       res.json(result);
     }).catch(err=>{
       console.log(err);
       res.json(err);
     })
   },
   register: function(req,res){
     res.render('actions/register');
   }
};
