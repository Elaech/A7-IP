import { UserRepository } from "../../Repositories/UserRepository";
import { GroupeRepository } from "../../Repositories/GroupeRepository";
import { Groupe } from "../../models/entities/Groupe";
import { GroupeMemberRepository } from "../../Repositories/GroupeMemberRepository";
import { GroupeMember } from "../../models/entities/GroupeMember";


async function generateUsersGroup() {

    console.log('am intrat in users');
    //ne aducem toti userii din baza de date
    const userRepository = new UserRepository();
    const users = await userRepository.getAll();

    const groupeRepository = new GroupeRepository();

    // construim un record pentru a-l insera in tabela Groupe si il inseram apeland metoda create
    const groupe: Groupe = new Groupe();
    groupe.title = 'allUsers';
    groupeRepository.create(groupe);

    // ne aducem id ul grupei inserate mai sus
    const groupeId = await groupeRepository.getByTitle(groupe.title);

    const newGroupeId: number = groupeId[0].id;
    const groupeMemberRepository = new GroupeMemberRepository();

    //pentru fiecare user vom construi un record pentru groupeMember cu groupeId egal cu id ul gasit mai sus si cu userId egal cu id ul fiecarui user
    users.forEach(user => {
        const groupeMember = new GroupeMember();

        groupeMember.groupeId = newGroupeId;
        groupeMember.userId = user.id;

        groupeMemberRepository.create(groupeMember);
    })

}


export { generateUsersGroup }