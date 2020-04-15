import {GroupeRepository} from "../Repositories/GroupeRepository";
import HttpStatus from "http-status-codes";

async function tutorGroupeList(req:null,res:any) {
    const groupeRepository=new GroupeRepository();
    const list=await groupeRepository.getAll();
    let index = list.length - 1;
    while (index >= 0) {
        if (list[index].ownerId === 0) {
            list.splice(index, 1);
        }
        index -= 1;
    }
    return res.status(HttpStatus.OK).json({
        list:list
    });

}

const utils={tutorGroupeList};

export=utils;