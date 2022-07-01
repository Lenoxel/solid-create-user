import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserDto } from "./CreateUserDto";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider,
    ) {}

    async execute(createUserDto: CreateUserDto) {
        const userAlreadyExists = await this.usersRepository.findByEmail(createUserDto.email);

        if (userAlreadyExists) {
            throw new Error ('User already exists.');
        }

        const user = new User(createUserDto);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: createUserDto.name,
                email: createUserDto.email
            },
            from: {
                name: 'Administrador',
                email: 'admin@gmail.com'
            },
            subject: 'Seja bem-vindo à plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma</p>'
        })
    }
}