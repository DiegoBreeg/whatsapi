export interface UserProps
{
    /**
     * The unique identifier for the user entitie.
     * @type { string }
     */
    id: string;

    /**
     * The unique identifier for the tenant (or company) to which the user belongs.
     * Used for multi-tenant systems to segregate data by company.
     * @type { string }
     */
    tenantId: string;

    /**
     * The name of the user entitie.
     * @type { string }
     */
    name: string;

    /**
     * The email address of the user entitie.
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
     * The unique identifier for the user entitie.
     * @private 
     * @readonly
     * @type { string }
     */
    readonly #id: string;

    /**
     * The unique identifier for the tenant (or company) to which the user belongs.
     * Used for multi-tenant systems to segregate data by company.
     * @private 
     * @readonly
     * @type { string }
     */
    readonly #tenantId: string;

    /**
     * The name of the user entitie.
     * @private
     * @type { string }
     */
    #name: string;

    /**
     * The email addres of the user entitie.
     * @private
     * @readonly
     * @type { string }
     */
    readonly #email: string;

    /**
     * The hashed password of the user entitie to login.
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
     * @param { UserProps } userProps - The properties to initialize the User.
     */
    constructor(userProps: UserProps)
    {
        this.#id = userProps.id;
        this.#tenantId = userProps.tenantId;
        this.#name = this.validateName(userProps.name);
        this.#email = this.validateEmail(userProps.email);
        this.#hashedPassword = userProps.hashedPassword;
        this.#isActive = userProps.isActive;
    }

    /**
     * Get user id.
     * @returns { string }
     */
    public get id()
    {
        return this.#id;
    }

    /**
     * get the unique identifier for the tenant (or company) to which the user belongs.
     * @returns { string }
     */
    public get tenantId()
    {
        return this.#tenantId;
    }

    /**
     * Get user name.
     * @returns { string }
     */
    public get name()
    {
        return this.#name;
    }

    /**
     * Get user email.
     * @returns { string }
     */
    public get email()
    {
        return this.#email;
    }

    /**
     * Get user hashedPassword.
     * @returns { string }
     */
    public get hashedPassword()
    {
        return this.#hashedPassword;
    }

    /**
     * Get user isActive.
     * @returns { boolean }
     */
    public get isActive()
    {
        return this.#isActive;
    }

    /**
     * Set user's Name.
     * @param { string } name - The name of the user.
     */
    public set name(name: string)
    {
        this.#name = this.validateName(name);
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

    /**
     * This method trims the input, removes any invalid characters (non-letter characters),
     * and ensures the name is in uppercase. If the cleaned name is empty, an error is thrown.
     * 
     * @param { string } name - The name of the user.
     * @returns { string } - the validated user name.
     * @throws { Error } If the cleaned name is empty after trimming and removing invalid characters.
     */
    private validateName(name: string): string
    {
        const cleanedName = name
            .trim()
            .replace(/[^a-zA-Zà-üÀ-Ü\s]/g, '')
            .toUpperCase();

        if (cleanedName.length === 0)
            throw new Error("Name must contain at least one valid character");
        return cleanedName;
    }

    /**
     * Validate the email format.
     * Uses a regex pattern to ensure the email follows common email standards.
     * @param { string } email - The email to validate.
     * @returns { string } - The validated email.
     * @throws { Error } If the email format is invalid.
     */
    private validateEmail(email: string): string
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email))        
            throw new Error("Invalid email format");
        
        return email;
    }
}