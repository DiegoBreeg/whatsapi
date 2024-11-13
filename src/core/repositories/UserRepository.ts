import { User } from "../entities/User.js";

/**
 * Interface for User instancy Repository.
 * Provides all methods to persist a user
 */
export interface UserRepository
{
    /**
     * Finds a user by their unique identifier.
     * @param { string } id - The unique identifier of the user.
     * @returns { Promise<User | null> } - A promise that resolves to the User entitie if found, or null if not found.
     */
    findById(id: string): Promise<User | null>;

    /**
     * Saves a new user to the repository.
     * @param { User } user - The user entity to save.
     * @returns { Promise<void> } - A promise that resolves once the user has been saved.
     */
    save(user: User): Promise<void>;

    /**
     * Updates an existing user in the repository.
     * @param { User } user - The user entity with updated properties.
     * @returns { Promise<User> } - A promise that resolves to the updated User entity.
     */
    update(user: User): Promise<User>;

    /**
    * Deletes a user from the repository by their unique identifier.
    * @param { string } id - The unique identifier of the user to delete.
    * @returns { Promise<void> } - A promise that resolves once the user has been deleted.
    */
    deleteById(id: string): Promise<void>;

    /**
     * Retrieves a paginated list of users based on a cursor.
     * @param { string } cursor - The ID of the last user from the previous page.
     * @param { number } limit - The maximum number of users to retrieve.
     * @returns  { Promise<User[]> } - A promise that resolves to an array of User entities.
     */
    findAll(cursor: string, limit: number): Promise<User[]>;

    /**
     * Retrieves a paginated list of users for a given tenant, based on a cursor for pagination.
     * @param { string } tenantId - The unique identifier for the tenant.
     * @param { string } cursor - The cursor for pagination; could be the last user ID retrieved.
     * @param { number } limit - The maximum number of users to retrieve.
     * @returns { Promise<User[]> } - A promise that resolves to an array of User entities.
     */
    findAllByTenantId(tenantId: string, cursor: string, limit: number): Promise<User[]>;
}