import HttpStatus from "http-status-codes";
import {GroupeRepository} from "../Repositories/GroupeRepository";

interface groupeResult {
    id: number;
    Title: string;
    year: string;
    letter: string;
    number: string;
}

async function getGroupeList(req: any, res: any) {

    try {
        let i;
        const groupeRepository = new GroupeRepository();
        let groupes = await groupeRepository.getGroupeFaculty();
        let groupesRes: groupeResult[] = [];

        let index = groupes.length - 1;
        while (index >= 0) {
            if (groupes[index].title === "allUsers") {
                groupes.splice(index, 1);
            } else if (groupes[index].title === "allProfessors") {
                groupes.splice(index, 1);
            }
            index -= 1;
        }

        for (i = 0; i < groupes.length; i++) {
            groupesRes[i] = {
                id: groupes[i].id,
                Title: groupes[i].title,
                year: groupes[i].title.charAt(0),
                letter: groupes[i].title.charAt(1),
                number: groupes[i].title.charAt(2)
            }

        }
        return res.status(HttpStatus.OK).json({
            list: groupesRes
        });
    }catch(error) {
        req.log.error(`Unable to get faculty groups -> ${req.url} -> ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    };
}

export {getGroupeList};