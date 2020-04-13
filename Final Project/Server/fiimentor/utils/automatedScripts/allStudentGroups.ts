import { GroupeRepository } from "../../Repositories/GroupeRepository";
import { Groupe } from "../../models/entities/Groupe";
import { GroupeMemberRepository } from "../../Repositories/GroupeMemberRepository";
import { GroupeMember } from "../../models/entities/GroupeMember";
import {StudentRepository} from "../../Repositories/StudentRepository";


async function generateStudentsGroup() {

    console.log('am intrat in studentGroup');
    const studentRepository = new StudentRepository();
    const students = await studentRepository.getAll();

    let groupsTitle :Set<string> = new Set();

    // formez multimea de gupuri de student 'groupsTitle'
    for (const student of students) {
        const studentsGroup =  student.year.toString() + student.groupe.toString();
        groupsTitle.add(studentsGroup);
    }

    const groupRepository = new GroupeRepository();
    // adaug in tabela GROUPE fiecare grup din multimea 'groupsTitle'
    groupsTitle.forEach(title =>{
        const group: Groupe = new Groupe();
        group.title = title;
        groupRepository.create(group);
    })


    const groupeMemberRepository = new GroupeMemberRepository();
    ///adaug fiecare student in tabela groupMember
    for (const student of students) {
        const studentsGroup =  student.year.toString() + student.groupe.toString();
        const newGroup = await groupRepository.getByTitle(studentsGroup);

        const groupMember = new GroupeMember();
        groupMember.groupeId = newGroup[0].id;
        groupMember.userId = student.userId;

        await groupeMemberRepository.create(groupMember);
    }
}

export { generateStudentsGroup }