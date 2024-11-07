export interface UserProps
{
    /**
     * The unique identifier for the user.
     * @type { string }
     */
    id?: string;

    /**
     * The name of the user.
     * @type { string }
     */
    name: string;

    /**
     * The email address of the user.
     * @type { string }
     */
    email: string;

    /**
     * The hashed password of the user to login.
     * @type { string }
     */
    hashedPassword: string;

    /**
     * Indicates whether the user account is active.
     * @type { boolean }
     */
    isActive: boolean;
}

/**
 * Represents a User entity with account-related information.
 */
export class User
{
    /**
     * The unique identifier for the user.
     * @private 
     * @readonly
     * @type { string }
     */
    readonly #id?: string;

    /**
     * The name of the user.
     * @private
     * @type { string }
     */
    #name: string;

    /**
     * The email addres of the user.
     * @private
     * @readonly
     * @type { string }
     */
    readonly #email: string;

    /**
     * The hashed password of the user to login.
     * @private
     * @type { string }
     */
    #hashedPassword: string;

    /**
     * Indicates whether the user account is active.
     * @private
     * @type { boolean }
     */
    #isActive: boolean;

    /**
     * Creates a new User instance with provided properties.
     * @param { UserProps } - The properties to initialize the User.
     */
    constructor(userProps: UserProps)
    {
        this.#id = userProps.id;
        this.#name = userProps.name;
        this.#email = userProps.email;
        this.#hashedPassword = userProps.hashedPassword
        this.#isActive = userProps.isActive
    }

    /**
     * Get user id.
     * @return { string }
     */
    public get id()
    {
        return this.#id || new Error("Entity not persisted yet");
    }

    /**
     * Get user name.
     * @return { string }
     */
    public get name()
    {
        return this.#name;
    }

    /**
     * Get user email.
     * @return { string }
     */
    public get email()
    {
        return this.#email;
    }

    /**
     * Get user hashedPassword.
     * @return { string }
     */
    public get hashedPassword()
    {
        return this.#hashedPassword;
    }

    /**
     * Get user isActive.
     * @return { boolean }
     */
    public get isActive()
    {
        return this.#isActive;
    }

    /**
     * Set user Name.
     * @param { string } name - The name of the user.
     */
    public set name(name: string)
    {
        this.#name = name;
    }

    /**
     * Set user hashedPassword.
     * @param { string } hashedPassword - The hashed password of the user to login.
     */
    public set hashedPassword(hashedPassword: string)
    {
        this.#hashedPassword = hashedPassword;
    }

    /**
     * Set user isActive
     * @param { boolean } isActive - Indicates whether the user account is active.
     */
    public set isActive(isActive: boolean)
    {
        this.#isActive = isActive;
    }
}


const user = new User(
    {
        name: "diego lucas",
        email: "diegobreeg@gmail.com",
        hashedPassword: "segredo",
        isActive: true
    })


console.log(user.id);