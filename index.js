let cwd=process.cwd();
let nodepath=require('path');

let readConfig=(cwd)=>{
  let ph=false;
  try{
    ph=require(nodepath.join(cwd,'map-path.js'));
  }
  catch(e){
    throw `map-path.js is not exits in project root path,use module.exports={name:real path}`;
  }
  return ph;
};

let mapPath=(store=null)=>(cwd)=>{

  return (ph,type)=>{

    if(store===null){
      store=readConfig(cwd);

      if(!(typeof store==='object')){
        throw `map-path.js must use format like module.exports={name:real path}`;
      }
    }
    if(!(ph in store)){
      throw `${ph} is not map in map-path.js`;
    }

    if(type==='url'){
      return store[ph];
    }
    else{
      return require(store[ph]);
    }


  }

};



module.exports=mapPath(null)(cwd);
