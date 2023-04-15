lst = [];
curItem = null;
$(function () {
    getStudents();
});
function getStudents() {
    fetch("http://localhost:3000/students")
        .then(res => { return res.json(); })
        .then(data => {
            lst = [];
            let i = 1;
            data.forEach(sv => {
                sv.STT = i++;
                lst.push(sv);
            });
            if (lst.length > 0) {
                $("#tbodySV").html("");
                $("#svTemplate").tmpl(lst).appendTo("#tbodySV");
            }
            else {
                str = "<caption>No DATA FOUND</caption>"
                $("#tbodySV").html(str);
            }
        })
        .catch(err => {
            str = "<caption>ERROR .....</caption>"
            $("#tbodySV").html(str);
        })
}


function createSV() {
    // console.log("Create SV....");

    gt = $('input[name="GioiTinh"]:checked').val();
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/students",
        data: {
            "MaSV": $("#txtMSSV").val(),
            "HoTen": $("#txtHoten").val(),
            "Lop": $("#txtLop").val(),
            "GioiTinh": gt,
            "NgaySinh": $("#txtNgaySinh").val(),


            // "MaSV": "21661006",
            // "HoTen": "Nguyễn Phát Triều",
            // "Lop": "17CSI01",
            // "GioiTinh": "Nam",
            // "NgaySinh": "24/02/2003"
        }
    })
        .done(function (res) {
            console.log(res);
            if (res.success) {
                alert(res.msg);
                $('ModalSinhVien').modal('tongle');
                getStudents();
            }
            else {
                alert(res.msg);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });
}

function setModal(type)
{
    
    if(type=="up")
    {
        $("btnCreate").hide();
        $("btnUpdtae").show();
        $("#txtMaSV").attr("readonly",true);
    }
    else{
        
        $("btnCreate").show();
        $("btnUpdtae").hide();
        $("#txtMaSV").attr("readonly",false);
    }
}

function upStudent(maSV){
    $('#ModalSinhVien').modal('toggle');
    setModal("up");
    sv = lst.find(x=>x.MaSV == maSV);
    $("#txtMSSV").val(sv.MaSV);
    $("#txtHoTen").val(sv.HoTen);
    $("#txtLop").val(sv.Lop);
    if (sv.GioiTinh == "Nam")
        $('#radioNam').prop('checked',true);
        else 
        $('#radioNu').prop('checked',true);
    $("#txtNgaySinh").val(sv.NgaySinh);
}

function updateSV()
{
    gt = $('input[name="GioiTinh"]:checked').val();
    $.ajax({
        method: "PUT",
        url: "http://localhost:3000/students",
        data: {
            "MaSV": $("#txtMSSV").val(),
            "HoTen": $("#txtHoTen").val(),
            "Lop": $("#txtLop").val(),
            "GioiTinh": gt,
            "NgaySinh": $("#txtNgaySinh").val(),


            // "MaSV": "21661006",
            // "HoTen": "Nguyễn Phát Triều",
            // "Lop": "17CSI01",
            // "GioiTinh": "Nam",
            // "NgaySinh": "24/02/2003"
        }
    })
        .done(function (res) {
            console.log(res);
            if (res.success) {
                alert(res.msg);
                getStudents();
            }
            else {
                alert(res.msg);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });
}

function delSV(maSV){
    if(confirm("Bạn có chắc chắn muốn xóa không?")){
        $.ajax({
            method: "DELETE",
            url: "http://localhost:3000/students",
            data: {
                "MaSV": maSV,
            }
        })
            .done(function (res) {
                if(res.success) {
                    alert(res.msg);
                    getStudents();
                }
                else alert(res.msg);
            }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus) });
    }
}