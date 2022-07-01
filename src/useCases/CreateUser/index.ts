import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { InMemoryUsersRepository } from "../../repositories/implementations/InMemoryUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailTrapMailProvider = new MailTrapMailProvider();
const inMemoryUsersRepository = new InMemoryUsersRepository();

const createUserUseCase = new CreateUserUseCase(
    inMemoryUsersRepository,
    mailTrapMailProvider
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserUseCase, createUserController };