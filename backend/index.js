const express = require('express');
const fs = require('fs');
const cors = require("cors");
const app = express();
let corsOptions = {
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
};
app.use(cors(corsOptions));

// body-parser
var bodyparser = require('body-parser');
var urlParser = bodyparser.urlencoded({ extended: false });

const port = 3000;

const dssv = require('./DSSV.json');

app.get('/', (req, res) => {
    res.send('Welecome to EXPRESS backend!!');
});

//GET 
app.get('/students', (req, res) => {
    res.send(Object.values(dssv));
});
app.get('/students/:maSV', (req, res) => {
    console.log(req.params.maSV);
    let i = 0;
    for (i = 0; i < dssv.length; i++) {
        if (dssv[i].maSV == req.params.maSV) {
            break;
        }
    }
    if (i < dssv.length) {
        res.send(dssv[i]);
    }
    else {
        res.send("Not Fond!!");
    }
});

// POST
// app.post('/students',(req, res)=>{
//    console.log(req.body);
//    console.log(req.params);
//    let s = "123"
//    res.send({"student" : s});
// });
app.post("/students", urlParser,(req, res) => {
    var sv = req.body;
    var result = dssv.find(item => item.MaSV === sv.MaSV);
    console.log(result);
    if (result != null && result != undefined) {
        var obj = {
            success: false,
            msg: "Mã SV bị trùng!!!"
        };
        res.send(obj);
    }
    else {

        dssv.push(sv);
        fs.writeFile('DSSV.json', JSON.stringify(dssv), err => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("OK");
            }
        });

        var obj = {
            success: true,
             msg: "Thêm mới thành công!"
        };
        res.send(obj);
    }
});
////////PUT
app.put("/students", urlParser,(req, res) => {
    var sv = req.body;
    var i = dssv.findIndex(item => item.MaSV === sv.MaSV);
    console.log(i);
    if (i != null && i != undefined) {
        ///cập nhật 
        dssv[i] = sv;
        fs.writeFile('DSSV.json', JSON.stringify(dssv), err => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("OK");
            }
        });

        var obj = {
            success: true,
             msg: "Cập nhật thành công!"
        };
        res.send(obj);
 
    }
    else {

            
        var obj = {
            success: false,
            msg: "Mã SV không tồn tại!!!"
        };
        res.send(obj);
    }
});

app.delete("/students", urlParser, (req, res) => {
    var sv = req.body;
    var i = dssv.findIndex(item => item.MaSV === sv.MaSV);
    console.log(i);
    if (i != null || i != undefined) {
       dssv.splice(i,1);
       fs.writeFile('DSSV.json', JSON.stringify(dssv), err => {
        if(err){
         console.log(err);
        }
        else {
         console.log("OK");
        }
        var obj = {
            success: true, msg: "Xoá thành công!"
        };
        res.send(obj);
     });
    }
    

});



app.listen(port, () => console.log(`App is running at port ${port}`));
