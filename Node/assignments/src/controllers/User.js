const User = require("../models/User");
const excelJS = require("exceljs");

const workbook = new excelJS.Workbook();
const worksheet = workbook.addWorksheet("Users");

const exportUser = async (req, res) => {
    /**
     * Define columns in the worksheet
     */
    worksheet.columns = [ 
        { header: "First Name", key: "fname", width: 15 },
        { header: "Last Name", key: "lname", width: 15 },
        { header: "Email", key: "email", width: 25 },
        { header: "Gender", key: "gender", width: 10 }
    ];

    /**
     * Add data to the worksheet
     */
    User.forEach(user => { worksheet.addRow(user) });

    /**
     * Set up the response headers
     */
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=" + "users.xlsx");

    /**
     * Write the workbook to the response object
     */
    workbook.xlsx.write(res).then(() => res.end());
}

module.exports = exportUser;