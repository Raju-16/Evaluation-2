const express = require("express");
const res = require("express/lib/response");
const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");

const app = express();

const connect = () => {
  return mongooose.connect("mongodb://127.0.0.1:27017");
};

// User Schema

const userschema = new mongooose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  gender: {type:String, required:false}
},
{
    timestamps:true,
    versionKey:false
});

const User = mongooose.model("user", userschema);

// branch details scheema
const branchschema = new mongooose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  IFSC: { type: String, required: true },
  MICR: { type: Number, required: true },
  userid: {type: mongoose.Schema.Types.ObjectId, ref: User, required:true}
},{
    timestamps:true,
    versionKey:false
});


const Branch = mongooose.model("branch", branchschema);


// MasterAccount Schema
const MasterBranch = new mongoose.Schema(
  {
    balance: { type: String, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    branchid: { type: mongoose.Schema.Types.ObjectId, ref: branch, required: true },
    savingid: { type: mongoose.Schema.Types.ObjectId, ref: saving, required: true },
    fixedid: { type: mongoose.Schema.Types.ObjectId, ref: fixed, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Master = mongooose.model("master", MasterBranch);


// Saving Account Schema
const savingschema = new mongooose.Schema(
  {
    account_number: { type: String, required: true, unique: true },
    balance: { type: String, required: true },
    interestRate: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Saving = mongooose.model("saving", savingschema);


// Fixed Account Schema
const fixedschema = new mongooose.Schema(
  {
    account_number: { type: String, required: true, unique: true },
    balance: { type: String, required: true },
    interestRate: { type: String, required: true },
    startDate: { type: String, required: true },
    maturityDate: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Fixed = mongooose.model("fixed", fixedschema);



// CRUD OPERATIONS
// for user
app.get("/users", async(req, res)=> {

    try {
        const Userdata = await User.find().lean().exec();

        return res.status(200).send(Userdata)

    } catch (error) {
        return res.status(500).send(error)
    }
    
})



app.post("/users", async(req, res)=> {

    try {
       const user = await User.create(req,data);

        return res.status(200).send(user)

    } catch (error) {
        return res.status(500).send(error)
    }
    
})



app.get("/users/:id", async(req, res)=> {

    try {
       const user = await User.findById(req.params.id).lean().exec();

        return res.status(200).send(user)

    } catch (error) {
        return res.status(500).send(error)
    }
    
})



app.patch("/users/:id", async(req, res)=> {

    try {
       const user = await User.findByIdAndUpdate(req.params.id, req.data, {new:true}).lean().exec();

        return res.status(200).send(user)

    } catch (error) {
        return res.status(500).send(error)
    }
    
})



app.delete("/users/:id", async(req, res)=> {

    try {
       const user = await User.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(user)

    } catch (error) {
        return res.status(500).send(error)
    }
    
})


// CRUD FOR THE BRANCH

app.get("/branch", async (req, res) => {
  try {
    const branch = await Branch.find().lean().exec();

    return res.status(200).send(branch);
  } catch (error) {
    return res.status(500).send(error);
  }
});


app.post("/branch", async (req, res) => {
  try {
    const branch = await Branch.create(req.data);

    return res.status(200).send(branch);
  } catch (error) {
    return res.status(500).send(error);
  }
});


app.get("/brach/:id", async(req, res)=> {

    try {
      const branch = await Branch.findById(req.params.id).lean().exec();

      return res.status(200).send(branch);
    } catch (error) {
      return res.status(500).send(error);
    }


})


app.patch("/brach/:id", async(req, res)=> {

    try {
      const branch = await Branch.findByIdAndUpdate(req.params.id, req.data, {new:true}).lean().exec();

      return res.status(200).send(branch);
    } catch (error) {
      return res.status(500).send(error);
    }


})


app.delete("/brach/:id", async(req, res)=> {

    try {
      const branch = await Branch.findByIdAndDelete(req.params.id).lean().exec();

      return res.status(200).send(branch);
    } catch (error) {
      return res.status(500).send(error);
    }


})


//  CRUD FOR THE MasterAccount

app.get("/master", async(req, res)=> {

  try {
    const master = await Master.find().lean().exec();

    return res.status(200).send(branch);
  } catch (error) {
    return res.status(500).send(error);
  }

})


app.post("/master", async(req, res)=> {

  try {
    const master = await Master.create(req.data);

    return res.status(200).send(branch);
  } catch (error) {
    return res.status(500).send(error);
  }

})


app.get("/master/:id", async(req, res)=> {

  try {
    const master = await Master.findById(req.params.id).lean().exec();

    return res.status(200).send(branch);
  } catch (error) {
    return res.status(500).send(error);
  }

})


app.patch("/master/:id", async(req, res)=> {

  try {
    const master = await Master.findByIdAndUpdate(req.params.id, req.data, {new:true}).lean().exec();

    return res.status(200).send(branch);
  } catch (error) {
    return res.status(500).send(error);
  }

})


app.delete("/master/:id", async(req, res)=> {

  try {
    const master = await Master.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(branch);
  } catch (error) {
    return res.status(500).send(error);
  }

})

app.listen(8000, (req, res) => {
  try {
    connect();

    console.log(" we are on 8000 port");
  } catch (error) {
    return res.status(500).send(error);
  }
});
