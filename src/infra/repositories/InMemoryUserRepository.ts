import { User } from "../../core/entities/User.js";
import { UserRepository } from "../../core/repositories/UserRepository.js";


export class InMemoryUserRepository implements UserRepository
{
    /**
     * List of Users
     * @private     
     * @type { User[] }
     */
    #storage: User[];

    constructor()
    {
        this.#storage = [];
    }

    public findById(id: string): Promise<User | void>
    {
        const user: User | void = this.#storage.find((user: User) => user.id == id);
        return Promise.resolve(user);
    }

    public save(user: User): Promise<void>
    {
        this.#storage.push(user);
        return Promise.resolve();
    }

    public update(user: User): Promise<User>
    {
        const updatedStorage: User[] = [];

        this.#storage.forEach((storedUser: User) =>
        {
            if (storedUser.id != user.id)
                updatedStorage.push(storedUser)
        })

        updatedStorage.push(user);
        this.#storage = updatedStorage;

        return Promise.resolve(user);
    }

    public deleteById(id: string): Promise<void>
    {
        const updatedStorage: User[] = [];

        this.#storage.forEach((storedUser: User) =>
        {
            if (storedUser.id != id)
                updatedStorage.push(storedUser)
        })

        this.#storage = updatedStorage;

        return Promise.resolve();
    }

    public async findAll({ cursor, limit  = 10 }: {cursor?: string, limit?: number}): Promise<User[]>
    {
        if(this.#storage.length === 0)
            return [];

        const effectiveCursor  = cursor ?? this.#storage[0].id;

        const startIndex = this.#storage.findIndex((user: User) => user.id === effectiveCursor)
        
        if(startIndex === -1)
                return[];
        
        return this.#storage.slice(startIndex, startIndex + limit);
    }

    public findAllByTenantId(tenantId: string, cursor: string, limit: number): Promise<User[]>
    {
        let data: User[] = [];
        tenantId;
        cursor;
        limit;

        this.#storage.forEach((user: User) =>
        {
            if (user.id)
                data.push(user);
        })

        return Promise.resolve(data);
    }

}

const userRepository = new InMemoryUserRepository()

const user = new User({
    id: "019345b8-db71-7b5b-893a-d4b75dfd51c3",
    tenantId: "1",
    name: "diego",
    login: "diego",
    hashedPassword: "",
    isActive: false
});

const user2 = new User({
    id: "019345b9-0ddb-77fa-96de-f35573c66937",
    tenantId: "1",
    name: "thiago",
    login: "thiago",
    hashedPassword: "",
    isActive: false
});

const user3 = new User({
    id: "019345b9-2bf1-7b72-903b-04a1d4f0d3aa",
    tenantId: "1",
    name: "rodrigo",
    login: "rodrigo",
    hashedPassword: "",
    isActive: false
});

userRepository.save(user)
userRepository.save(user2)
userRepository.save(user3)

async function exemplo()
{
    const data =  await userRepository.findAll({cursor: "019345b8-db71-7b5b-893a-d4b75dfd51c3", limit: 1});
    data.forEach(user => console.log(user.name))
    
}

exemplo();