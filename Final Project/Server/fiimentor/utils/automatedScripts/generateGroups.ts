import { createConnection } from "typeorm";
import { generateProfessorsGroup } from "./allProfessorsGroup";
import { generateUsersGroup } from "./allUsersGroup";

createConnection().then(async () => {

    await generateUsersGroup();
    await generateProfessorsGroup();

}).catch(error => {
    console.log(error);
})