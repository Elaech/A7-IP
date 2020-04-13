import { createConnection } from "typeorm";
import { generateProfessorsGroup } from "./allProfessorsGroup";
import { generateUsersGroup } from "./allUsersGroup";
import {generateStudentsGroup} from "./allStudentGroups";

createConnection().then(async () => {

    await generateUsersGroup();
    await generateProfessorsGroup();
    await generateStudentsGroup();

}).catch(error => {
    console.log(error);
})