import { UserRepository } from "../../Repositories/UserRepository";
import { GroupeRepository } from "../../Repositories/GroupeRepository";
import { Groupe } from "../../models/entities/Groupe";
import { GroupeMemberRepository } from "../../Repositories/GroupeMemberRepository";
import { GroupeMember } from "../../models/entities/GroupeMember";


async function generateProfessorsGroup() {

    const userRepository = new UserRepository();
    const professors = await userRepository.getByRole('professor');

    const groupeRepository = new GroupeRepository();

    const groupe: Groupe = new Groupe();
    groupe.title = 'allProfessors';
    groupeRepository.create(groupe);

    const groupeId = await groupeRepository.getByTitle(groupe.title);

    const newGroupeId: number = groupeId[0].id;
    const groupeMemberRepository = new GroupeMemberRepository();

    professors.forEach(professor => {
        const groupeMember = new GroupeMember();

        groupeMember.groupeId = newGroupeId;
        groupeMember.userId = professor.id;

        groupeMemberRepository.create(groupeMember);
    })



}

export { generateProfessorsGroup }