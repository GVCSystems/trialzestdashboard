import { sequelize, MachineData } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const get = async (req, res) => {
  try {
    const obj = await Machine.findAll();
    return successResponse(req, res, obj);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getData = async (req, res) => {
  try {
    var replObj = { machine_status: req.query.status.split(',') };
    if(req.query.stock_status) replObj['stock_status'] = req.query.stock_status.split(',');
    if(req.query.burn_status) replObj['burn_status'] = req.query.burn_status.split(',');
    const [obj, metadata] = await sequelize.query(`
    select * from vw_machine_summary
    where machine_status in (:machine_status)
    ${ replObj.stock_status ? ` and COALESCE(spiral_a_status, 0) in (:stock_status)` : '' }
    ${ replObj.burn_status ? ` and COALESCE(burn_status, 0) in (:burn_status)` : '' }
  `,{
        replacements: replObj,
      });
    return successResponse(req, res, obj);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
