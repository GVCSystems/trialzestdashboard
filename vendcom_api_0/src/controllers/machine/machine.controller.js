import { Machine } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const allMachines = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 2;
    const obj = await Machine.findAndCountAll({
      order: [['createdAt', 'DESC'], ['id', 'ASC']],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { obj });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const get = async (req, res) => {
  try {
    const obj = await Machine.findAll();
    return successResponse(req, res, obj);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
