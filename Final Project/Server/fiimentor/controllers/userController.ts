import HttpStatus from "http-status-codes";

async function getAllUsers(req:any, res:any){
    try {
        //const users = await req.db.User.find({});

        return res.status(HttpStatus.OK).json({
            success: true,
            users:[{username:'teodor',role:'student',grop:'A7',year:2},{username:'gigi',role:'student',grop:'X1',year:7}],
        });
    } catch (error) {
        req.log.error(`Unable to get users -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
}
const utils = {getAllUsers};

export = utils;