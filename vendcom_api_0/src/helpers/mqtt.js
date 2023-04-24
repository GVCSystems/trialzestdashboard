import { Transaction, sequelize } from '../models';

const num = a => {
    if (isNaN(parseInt(a))) return null;
    else return parseInt(a);
}

module.exports.parse = payload => {
    // 'Parsing message - ' + payload
    try {
        var cleaned = /^\**(.*?)\#*$/.exec(payload)[1];
        var parts = cleaned.split(',');
        if (!/^\d+$/.test(parts[0])) return;
        Transaction.create({
            machine: parts[0],
            command: parts[1],
            p1: num(parts[2]),
            p2: num(parts[3]),
            p3: num(parts[4]),
            p4: num(parts[5]),
            p5: num(parts[6]),
            p6: num(parts[7]),
        })
        switch (parts[1]) {
            case "PWR":
                sequelize.query(`
                    update MachineData set lastOnTime = NOW(), lastHeartbeatTime = NOW(), burn_status = 0, status = 1 where machineId =
                        (select id from Machines where serial = '${parts[0]}' limit 1)
                    `)
                break;
            case "HBT":
                sequelize.query(`
                update MachineData set lastOnTime = COALESCE(lastOnTime, NOW()), lastHeartbeatTime = NOW(), status = 1 where machineId =
                        (select id from Machines where serial = '${parts[0]}' limit 1)
                    `)
                break;
            case "STK":
                sequelize.query(`
                    update MachineData set spiral_a_status = ${parts[2]}, lastHeartbeatTime = NOW(), status = 1 where machineId =
                            (select id from Machines where serial = '${parts[0]}' limit 1)
                        `)
                break;
            case "CSH":
                sequelize.query(`
                        update MachineData set cashCurrent = ${parts[3]}, lastHeartbeatTime = NOW(), status = 1 where machineId =
                                (select id from Machines where serial = '${parts[0]}' limit 1)
                            `)
                break;
            case "VND":
                sequelize.query(`
                        update MachineData set qtyCurrent = ${parts[2]}, lastHeartbeatTime = NOW(), status = 1 where machineId =
                                (select id from Machines where serial = '${parts[0]}' limit 1)
                            `)
                break;
            case "BST":
                sequelize.query(`
                        update MachineData set burn_status = 1, lastHeartbeatTime = NOW(), status = 1 where machineId =
                                (select id from Machines where serial = '${parts[0]}' limit 1)
                            `)
                break;
            case "BEN":
                sequelize.query(`
                        update MachineData set burn_status = 0, lastHeartbeatTime = NOW(), status = 1 where machineId =
                                (select id from Machines where serial = '${parts[0]}' limit 1)
                            `)
                break;
            case "BER":
                sequelize.query(`
                        update MachineData set burn_status = 2, lastHeartbeatTime = NOW(), status = 1 where machineId =
                                (select id from Machines where serial = '${parts[0]}' limit 1)
                            `)
                break;
            default:
                sequelize.query(`
                update MachineData set status = 1, lastHeartbeatTime = NOW() where machineId =
                        (select id from Machines where serial = '${parts[0]}' limit 1)
                    `)
                break;
        }
    } catch (ex) {
        console.log(ex);
        // 'Failed to parse message'
    }
}

