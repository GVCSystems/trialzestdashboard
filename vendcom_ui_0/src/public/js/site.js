
const amountText = amt => {
    amt = amt || 0;
    var cr = parseInt(amt / 100000) / 100;
    var l = parseInt(amt / 1000) / 100;
    var k = parseInt(amt / 10) / 100;
    return cr < 1 ? l < 1 ? k + ' K' : l + ' L' : cr + ' Cr';
};


const setRowContent = o => btoa(JSON.stringify(o));

const getRowContent = ctrl => JSON.parse(atob($(ctrl).closest('tr').find('.rowData').html().trim()));
